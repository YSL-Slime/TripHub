import { db } from "@/lib/database";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const session = await getServerSession(authOptions);
  console.log("Here");

  if (!session)
    return new NextResponse({ message: "Not signed in" }, { status: 401 });

  const { _id } = session.user;

  try {
    // Fetch books that contain the ID of the logged-in user
    const books = await db.Book.find({ owner: _id });

    if (!books || books.length === 0) {
      return new NextResponse("No books found for the user", {
        status: 404,
      });
    }

    // Extract the listing IDs from the books
    const listingIds = books.map((book) => book.accomodation);

    // Fetch listings using the extracted listing IDs
    const accommodations = await db.Post.find({
      _id: { $in: listingIds }, // Find listings with IDs in the listingIds array
    }).populate("owner");

    if (!accommodations || accommodations.length === 0) {
      return new NextResponse("No accommodations found", {
        status: 404,
      });
    }

    return NextResponse.json(accommodations, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
