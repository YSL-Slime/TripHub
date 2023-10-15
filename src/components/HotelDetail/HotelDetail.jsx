"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Book from "../Book/Book";
import { useRouter } from "next/navigation";
import {
  FaStar,
  FaMapPin,
  FaWifi,
  FaBath,
  FaCoffee,
  FaBed,
  FaExpand,
  FaBacon,
  FaRegKeyboard,
  FaTv,
  FaMoneyBillWave,
  FaCity,
  FaSwimmingPool,
  FaCalendarAlt,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { LiaBedSolid } from "react-icons/lia";
import { LuBedSingle } from "react-icons/lu";

const HotelDetail = ({ id }) => {
  const [post, setPost] = useState({}); // Changed from an array to a single post
  const [reviews, setReviews] = useState([]);
  const [ratingg, setRatingg] = useState("");
  const [num, setNum] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data); // Log the response data
          setPost(data);
        })
        .catch((error) => console.error("Error fetching post:", error));
    }

    fetch(`/api/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);

        // Calculate the average rating and total number of reviews
        let totalRating = 0;
        for (const review of data) {
          totalRating += parseInt(review.rating); // Convert string to integer
        }
        const averageRating = totalRating / data.length;

        setRatingg(averageRating.toFixed(2)); // Set average rating with 2 decimal places
        setNum(data.length); // Set the total number of reviews
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [id]);

  const getFeatureIconAndText = (feature) => {
    switch (feature) {
      case "wi-fi":
        return (
          <>
            <FaWifi className="mb-1 mr-1 inline text-stone-800" />
            <span className="ml-1 text-c4">Wi-fi</span>
          </>
        );
      case "Bathroom":
        return (
          <>
            <FaBath className="mb-1 ml-5 mr-1 inline text-stone-800" />
            <span className="ml-1 text-c4">Bathroom</span>
          </>
        );
      case "Breakfast":
        return (
          <>
            <FaCoffee className="mb-1 ml-5 mr-1 inline text-stone-800" />
            <span className="ml-1 text-c4">Breakfast</span>
          </>
        );
      case "Kids bed":
        return (
          <>
            <FaBed className="mb-1 ml-5 mr-1 inline text-stone-800" />
            <span className="ml-1 text-c4">Kids bed</span>
          </>
        );
      default:
        return null; // Handle other cases or unrecognized values
    }
  };

  const getAmenIconAndText = (amenitie) => {
    switch (amenitie) {
      case "Free Wi-fi 24/7":
        return (
          <>
            <FaWifi className="mb-1 mr-1 inline text-stone-800" />
            <span className="ml-1 text-c4">Free Wi-fi 24/7</span>
          </>
        );
      case "Free clean bathroom":
        return (
          <>
            <FaBath className="mb-1 ml-5 mr-1 inline text-stone-800" />
            <span className="ml-1 text-c4">Free clean bathroom</span>
          </>
        );
      case "Breakfast included":
        return (
          <>
            <FaBacon className="mb-1 ml-5 mr-1 inline text-stone-800" />
            <span className="ml-1 text-c4">Breakfast included</span>
          </>
        );
      case "Free computer":
        return (
          <>
            <FaRegKeyboard className="mb-1 ml-5 mr-1 inline text-stone-800" />
            <span className="ml-1 text-c4">Free computer</span>
          </>
        );
      case "Free TV":
        return (
          <>
            <FaTv className="mb-1 ml-5 mr-1 inline text-stone-800" />
            <span className="ml-1 text-c4">Free TV</span>
          </>
        );
      case "ATM":
        return (
          <>
            <FaMoneyBillWave className="mb-1 ml-5 mr-1 inline text-stone-800" />
            <span className="ml-1 text-c4">ATM</span>
          </>
        );
      case "Free swimming pool":
        return (
          <>
            <FaSwimmingPool className="mb-1 ml-5 mr-1 inline text-stone-800" />
            <span className="ml-1 text-c4">Free swimming pool</span>
          </>
        );
      case "Close to city center":
        return (
          <>
            <FaCity className="mb-1 ml-5 mr-1 inline text-stone-800" />
            <span className="ml-1 text-c4">Close to city center</span>
          </>
        );
      default:
        return null; // Handle other cases or unrecognized values
    }
  };

  return (
    <>
      <div className="container mx-auto px-8 py-16">
        <div>
          <h1 className="mb-3 text-left text-heading-1 text-[#23262F]">
            {post.title}
          </h1>
        </div>
        <div>
          <p className="h-6 text-left text-body-16 text-black">
            <span className="ml-1 mr-5 text-body-22 text-c3">{post.type}</span>
            <Link href={`/hotel-details/${id}/reviews`}>
              <FaStar className="mb-1 mr-1 inline text-yellow-400" /> {ratingg}{" "}
              <span className="text-c4">({num} reviews)</span>
            </Link>
            <FaMapPin className="ml-5 mr-1 inline text-gray-500" />
            <span className="text-c4">{post.location}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-3xl p-6 md:flex-row md:p-12">
          <div className="flex w-full flex-col items-center justify-between gap-4 md:w-3/4 md:items-start">
            {post.images && post.images[0] ? (
              <img
                src={`${post.images[0]}`}
                alt="Image 1"
                className="h-full w-full object-cover"
              />
            ) : (
              <div>No image available</div>
            )}
          </div>
          <div className="flex w-full flex-col justify-between gap-2 md:w-1/4">
            {post.images && post.images[1] ? (
              <img
                src={`${post.images[1]}`}
                alt="Image 2"
                className="h-full w-full object-cover"
              />
            ) : (
              <div>No image available</div>
            )}
            {post.images && post.images[2] ? (
              <img
                src={`${post.images[2]}`}
                alt="Image 3"
                className="h-full w-full object-cover"
              />
            ) : (
              <div>No image available</div>
            )}
            {post.images && post.images[3] ? (
              <img
                src={`${post.images[3]}`}
                alt="Image 4"
                className="h-full w-full object-cover"
              />
            ) : (
              <div>No more images available</div>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="bg-transparent" style={{ width: "70%" }}>
            <div>
              <h2 className="mb-3 text-left text-heading-2 text-[#23262F]">
                {post.abstract}
              </h2>
            </div>
            <div>
              <p className="h-6 text-left text-body-18 text-c4">
                <span className="text-c4">{post.location}</span>
              </p>
            </div>
            <div className="mb-2 mt-10 border-b-2 border-stone-200"></div>
            <div className="mb-10 mt-10 rounded-[20px] bg-transparent">
              <div className="mb-3 flex">
                <div className={"mb-2 mr-6 flex cursor-pointer items-center"}>
                  <span className="font-medium text-blue-500">Description</span>
                </div>
              </div>
              <div className="mb-2 mt-1 border-b-2 border-blue-500"></div>
              <p className="text-gray-700">{post.description}</p>
            </div>
            <div>
              <p className="text-bold mb-5 h-6 text-left text-body-18 text-stone-800">
                Hotel features
              </p>
              <p className="stone-800 h-6 text-left text-body-16">
                {post.features &&
                  post.features.map((feature, index) => (
                    <React.Fragment key={index}>
                      {getFeatureIconAndText(feature)}
                    </React.Fragment>
                  ))}
                <FaExpand className="mb-1 ml-5 mr-1 inline text-stone-800" />
                <span className="ml-1 text-c4">
                  {post.roomWidth}m x {post.roomHeight}m
                </span>
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-2 text-body-16 text-c3 lg:flex-row lg:flex-wrap">
              <p className="text-bold mb-5 mr-3 h-6 text-left text-body-18 text-stone-800">
                Beds:
              </p>
              <div className="ml-1 flex flex-col items-start gap-2 lg:flex-row lg:flex-wrap">
                {/* Display additional hotel information */}
                <div className="flex flex-row items-center gap-2">
                  <LiaBedSolid className="mb-1 mr-1 inline text-stone-800" />
                  <span>{post.beds}</span>
                </div>
                <div className="ml-5 flex flex-row items-center gap-2">
                  <LuBedSingle className="mb-1 ml-2 inline text-stone-800" />
                  <span>{post.singleBeds}</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-bold mb-5 h-6 text-left text-body-18 text-stone-800">
                Amenities
              </p>
              <p className="stone-800 h-6 text-left text-body-16">
                {post.amenities &&
                  post.amenities.map((amenitie, index) => (
                    <React.Fragment key={index}>
                      {getAmenIconAndText(amenitie)}
                    </React.Fragment>
                  ))}
              </p>
            </div>
          </div>

          <Book id={id} price={post.price} />
        </div>
      </div>
      ;
    </>
  );
};

export default HotelDetail;
