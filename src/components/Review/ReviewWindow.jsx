"use client";

import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { FaStar } from "react-icons/fa";

const Creator = ({ id }) => {
  const [short, setShort] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(rating === value ? 0 : value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      const response = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          short,
          description,
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
    <div className="border-zince-200 rounded-lg border bg-zinc-50 p-4">
      <form
        id="post-form"
        onSubmit={handleSubmit}
        className="mx-auto w-full sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        <div className="mb-4 flex items-center">
          <p className="text-bold mb-5 mr-2 text-left text-body-18 text-stone-800">
            Choose Rating:
          </p>
          <div className="ml-10 flex">
            {[1, 2, 3, 4, 5].map((value) => (
              <FaStar
                key={value}
                onClick={() => handleRatingChange(value)}
                className={`text-4xl cursor-pointer ${
                  rating >= value ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          {rating > 0 && <p className="ml-5 text-c4">Rating: {rating}</p>}
        </div>
        <div className="prose prose-stone">
          <input
            type="text"
            placeholder="Short"
            value={short}
            onChange={(e) => setShort(e.target.value)}
            className="mb-4 w-full rounded border p-2"
          />
          <TextareaAutosize
            placeholder="Full review"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 w-full rounded border p-2"
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Creator;
