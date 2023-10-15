/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useSession } from "next-auth/react";

const PBox = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    if (session?.user) {
      const { name, surname, image, country } = session.user;

      setName(name);
      setSurname(surname);
      setCountry(country);
      setImage(image);
    }
  }, [session]);

  return (
    <>
      <div className="relative ml-auto w-[340px] flex-wrap items-center justify-center rounded-2xl bg-white p-4 md:w-[340px] lg:w-[340px]">
        <div className="mb-6 ml-[11%] mt-5 flex h-60 w-60 items-center justify-center overflow-hidden rounded-full bg-white">
          <img
            src={image}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mb-1 text-center text-heading-2 text-[#23262F]">
          {name} {surname}
        </div>
        <div className="mb-8 border-b-2 border-stone-200"></div>
        <div>
          <p className="mb-7 h-6 text-center text-body-16 text-black">
            <FaStar className="mb-1 mr-1 inline text-yellow-400" /> {4.2}{" "}
            <span className="text-c4">(233 reviews)</span>
          </p>
          <div className="mb-2 flex justify-between">
            <span className="ml-4">From</span>
            <span className="mr-4 text-gray-500">{country}</span>
          </div>
          <div className="flex justify-between">
            <span className="ml-4">Member since</span>
            <span className="mr-4 text-gray-500">2023</span>
          </div>
        </div>
        <p className="mt-16 text-center text-caption-12 text-gray-400">
          - what others see about you-
        </p>
      </div>
    </>
  );
};

export default PBox;
