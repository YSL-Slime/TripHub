import React from "react";
import Link from "next/link";
import Profile from "../../components/Profile/Profile";
import "../globals.css";

export default function Home() {
  return (
    <>
      <div className="flex flex-row items-center p-10">
        <Link href="/">
          <p className="">Home &gt;</p>
        </Link>
        <p className="pl-2 text-caption-16 text-c4">Profile</p>
      </div>
      <Profile />
    </>
  );
}
