import { db } from "@/lib/database";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ message: "Not signed in" }, { status: 401 });

  const { _id } = session.user;

  const {
    title,
    abstract,
    location,
    images, // Now, images should be an array of Cloudinary URLs
    description,
    features,
    amenities,
    roomWidth,
    roomHeight,
    price,
    type,
    beds,
    guests,
    singleBeds,
    bookOption,
    bookOPrice,
  } = await request.json();

  console.log(images);

  const newPost = new db.Post({
    title,
    abstract,
    location,
    description,
    features,
    amenities,
    roomWidth,
    roomHeight,
    price,
    images, // Use the Cloudinary URLs directly
    type,
    beds,
    guests,
    singleBeds,
    bookOption,
    bookOPrice,
    owner: _id,
  });

  try {
    await newPost.save();
    return new NextResponse("Post has been created!", {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json(
      { message: err },
      {
        status: 500,
      }
    );
  }
};
