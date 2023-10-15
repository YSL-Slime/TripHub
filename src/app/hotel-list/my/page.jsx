"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import HotelListMy from "../../../components/HotelListings/HotelListMy";
import Filter from "../../../components/HotelListings/Filter";
import { fetchPosts } from "../../../utils/apiMy"; // Import the data fetching function

export default function ListPage() {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    // Fetch accommodations from the server and update the state
    fetchPosts()
      .then((data) => {
        setAccommodations(data);
      })
      .catch((error) => {
        console.error("Error fetching accommodations:", error);
      });
  }, []);

  const handleDivClick = () => {
    setFilterVisible(!isFilterVisible);
  };

  return (
    <>
      <div className="bg-[#fafafb]">
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center p-10">
            <Link href="/profile">
              <p className="">Profile &gt;</p>
            </Link>
            <p className="pl-2 text-caption-14 text-c4">My listings</p>
          </div>
        </div>
        <div className="m-10 flex flex-col justify-center gap-[40px] md:mx-20 md:flex-row">
          <HotelListMy accommodations={accommodations} />
        </div>
        <div className="flex items-center justify-center p-5 pb-8">
          <button className="h-[46px] w-[176px] rounded-[30px] border-[1px] px-[41px] py-[11px] text-caption-16 text-c1 hover:border-primary-blue">
            View more
          </button>
        </div>
      </div>
    </>
  );
}
