import { db } from "@/lib/database";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const session = await getServerSession(authOptions);

  if (!session)
    return new NextResponse({ message: "Not signed in" }, { status: 401 });

  const { _id } = session.user;

  try {
    const books = await db.Book.find({ owner: _id });

    if (!books || books.length === 0) {
      return new NextResponse("No books found for the user", {
        status: 404,
      });
    }

    const dateIn = books.map((book) => book.checkIn);
    const dateOut = books.map((book) => book.checkOut);

    const responseData = {
      dateIn: dateIn,
      dateOut: dateOut,
      accomodationId: accomodationId,
    };

    return new NextResponse(responseData, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
