import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params; // Id of the post (accommodation)

  // Get accommodation by ID and fill in the owner data automatically from the users table by using the populate function
  const reviews = await db.Review.find({
    accomodation: id, // Assuming the field name is "accomodation"
  }).populate("owner");

  try {
    return NextResponse.json(reviews, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
