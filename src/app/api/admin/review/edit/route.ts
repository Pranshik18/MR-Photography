import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import ReviewModel from '@/models/review';

// PUT: Update a review
export async function PUT(
  request: NextRequest
) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Review ID is required' },
        { status: 400 }
      );
    }
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
