// api/posts/all.js
import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    // Fetch all accommodations and populate 'owner'
    const reveiw = db.Review.findById(id).populate("accomodation");

    return NextResponse.json(reveiw, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
