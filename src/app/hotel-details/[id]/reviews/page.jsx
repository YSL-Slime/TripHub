"use client";

import React, { useState, useEffect } from "react";
import "../../../globals.css";
import Link from "next/link";
import Review from "../../../../components/Review/Review";
import { useSession } from "next-auth/react";

const App = ({ params }) => {
  const [reviews, setReviews] = useState([]);
  const id = params.id;

  const { data: session } = useSession();
  const [uid, setUid] = useState("");

  useEffect(() => {
    fetch(`/api/reviews/${id}`)
      .then((response) => response.json()) // Parse the response to JSON
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });

    if (session?.user) {
      const { _id } = session.user;

      setUid(_id);
    }
  }, [id, session]);

  // Check if the user has already reviewed
  const userReviewed = reviews.some((review) => review.owner._id === uid);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center p-10">
          <Link href="/">
            <p className="">Home &gt;</p>
          </Link>
          <Link href="/hotel-list">
            <p className="ml-1 ">Accomodation list &gt;</p>
          </Link>
          <Link href={`/hotel-details/${id}`}>
            <p className="ml-1 ">Accomodation details &gt;</p>
          </Link>
          <p className="pl-2 text-caption-14 text-c4">Reviews</p>
        </div>
      </div>
      <div className="container mx-auto px-8 py-16">
        <div>
          <h1 className="mb-3 inline text-left text-heading-1 text-[#23262F]">
            Reviews
          </h1>
          {session && !userReviewed ? ( // Show the "Add your review" button only if the user hasn't reviewed and is logged in
            <Link href={`/hotel-details/${id}/write-a-review`}>
              <button className="ml-28 inline rounded-lg border bg-blue-500 p-2 align-super text-white">
                + Add your review
              </button>
            </Link>
          ) : null}
        </div>
        <div className="mb-10 mt-1 border-b-2 border-blue-500"></div>
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
    </>
  );
};

export default App;
