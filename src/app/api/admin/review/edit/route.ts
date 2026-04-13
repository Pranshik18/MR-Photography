import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import ReviewModel from '@/models/Review';

// PUT: Update a review
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
        rating: body.rating,
        isApproved: body.isApproved,
      },
      { 
        returnDocument: 'after',
        runValidators: true 
      }
    ).populate({
      path: 'projectId',
      select: 'title slug'
    });

    if (!updatedReview) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Review updated successfully',
      data: updatedReview,
    });

  } catch (error: any) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update review' },
      { status: 500 }
    );
  }
}