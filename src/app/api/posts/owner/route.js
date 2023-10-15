// route.js
import { db } from "@/lib/database";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const session = await getServerSession(authOptions);
  console.log("Here");

  if (!session)
    return NextResponse.json({ message: "Not signed in" }, { status: 401 });

  const { _id } = session.user;

  try {
    const accommodations = await db.Post.find({
      owner: _id,
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
