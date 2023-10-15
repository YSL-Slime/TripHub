/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { LiaBedSolid } from "react-icons/lia";
import { LuBedSingle } from "react-icons/lu";

const HotelCard = ({ hotel, id, checkInDate, checkOutDate }) => {
  const [reviews, setReviews] = useState([]);
  const [ratingg, setRatingg] = useState("");
  const [num, setNum] = useState("");

  useEffect(() => {
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
      <div className="mb-96 h-[465px] w-[970] lg:mb-8">
        <Link href={`/hotel-details/${hotel._id}`}>
          <div className="flex w-full flex-col lg:flex-row">
            <div>
              <img
                src={`${hotel.images[0]}`}
                alt={hotel.title}
                className="h-[475px] w-[420px] min-w-[300px] rounded-t-3xl object-cover lg:rounded-l-3xl lg:rounded-r-none"
              />
            </div>
            <div className="flex max-h-[600px] w-full max-w-[420px] flex-col gap-5 rounded-b-3xl border p-[31px] sm:min-w-[420px] lg:max-h-[475px] lg:max-w-none lg:gap-[41px] lg:rounded-b-none lg:rounded-r-3xl xl:max-h-none">
              <div className="flex flex-col justify-between gap-5">
                <h3 className="text-heading-3 text-[#23262F]">{hotel.title}</h3>
                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                  <span className="ml-1 mr-5 text-body-22 text-c3">
                    {hotel.type}
                  </span>
                  <div className="flex flex-row gap-2">
                    <img
                      src="/hotels/icons/Star.svg"
                      alt=""
                      className="h-[18px] w-[18px]"
                    />
                    <span className="text-caption-14 text-c3">{ratingg}</span>
                    <span className="text-[14px] text-c3">({num} reviews)</span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <img
                      src="/hotels/icons/Flag.svg"
                      alt=""
                      className="h-[18px] w-[18px]"
                    />
                    <span className="text-[14px] text-c3">
                      {hotel.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-[14px] text-c3 lg:flex-row lg:flex-wrap">
                <div className="flex flex-col items-start gap-2 lg:flex-row lg:flex-wrap">
                  <div className="flex flex-row items-center gap-2">
                    <img
                      src="/hotels/icons/Location.svg"
                      alt=""
                      className="h-[16px] w-[16px]"
                    />
                    <span>{hotel.location}</span>
                  </div>
                  <div className="ml-0 mt-2 flex flex-row items-center gap-2 lg:ml-5 lg:mt-0">
                    <img
                      src="/hotels/icons/Plane.svg"
                      alt=""
                      className="h-[16px] w-[16px]"
                    />
                    <span>Departure from {hotel.location}</span>
                  </div>
                  <div className="ml-0 mt-2 flex flex-row items-center gap-2 lg:ml-5 lg:mt-0">
                    <img
                      src="/hotels/icons/Calendar.svg"
                      alt=""
                      className="h-[16px] w-[16px]"
                    />
                    <span>
                      {checkInDate} - {checkOutDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-[14px] text-c3 lg:flex-row lg:flex-wrap">
                <div className="ml-1 mt-2 flex flex-col items-start gap-2 lg:ml-0 lg:mt-0 lg:flex-row lg:flex-wrap">
                  <div className="flex flex-row items-center gap-2">
                    <LiaBedSolid className="mb-1 mr-1 inline text-stone-800" />
                    <span>{hotel.beds}</span>
                  </div>
                  <div className="ml-0 mt-2 flex flex-row items-center gap-2 lg:ml-5 lg:mt-0">
                    <LuBedSingle className="mb-1 inline text-stone-800" />
                    <span>{hotel.singleBeds}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-5 lg:flex-row">
                <div className="">
                  <p className="text-bold mb-3 h-6 text-left text-body-18 text-stone-800">
                    Amenities
                  </p>
                  <div className="text-body-16">
                    {hotel.amenities &&
                      hotel.amenities.map((amenitie, index) => (
                        <React.Fragment key={index}>
                          {getAmenIconAndText(amenitie)}
                        </React.Fragment>
                      ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:justify-end">
                  <div className="flew-row flex items-center gap-2 px-1 lg:justify-center">
                    <p className="text-[24px] font-bold leading-8 text-c3">
                      {hotel.price} €
                    </p>
                    <p className="text-[14px] text-c3">for two</p>
                  </div>
                  <Link href={`/hotel-details/${hotel._id}`}>
                    <button className="flex h-[34px] w-[104px] items-center justify-center rounded-[30px] bg-primary-blue text-white hover:bg-blue-hover lg:h-[48px] lg:w-[176px]">
                      Book again
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default HotelCard;
