import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params; // Id of the post (accommodation)

  try {
    // Get accommodation by ID and populate 'owner' using async/await
    const accommodation = await db.Post.findById(id).populate("owner");

    if (!accommodation) {
      return new NextResponse("Accommodation not found", {
        status: 404,
      });
    }

    return NextResponse.json(accommodation, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
