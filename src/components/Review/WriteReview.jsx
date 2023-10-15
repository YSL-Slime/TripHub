import React from "react";
import ReviewWindow from "./ReviewWindow";

const WriteReview = async ({ id }) => {
  return (
    <div className="container mx-auto px-8 py-16">
      <div>
        <h1 className="mb-3 text-left text-heading-1 text-[#23262F]">
          Write a Review
        </h1>
      </div>
      <div className="mb-10 mt-1 border-b-2 border-blue-500"></div>
      <ReviewWindow id={id} />
    </div>
  );
};

export default WriteReview;
