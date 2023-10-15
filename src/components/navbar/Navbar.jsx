/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import logo from "../../../public/general/logo.png";
import avatar from "../../../public/general/avatar.png";
import Login from "../SignIn/Login";
import Signup from "../SignIn/Signup";

const Navbar = () => {
  const { data: session } = useSession(); // Get the user's session status

  return (
    <>
      <nav
        className="flex h-[78px] w-full items-center justify-between bg-white px-4 md:px-10 xl:px-12"
        data-cy="navbar" // Add data-cy attribute to the nav element
      >
        <div
          className="xs:gap-3 flex cursor-pointer items-center gap-2"
          data-cy="navbar-logo" // Add data-cy attribute to the div element
        >
          <Link href={"/"}>
            <div className="relative flex h-[38px] w-[40px] items-center object-contain">
              <Image src={logo} alt="logo" />
              <p className="ml-2 text-heading-4 leading-6 text-c2">TripHub</p>
            </div>
          </Link>
        </div>
        <div
          id="auth"
          className="flex items-center gap-3" // Remove justify-end to prevent overlap
          data-cy="navbar-login" // Add data-cy attribute to the div element
        >
          {session ? (
            // Render user icon or authenticated content
            <div className="flex items-center">
              <Link href={"/profile"}>
                <div className="flex items-center">
                  <div className="flex-shrink-0 overflow-hidden rounded-full">
                    <img
                      className="h-14 w-14 object-cover"
                      src={session.user.image || avatar} // Use user's image or default avatar
                      alt="User Avatar"
                      width={32}
                      height={32}
                    />
                  </div>
                  <span className="ml-2 whitespace-nowrap">
                    {session.user.name}
                  </span>{" "}
                  {/* Display user's name without line breaks */}
                </div>
              </Link>
              <button
                onClick={() => signOut()} // Call signOut function when button is clicked
                className="focus:shadow-outline ml-5 rounded-3xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
              >
                Log Out
              </button>
            </div>
          ) : (
            // Render login and signup buttons
            <>
              <Login />
              <Signup />
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
