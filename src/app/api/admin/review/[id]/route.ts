
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import ReviewModel from '@/models/review';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Review ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const review = await ReviewModel.findById(id)
      .populate({
        path: 'projectId',
        select: 'title slug',
        model: 'Project'
      })
      .lean();

    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: review,
    });

  } catch (error: any) {
    console.error("Error fetching review by ID:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch review details" 
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();

    const updatedReview = await ReviewModel.findByIdAndUpdate(
      id,
      {
        clientName: body.clientName,
        description: body.description,
        projectId: body.projectId || null,
        isApproved: body.isApproved,
      },
      { returnDocument: 'after', runValidators: true }
    ).populate({ path: 'projectId', select: 'title slug' });

    if (!updatedReview) return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Review updated successfully', data: updatedReview });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const deletedReview = await ReviewModel.findByIdAndDelete(id);

    if (!deletedReview) return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Review deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to delete review' }, { status: 500 });
  }
}