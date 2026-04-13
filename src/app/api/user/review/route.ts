// app/api/user/reviews/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import ReviewModel from '@/models/review';


export async function GET() {
  try {
    await connectToDatabase();

    const reviews = await ReviewModel.find({ isApproved: true })
      .sort({ createdAt: -1 }) 
      .select('clientName description rating projectId createdAt') 
      .lean();                         

    return NextResponse.json({
      success: true,
      data: reviews,
      count: reviews.length,
    });

  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch reviews',
        error: error.message,
      },
      { status: 500 }
    );
  }
}