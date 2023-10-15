import { db } from "@/lib/database";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ message: "Not signed in" }, { status: 401 });

  const { _id } = session.user;

  const { checkIn, checkOut, guest, options, a_id } = await request.json();

  const newBook = new db.Book({
    checkIn,
    checkOut,
    guest,
    options,
    owner: _id,
    accomodation: a_id,
  });

  try {
    await newBook.save();
    return NextResponse.json(
      { message: "Book has been created!" },
      {
        status: 201,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err },
      {
        status: 500,
      }
    );
  }
};
