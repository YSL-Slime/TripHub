import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params; // Id of the post (accommodation)

  // Get accommodation by ID and fill in the owner data automatically from the users table by using the populate function
  const book = db.Book.findById(id).populate("owner");

  try {
    return NextResponse.json(book, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
