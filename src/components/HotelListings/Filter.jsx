"use client";
import React, { useCallback, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const Filter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params?.get("price") ?? 1000);
  const [rating, setRating] = useState(params?.get("rating") ?? 0);

  useEffect(() => {
    const currentQuery = qs.parse(params.toString());

    if (currentQuery.category) {
      console.log("QS", currentQuery);
      const selectedCategories = currentQuery.category;
      console.log("SS", selectedCategories);
      if (selectedCategories instanceof Array) {
        selectedCategories.forEach((category) => {
          document.getElementById(`${category}-checkbox`).checked = true;
        });
      } else {
        document.getElementById(
          `${selectedCategories}-checkbox`
        ).checked = true;
      }
    }
  }, []);

  const handleClick = useCallback(() => {
    const checkboxes = [
      { id: "hotel-checkbox", category: "Hotel" },
      { id: "apartment-checkbox", category: "Apartment" },
      { id: "condo-checkbox", category: "Condo" },
      // Add more checkboxes if needed
    ];

    const selectedCategories = checkboxes
      .filter((checkbox) => document.getElementById(checkbox.id).checked)
      .map((checkbox) => checkbox.category);
    console.log(" VALUE IS ", value);

    const updatedQuery = {
      ...qs.parse(params.toString()),
      category: selectedCategories,
      rating,
      price: value,
    };

    // Update URL query
    const url = qs.stringifyUrl(
      {
        url: "/hotel-list",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [params, router, rating, value]);

  useEffect(() => {
    handleClick();
  }, [rating, value]);

  const handleRatingChange = (value) => {
    setRating(rating === value ? 0 : value);
  };

  const handleSliderChange = (event) => {
    console.log("CHANGED", event.target.value);
    const newValue = event.target.value;
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <>
      <div className="justify-betweem mx-auto flex h-[525px] w-fit flex-col items-start gap-5 rounded-lg bg-white p-5">
        <div className="flex flex-col gap-[30px]">
          {/*
          <div className="flex flex-col items-start gap-[14px] text-center">
            <p className="text-body-18 text-sidebar">Search location</p>
            <div className="flex items-center gap-2 rounded-[10px] border bg-white px-[11px] py-[14px] hover:border-primary-blue">
              <input
                id="search-filter"
                type="text"
                placeholder="City, Country"
                className="w-[204px] bg-transparent text-caption-16 focus:outline-none"
              />
              <img src="../../hotels/icons/Search.svg" />
            </div>
          </div>
          <svg
            width="277"
            height="1"
            viewBox="0 0 277 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="277" height="1" fill="#E7ECF3" />
          </svg>
          */}

          {/* Filtering using checkboxes */}

          <div className="flex flex-col items-start justify-between gap-[15px]">
            <p className="text-body-18 text-c1">Property type</p>
            <div className="relative flex flex-row items-center justify-between gap-3">
              <input
                type="checkbox"
                id="hotel-checkbox"
                className="false mr-3 h-[22px] w-[22px] cursor-pointer appearance-none rounded-[6px] border-[1.5px] border-c4 checked:bg-primary-blue hover:border-primary-blue"
                onClick={handleClick}
              />
              <label
                htmlFor="hotel-checkbox"
                className="cursor-pointer text-checkbox-14"
              >
                Hotel
              </label>
              <svg
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute left-[5px]"
              >
                <path
                  d="M11.7251 0.419985C11.6457 0.346628 11.5513 0.288403 11.4472 0.248668C11.3432 0.208934 11.2316 0.188477 11.1189 0.188477C11.0062 0.188477 10.8946 0.208934 10.7905 0.248668C10.6865 0.288403 10.592 0.346628 10.5126 0.419985L4.15139 6.2586L1.47882 3.80106C1.3964 3.72809 1.29911 3.67071 1.1925 3.6322C1.08589 3.59369 0.972054 3.5748 0.857483 3.57662C0.742911 3.57844 0.629852 3.60092 0.524761 3.64279C0.419669 3.68465 0.324603 3.74509 0.244991 3.82063C0.165378 3.89617 0.102779 3.98535 0.0607656 4.08307C0.0187524 4.18079 -0.00185163 4.28513 0.000130571 4.39015C0.00211277 4.49517 0.0266423 4.5988 0.0723181 4.69513C0.117994 4.79145 0.183922 4.87859 0.266338 4.95157L3.54515 7.95697C3.62453 8.03033 3.71897 8.08855 3.82302 8.12829C3.92707 8.16802 4.03867 8.18848 4.15139 8.18848C4.26411 8.18848 4.37572 8.16802 4.47977 8.12829C4.58382 8.08855 4.67826 8.03033 4.75763 7.95697L11.7251 1.57049C11.8118 1.4972 11.881 1.40825 11.9283 1.30924C11.9756 1.21024 12 1.10332 12 0.995238C12 0.887152 11.9756 0.780237 11.9283 0.681231C11.881 0.582225 11.8118 0.493275 11.7251 0.419985Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="relative flex flex-row items-center justify-between gap-3">
              <input
                type="checkbox"
                id="apartment-checkbox"
                className="false mr-3 h-[22px] w-[22px] cursor-pointer appearance-none rounded-[6px] border-[1.5px] border-c4 checked:bg-primary-blue hover:border-primary-blue"
                onClick={handleClick}
              />
              <label
                htmlFor="apartment-checkbox"
                className="cursor-pointer text-checkbox-14"
              >
                Apartment
              </label>
              <svg
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute left-[5px]"
              >
                <path
                  d="M11.7251 0.419985C11.6457 0.346628 11.5513 0.288403 11.4472 0.248668C11.3432 0.208934 11.2316 0.188477 11.1189 0.188477C11.0062 0.188477 10.8946 0.208934 10.7905 0.248668C10.6865 0.288403 10.592 0.346628 10.5126 0.419985L4.15139 6.2586L1.47882 3.80106C1.3964 3.72809 1.29911 3.67071 1.1925 3.6322C1.08589 3.59369 0.972054 3.5748 0.857483 3.57662C0.742911 3.57844 0.629852 3.60092 0.524761 3.64279C0.419669 3.68465 0.324603 3.74509 0.244991 3.82063C0.165378 3.89617 0.102779 3.98535 0.0607656 4.08307C0.0187524 4.18079 -0.00185163 4.28513 0.000130571 4.39015C0.00211277 4.49517 0.0266423 4.5988 0.0723181 4.69513C0.117994 4.79145 0.183922 4.87859 0.266338 4.95157L3.54515 7.95697C3.62453 8.03033 3.71897 8.08855 3.82302 8.12829C3.92707 8.16802 4.03867 8.18848 4.15139 8.18848C4.26411 8.18848 4.37572 8.16802 4.47977 8.12829C4.58382 8.08855 4.67826 8.03033 4.75763 7.95697L11.7251 1.57049C11.8118 1.4972 11.881 1.40825 11.9283 1.30924C11.9756 1.21024 12 1.10332 12 0.995238C12 0.887152 11.9756 0.780237 11.9283 0.681231C11.881 0.582225 11.8118 0.493275 11.7251 0.419985Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="relative flex flex-row items-center justify-between gap-3">
              <input
                type="checkbox"
                id="condo-checkbox"
                className="false mr-3 h-[22px] w-[22px] cursor-pointer appearance-none rounded-[6px] border-[1.5px] border-c4 checked:bg-primary-blue hover:border-primary-blue"
                onClick={handleClick}
              />
              <label
                htmlFor="condo-checkbox"
                className="cursor-pointer text-checkbox-14"
              >
                Condo
              </label>
              <svg
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute left-[5px]"
              >
                <path
                  d="M11.7251 0.419985C11.6457 0.346628 11.5513 0.288403 11.4472 0.248668C11.3432 0.208934 11.2316 0.188477 11.1189 0.188477C11.0062 0.188477 10.8946 0.208934 10.7905 0.248668C10.6865 0.288403 10.592 0.346628 10.5126 0.419985L4.15139 6.2586L1.47882 3.80106C1.3964 3.72809 1.29911 3.67071 1.1925 3.6322C1.08589 3.59369 0.972054 3.5748 0.857483 3.57662C0.742911 3.57844 0.629852 3.60092 0.524761 3.64279C0.419669 3.68465 0.324603 3.74509 0.244991 3.82063C0.165378 3.89617 0.102779 3.98535 0.0607656 4.08307C0.0187524 4.18079 -0.00185163 4.28513 0.000130571 4.39015C0.00211277 4.49517 0.0266423 4.5988 0.0723181 4.69513C0.117994 4.79145 0.183922 4.87859 0.266338 4.95157L3.54515 7.95697C3.62453 8.03033 3.71897 8.08855 3.82302 8.12829C3.92707 8.16802 4.03867 8.18848 4.15139 8.18848C4.26411 8.18848 4.37572 8.16802 4.47977 8.12829C4.58382 8.08855 4.67826 8.03033 4.75763 7.95697L11.7251 1.57049C11.8118 1.4972 11.881 1.40825 11.9283 1.30924C11.9756 1.21024 12 1.10332 12 0.995238C12 0.887152 11.9756 0.780237 11.9283 0.681231C11.881 0.582225 11.8118 0.493275 11.7251 0.419985Z"
                  fill="white"
                />
              </svg>
            </div>
            <svg
              width="277"
              height="1"
              viewBox="0 0 277 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="277" height="1" fill="#E7ECF3" />
            </svg>
          </div>

          {/* Filtering using the price slider */}

          <div>
            <div className="mb-3">
              <label
                htmlFor="price-range"
                className="text-body-18 text-sidebar"
              >
                Price range
              </label>
              <div className="mt-5 flex  justify-between">
                <div className="relative w-3/4">
                  <input
                    id="price-range"
                    type="range"
                    value={value}
                    min="1"
                    max="1000"
                    step="20"
                    onChange={handleSliderChange}
                    className="relative h-2 w-full cursor-pointer rounded-lg bg-primary-blue"
                  />
                  <div className="flex justify-between pt-2">
                    <span className="text-caption-16 text-c3">€1</span>
                    <span className="text-caption-16 text-c3">€1000</span>
                  </div>
                </div>

                {/* Input box with the price value */}

                <input
                  type="number"
                  value={value}
                  min="1"
                  max="1000"
                  step="20"
                  onChange={handleInputChange}
                  className="ml-2 h-[30px] w-[64px]  rounded border border-primary-blue bg-white py-1 pl-3 text-body-16"
                />
              </div>
            </div>
            <svg
              width="277"
              height="1"
              viewBox="0 0 277 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="277" height="1" fill="#E7ECF3" />
            </svg>
          </div>
          <div className="mb-4 flex items-center">
            <p className="text-body-18 text-sidebar">Rating:</p>
            <div id="rating-filter" className="ml-5 flex">
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
            {rating > 0 && <p className="ml-5 text-c4">{rating}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
