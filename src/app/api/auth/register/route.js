import connect from "@/utils/db";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { name, surname, email, password, country, birthday, image } =
    await request.json();

  await connect;

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    surname,
    country,
    birthday,
    image,
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created!", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
