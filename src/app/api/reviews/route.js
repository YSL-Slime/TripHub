import { db } from "@/lib/database";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ message: "Not signed in" }, { status: 401 });

  const { _id } = session.user;

  const { rating, short, description, a_id } = await request.json();

  const newReview = new db.Review({
    rating,
    short,
    description,
    owner: _id,
    accomodation: a_id,
  });

  try {
    await newReview.save();
    return NextResponse.json(
      { message: "Review has been created!" },
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
