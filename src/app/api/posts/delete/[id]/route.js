// route.js
import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const { id } = params; // Extract 'loc' from 'params'

  try {
    await db.Post.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
