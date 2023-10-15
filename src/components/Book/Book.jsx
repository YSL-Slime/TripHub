"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HotelDetail = ({ id, price }) => {
  const [maxGuest, setMaxGuest] = useState("");
  const [optionNames, setOptionNames] = useState([]);
  const [optionPrices, setOptionPrices] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guest, setGuests] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data); // Log the response data
          setMaxGuest(data.guests || "");
          setOptionNames(data.bookOption || []);
          setOptionPrices(data.bookOPrice || []);
        })
        .catch((error) => console.error("Error fetching post:", error));
    }
  }, [id]);

  const handleCheckInChange = (date) => {
    setCheckIn(date);
  };

  const handleCheckOutChange = (date) => {
    setCheckOut(date);
  };

  const handleGuestsChange = (e) => {
    setGuests(parseInt(e.target.value));
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedOptions((prevOptions) => [...prevOptions, option]);
    } else {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((prevOption) => prevOption !== option)
      );
    }

    setOptions((prevOptions) =>
      isChecked
        ? [...prevOptions, option]
        : prevOptions.filter((prevOption) => prevOption !== option)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      const response = await fetch("http://localhost:3000/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkIn,
          checkOut,
          guest,
          options,
          a_id: id,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        // User logged in successfully
        const userName = data.name; // Retrieve the name from the response
        console.log("Review created by:", userName);
        // You can display the user's name on the login page or redirect to a new page displaying the user's name
      } else {
        // Handle login failure
        console.log("Review creation failed:", data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="ml-auto w-[340px] flex-wrap items-center justify-center rounded-3xl bg-white p-4">
        <div>
          <h3 className="mb-3 flex items-center text-left text-heading-3 text-[#23262F]">
            {price} €
            <span className="mr-20 mt-1.5 text-body-22 text-c4">/night</span>
            <div className="flex h-[32px] w-[85px] items-center justify-center rounded-full bg-blue-500">
              <span className="text-body-16 text-white">20% off</span>
            </div>
          </h3>
        </div>
        <div className="mb-2 mt-4 border-b-2 border-stone-200"></div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 flex p-4">
            <div className="mr-4">
              <label
                className="text-sm mb-1 block font-medium text-stone-500"
                htmlFor="check-in"
              >
                Check-in
              </label>
              <DatePicker
                id="check-in"
                selected={checkIn}
                onChange={handleCheckInChange}
                className=" w-[120px] rounded-lg border-gray-300 bg-slate-100 px-3 py-1"
                placeholderText="Add date"
              />
            </div>
            <div className="ml-5">
              <label
                className="text-sm mb-1 block font-medium text-stone-500"
                htmlFor="check-out"
              >
                Check-out
              </label>
              <DatePicker
                id="check-out"
                selected={checkOut}
                onChange={handleCheckOutChange}
                className="w-[120px] rounded-lg border-gray-300 bg-slate-100 px-3 py-1"
                placeholderText="Add date"
              />
            </div>
          </div>
          <div className="mb-4 ml-4">
            <label
              className="text-sm mb-1 block font-medium text-stone-500"
              htmlFor="guests"
            >
              Number of guests
            </label>
            <input
              type="number"
              placeholder={`Max. ${maxGuest} guests`}
              id="guests"
              className="w-[276px] rounded-lg border-gray-300 bg-slate-100 px-2 py-1"
              value={guest}
              onChange={handleGuestsChange}
              min="1"
              max={maxGuest}
            />
          </div>
          <div className="mb-4 ml-4">
            <label className="text-sm mb-1 block font-medium text-stone-500">
              Options
            </label>
            <div>
              {optionNames.map((option, index) => (
                <label key={index} className="mb-2 flex items-center">
                  <input
                    type="checkbox"
                    value={`${option} $${optionPrices[index]}`}
                    checked={options.includes(
                      `${option} $${optionPrices[index]}`
                    )}
                    onChange={handleOptionChange}
                    className="mb-1"
                  />
                  <span className="ml-2">
                    {option}{" "}
                    <span className="align-left text-slate-400">
                      ${optionPrices[index]}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-lg mb-1 font-medium text-stone-500">Price:</h4>
            <div className="mb-5 mt-2 w-[276px] rounded-lg bg-slate-100 p-4">
              <ul>
                <li className="flex justify-between">
                  <span>
                    {checkIn && checkOut
                      ? `${Math.ceil(
                          (checkOut - checkIn) / (1000 * 60 * 60 * 24)
                        )} Nights`
                      : "0 Nights"}
                  </span>
                  {checkIn && checkOut ? (
                    <span>
                      $
                      {price *
                        Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))}
                    </span>
                  ) : (
                    <span>$0</span>
                  )}
                </li>
                <li className="flex justify-between">
                  <span>Discount 20%</span>
                  {checkIn && checkOut ? (
                    <span>
                      -$
                      {(
                        price *
                        Math.ceil(
                          (checkOut - checkIn) / (1000 * 60 * 60 * 24)
                        ) *
                        0.2
                      ).toFixed(2)}
                    </span>
                  ) : (
                    <span>$0</span>
                  )}
                </li>
                {selectedOptions.map((option, index) => {
                  const optionName = option.split(" $")[0];
                  const optionIndex = optionNames.indexOf(optionName);
                  const optionPrice =
                    optionIndex !== -1
                      ? parseFloat(optionPrices[optionIndex])
                      : 0;

                  return (
                    <li key={index} className="flex justify-between">
                      <span>{optionName}</span>
                      <span>${optionPrice.toFixed(2)}</span>
                    </li>
                  );
                })}

                {/*{selectedOptions.map((option, index) => {
                  const optionIndex = optionNames.indexOf(
                    option.split(" $")[0]
                  );
                  const optionPrice =
                    optionIndex !== -1
                      ? parseFloat(optionPrices[optionIndex])
                      : 0;

                  return (
                    <li key={index} className="flex justify-between">
                      <span>{option}</span>
                      <span>
                        $
                        {(
                          optionPrice *
                          (checkIn && checkOut
                            ? Math.ceil(
                                (checkOut - checkIn) / (1000 * 60 * 60 * 24)
                              )
                            : 0)
                        ).toFixed(2)}
                      </span>
                    </li>
                  );
                })}*/}
                <li className="mt-3 flex  justify-between border-t border-gray-400 pt-2">
                  <span>Final Price:</span>
                  <span>
                    $
                    {(
                      selectedOptions.reduce((total, option) => {
                        const optionName = option.split(" $")[0];
                        const optionIndex = optionNames.indexOf(optionName);
                        const optionPrice =
                          optionIndex !== -1
                            ? parseFloat(optionPrices[optionIndex])
                            : 0;
                        return total + optionPrice;
                      }, 0) +
                      price *
                        Math.ceil(
                          (checkOut - checkIn) / (1000 * 60 * 60 * 24)
                        ) *
                        (1 - 0.2)
                    ).toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <button
            className="ml-4 w-[276px] rounded bg-blue-500 px-4 py-2 text-white"
            type="submit"
          >
            Book now
          </button>
        </form>
      </div>
    </>
  );
};

export default HotelDetail;
