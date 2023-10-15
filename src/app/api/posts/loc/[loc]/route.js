// route.js
import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { loc } = params;
    const categories = request.nextUrl.searchParams.getAll("category");
    let price = request.nextUrl.searchParams.get("price");
    if (price) price = parseInt(price);
    let rating = request.nextUrl.searchParams.get("rating");
    if (rating) rating = parseInt(rating);
    if (rating === 0) rating = null;

    let ids = [];

    if (rating) {
      const ratings = await db.Review.find({
        rating: rating,
      });

      ids = ratings.map((rating) => rating.accomodation);
    }

    const accommodations = await db.Post.find({
      // Type is any item from query string "Category" array
      ...(ids?.length ? { _id: { $in: ids ?? [] } } : {}),
      ...(loc ? { location: { $regex: loc, $options: "i" } } : {}),
      ...(categories?.length ? { type: { $in: categories ?? [] } } : {}),
      ...(price ? { price: { $lte: price } } : {}),
    }).populate("owner");

    return NextResponse.json(accommodations, { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
