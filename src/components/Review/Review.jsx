"use client";

import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const Review = ({ review }) => {
  const wholeRating = Math.floor(review?.rating || 0); // Calculate whole rating for each review
  if (!review) return null;

  return (
    <div
      className="border-zince-200 mb-5 rounded-lg border bg-zinc-50 p-4"
      key={review.rating}
    >
      <div className="prose prose-stone">
        <div className="mb-4 flex items-center">
          <p className="text-bold mr-2 text-body-18 text-stone-800">Rating:</p>
          <div className="flex">
            <p className="ml-5 mr-5 text-c4">{review.rating} / 5</p>
            {[1, 2, 3, 4, 5].map((value) => (
              <FaStar
                key={value}
                className={`text-2xl ml-2 mt-1 ${
                  value <= wholeRating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="mb-2 text-body-22 text-stone-800">{review.short}</div>
        <div className="container text-stone-600">{review.description}</div>
      </div>
    </div>
  );
};

export default Review;
