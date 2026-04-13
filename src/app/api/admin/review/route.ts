import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import ReviewModel from '@/models/review';

export async function GET() {
  try {
    await connectToDatabase();

    const reviews = await ReviewModel.find({})
      .populate({
        path: 'projectId',
        select: 'title slug',
        model: 'Project'
      })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: reviews,
      count: reviews.length,
    });
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const newReview = await ReviewModel.create({
      clientName: body.clientName,
      description: body.description,
      projectId: body.projectId || null,
      rating: body.rating || 5,
      isApproved: body.isApproved ?? true,
    });

    return NextResponse.json({
      success: true,
      message: 'Review created successfully',
      data: newReview,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create review' },
      { status: 500 }
    );
  }
}