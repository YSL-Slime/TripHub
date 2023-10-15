import React from "react";
import { CiEdit } from "react-icons/ci";
import PBox from "./PBox";
import DataS from "./DataS";
import Link from "next/link";

const HotelDetail = () => {
  return (
    <div className="container mx-auto px-4 py-5">
      <div className="flex flex-col-reverse justify-center md:flex-row">
        {" "}
        {/* Center horizontally */}
        <div className="relative md:ml-10 md:w-2/3">
          <div className="mb-6">
            <h2 className="mb-2 text-heading-hero text-[#23262F]">
              My Profile
            </h2>
          </div>
          <div className="mb-8 border-b-2 border-stone-200"></div>
          <DataS />
          <div className="mt-16 rounded-lg bg-transparent text-center">
            {" "}
            {/* Centered text */}
            <div className="mb-3 cursor-pointer items-center md:flex">
              <span className="mb-2 font-medium text-blue-500 md:mb-0">
                Your activity
              </span>
            </div>
            <div className="mb-2 border-b-2 border-blue-500"></div>
            <div className="mt-3 justify-center md:flex">
              <Link href="/add-accommodation">
                <button className="mb-2 inline-block rounded-lg border bg-blue-500 p-2 text-white md:mb-0 md:mr-4">
                  + Add your accommodation
                </button>
              </Link>
              <Link href="/hotel-list/my">
                <button className="mb-2 inline-block rounded-lg border bg-blue-500 p-2 text-white md:mb-0 md:mr-4">
                  View your accommodations
                </button>
              </Link>
              <Link href="/hotel-list/my-bookings">
                <button className="inline-block rounded-lg border bg-blue-500 p-2 text-white">
                  View your destinations
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
