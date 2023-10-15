import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
  try {
    const { userId, updatedUserData } = await request.json();

    // Update the user's data based on their userId
    await db.User.updateOne(
      { _id: userId }, // Assuming your user collection uses "_id"
      {
        $set: updatedUserData,
      }
    );

    return NextResponse.json({ messag: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json({ messag: "no success" }, { status: 500 });
  }
};
