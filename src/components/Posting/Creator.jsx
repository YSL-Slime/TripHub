"use client";

import { useFrom, FieldValues, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/navigation";
import {
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
} from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { LiaBedSolid } from "react-icons/lia";
import { LuBedSingle } from "react-icons/lu";

const Creator = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [roomWidth, setRoomWidth] = useState("");
  const [roomHeight, setRoomHeight] = useState("");
  const [price, setPrice] = useState(" ");
  const [type, setType] = useState(" ");
  const [beds, setBeds] = useState(" ");
  const [guests, setGuests] = useState(" ");
  const [singleBeds, setSingleBeds] = useState(" ");
  const [bookOption, setBookOption] = useState([]);
  const [bookOPrice, setBookOPrice] = useState([]);
  const router = useRouter();

  const handleAddOption = () => {
    setBookOption([...bookOption, ""]);
    setBookOPrice([...bookOPrice, ""]);
  };

  const handleOptionChange = (index, field, value) => {
    if (field === "name") {
      const updatedOptions = [...bookOption];
      updatedOptions[index] = value;
      setBookOption(updatedOptions);
    } else if (field === "price") {
      const updatedPrices = [...bookOPrice];
      updatedPrices[index] = value;
      setBookOPrice(updatedPrices);
    }
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleImageUpload = (event) => {
    const selectedImages = event.target.files;

    for (const image of selectedImages) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "my-uploads");
      data.append("cloud_name", "du5u27pt0");

      fetch("https://api.cloudinary.com/v1_1/du5u27pt0/image/upload", {
        method: "post",
        body: data,
      })
        .then(async (res) => {
          const result = await res.json();
          console.log(result);
          setImages((prev) => [...prev, result.secure_url]);
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          abstract,
          location,
          images,
          description,
          features,
          amenities,
          roomWidth,
          roomHeight,
          price,
          type,
          guests,
          beds,
          singleBeds,
          bookOption,
          bookOPrice,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        // User logged in successfully
        const userName = data.name; // Retrieve the name from the response
        console.log("Post created by:", userName);
        // You can display the user's name on the login page or redirect to a new page displaying the user's name
        router.push("/profile");
      } else {
        // Handle login failure
        console.log("Post creation failed:", data.message);
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
        <div className="prose prose-stone">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 w-full rounded border p-2"
          />
          <input
            type="text"
            placeholder="Location: City, Country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mb-4 w-full rounded border p-2"
          />
          <div className="mb-4">
            <label
              className="text-bold mb-5 mr-5 inline h-6 text-left text-body-18 text-stone-800"
              htmlFor="type"
            >
              Accomodation type:
            </label>
            <select
              id="type"
              className="w-[276px] rounded-lg border-gray-300 bg-slate-100 px-2 py-1"
              value={type}
              onChange={handleTypeChange}
            >
              <option value={"Hotel"}>Hotel</option>
              <option value={"Apartment"}>Apartment</option>
              <option value={"Condo"}>Condo</option>
            </select>
          </div>
          <div className="mb-4">
            <p className="text-bold mb-5 mr-5 inline h-6 text-left text-body-18 text-stone-800">
              Add images:
            </p>
            <label
              htmlFor="image-upload"
              className="mr-5 w-full cursor-pointer rounded bg-blue-500 px-4 py-2 text-center font-medium text-white hover:bg-blue-600"
            >
              Choose Images:
            </label>
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {images.length > 0 ? (
              <p className="text-sm mt-2 inline text-stone-800">
                {images.length} image(s) selected
              </p>
            ) : (
              <p className="text-sm mt-2 inline text-stone-800"> </p>
            )}
          </div>
          <div className="mb-5 mt-3">
            <div className="flex items-center">
              <span className="mr-3 text-body-18 text-stone-800">
                How many:
              </span>
              <LiaBedSolid className="mb-1 mr-1 inline text-stone-800" />
              <input
                type="number"
                placeholder="Double beds"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="mr-2 w-1/3 flex-1 rounded border p-2"
              />
              <span className="my-auto">, </span>
              <LuBedSingle className="mb-1 ml-2 inline text-stone-800" />
              <input
                type="number"
                placeholder="Single beds"
                value={singleBeds}
                onChange={(e) => setSingleBeds(e.target.value)}
                className="ml-2 w-1/3 flex-1 rounded border p-2"
              />
            </div>
          </div>
          <div className="mb-5 mt-3">
            <div className="flex items-center">
              <span className="mr-3 text-body-18 text-stone-800">
                How many guests:
              </span>
              <BsPeople className="mb-1 mr-1 inline text-stone-800" />
              <input
                type="number"
                placeholder="Number of guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="mr-2 flex-1 rounded border p-2"
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="Abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            className="mb-4 w-full rounded border p-2"
          />
          <TextareaAutosize
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 w-full rounded border p-2"
          />
          <div className="mb-4">
            <p className="text-bold mb-5 h-6 text-left text-body-18 text-stone-800">
              Hotel features:
            </p>
            {/* Feature checkboxes */}
            <label className="ml-1 text-c4">
              <input
                type="checkbox"
                checked={features.includes("Wi-Fi")}
                onChange={(e) =>
                  setFeatures((prevFeatures) =>
                    e.target.checked
                      ? [...prevFeatures, "Wi-Fi"]
                      : prevFeatures.filter((feature) => feature !== "Wi-Fi")
                  )
                }
              />
              <FaWifi className="mb-1 ml-3 mr-1 inline text-stone-800" />
              Wi-Fi
            </label>
            <label className="ml-1 text-c4">
              <input
                className="ml-5"
                type="checkbox"
                checked={features.includes("Bathroom")}
                onChange={(e) =>
                  setFeatures((prevFeatures) =>
                    e.target.checked
                      ? [...prevFeatures, "Bathroom"]
                      : prevFeatures.filter((feature) => feature !== "Bathroom")
                  )
                }
              />
              <FaBath className="mb-1 ml-3 mr-1 inline text-stone-800" />
              Bathroom
            </label>
            <label className="ml-1 text-c4">
              <input
                className="ml-5"
                type="checkbox"
                checked={features.includes("Breakfast")}
                onChange={(e) =>
                  setFeatures((prevFeatures) =>
                    e.target.checked
                      ? [...prevFeatures, "Breakfast"]
                      : prevFeatures.filter(
                          (feature) => feature !== "Breakfast"
                        )
                  )
                }
              />
              <FaCoffee className="mb-1 ml-3 mr-1 inline text-stone-800" />
              Breakfast
            </label>
            <label className="ml-1 text-c4">
              <input
                className="ml-5"
                type="checkbox"
                checked={features.includes("Kids bed")}
                onChange={(e) =>
                  setFeatures((prevFeatures) =>
                    e.target.checked
                      ? [...prevFeatures, "Kids bed"]
                      : prevFeatures.filter((feature) => feature !== "Kids bed")
                  )
                }
              />
              <FaBed className="mb-1 ml-3 mr-1 inline text-stone-800" />
              Kids bed
            </label>
            <div className="mt-3">
              <div className="flex items-center">
                <FaExpand className="mb-1 mr-1 inline text-stone-800" />
                <span className="ml-1 mr-3 text-c4">Room size:</span>
                <input
                  type="number"
                  placeholder="Width (m)"
                  value={roomWidth}
                  onChange={(e) => setRoomWidth(e.target.value)}
                  className="mr-2 w-1/3 flex-1 rounded border p-2"
                />
                <span className="my-auto">X</span>
                <input
                  type="number"
                  placeholder="Height (m)"
                  value={roomHeight}
                  onChange={(e) => setRoomHeight(e.target.value)}
                  className="ml-2 w-1/3 flex-1 rounded border p-2"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-bold mb-5 h-6 text-left text-body-18 text-stone-800">
              Amenities:
            </p>
            {/* Amenity checkboxes */}
            <label className="ml-1 text-c4">
              <input
                type="checkbox"
                checked={amenities.includes("Free Wi-fi 24/7")}
                onChange={(e) =>
                  setAmenities((prevAmenities) =>
                    e.target.checked
                      ? [...prevAmenities, "Free Wi-fi 24/7"]
                      : prevAmenities.filter(
                          (amenity) => amenity !== "Free Wi-fi 24/7"
                        )
                  )
                }
              />
              <FaWifi className="mb-1 ml-3 mr-1 inline text-stone-800" />
              Free Wi-fi 24/7
            </label>
            <label className="ml-1 text-c4">
              <input
                className="ml-5"
                type="checkbox"
                checked={amenities.includes("Bathroom")}
                onChange={(e) =>
                  setAmenities((prevAmenities) =>
                    e.target.checked
                      ? [...prevAmenities, "Bathroom"]
                      : prevAmenities.filter(
                          (amenity) => amenity !== "Bathroom"
                        )
                  )
                }
              />
              <FaBath className="mb-1 ml-3 mr-1 inline text-stone-800" />
              Free clean bathroom
            </label>
            <label className="ml-1 text-c4">
              <input
                className="ml-5"
                type="checkbox"
                checked={amenities.includes("Free computer")}
                onChange={(e) =>
                  setAmenities((prevAmenities) =>
                    e.target.checked
                      ? [...prevAmenities, "Free computer"]
                      : prevAmenities.filter(
                          (amenity) => amenity !== "Free computer"
                        )
                  )
                }
              />
              <FaRegKeyboard className="mb-1 ml-3 mr-1 inline text-stone-800" />
              Free computer
            </label>
            <label className="ml-1 text-c4">
              <input
                className="ml-5"
                type="checkbox"
                checked={amenities.includes("Breakfast included")}
                onChange={(e) =>
                  setAmenities((prevAmenities) =>
                    e.target.checked
                      ? [...prevAmenities, "Breakfast included"]
                      : prevAmenities.filter(
                          (amenity) => amenity !== "Breakfast included"
                        )
                  )
                }
              />
              <FaBacon className="mb-1 ml-3 mr-1 inline text-stone-800" />
              Breakfast included
            </label>
            <label className="ml-1 text-c4">
              <input
                className="ml-5"
                type="checkbox"
                checked={amenities.includes("Free TV")}
                onChange={(e) =>
                  setAmenities((prevAmenities) =>
                    e.target.checked
                      ? [...prevAmenities, "Free TV"]
                      : prevAmenities.filter((amenity) => amenity !== "Free TV")
                  )
                }
              />
              <FaTv className="mb-1 ml-3 mr-1 inline text-stone-800" />
              Free TV
            </label>
            <label className="ml-1 text-c4">
              <input
                className="ml-5"
                type="checkbox"
                checked={amenities.includes("ATM")}
                onChange={(e) =>
                  setAmenities((prevAmenities) =>
                    e.target.checked
                      ? [...prevAmenities, "ATM"]
                      : prevAmenities.filter((amenity) => amenity !== "ATM")
                  )
                }
              />
              <FaMoneyBillWave className="mb-1 ml-3 mr-1 inline text-stone-800" />
              ATM
            </label>
            <label className="ml-1 text-c4">
              <input
                className="ml-5"
                type="checkbox"
                checked={amenities.includes("Free swimming pool")}
                onChange={(e) =>
                  setAmenities((prevAmenities) =>
                    e.target.checked
                      ? [...prevAmenities, "Free swimming pool"]
                      : prevAmenities.filter(
                          (amenity) => amenity !== "Free swimming pool"
                        )
                  )
                }
              />
              <FaSwimmingPool className="mb-1 ml-3 mr-1 inline text-stone-800" />
              Free swimming pool
            </label>
            <label className="ml-1 text-c4">
              <input
                className="ml-5"
                type="checkbox"
                checked={amenities.includes("Close to city center")}
                onChange={(e) =>
                  setAmenities((prevAmenities) =>
                    e.target.checked
                      ? [...prevAmenities, "Close to city center"]
                      : prevAmenities.filter(
                          (amenity) => amenity !== "Close to city center"
                        )
                  )
                }
              />
              <FaCity className="mb-1 ml-3 mr-1 inline text-stone-800" />
              Close to city center
            </label>
          </div>
          <div className="mb-4">
            <p className="text-bold mb-5 mr-5 inline h-6 text-left text-body-18 text-stone-800">
              Give us a price:
            </p>
            <p className="text-bold mb-5 ml-3 mr-1 inline h-6 text-left text-body-18 text-stone-800">
              €
            </p>
            <input
              type="text"
              placeholder="Set price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mb-4 rounded border p-2"
            />
          </div>
          <div className="mb-4">
            <p className="text-bold mb-5 mr-5 inline h-6 text-left text-body-18 text-stone-800">
              Additional booking options:
            </p>
            {bookOption.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  placeholder="Option Name"
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(index, "name", e.target.value)
                  }
                  className="mr-2 w-3/5 rounded border p-2"
                />
                <p className="text-bold mb-5 ml-3 mr-1 inline h-6 text-left text-body-18 text-stone-800">
                  €
                </p>
                <input
                  type="text"
                  placeholder="Price"
                  value={bookOPrice[index] || ""}
                  onChange={(e) =>
                    handleOptionChange(index, "price", e.target.value)
                  }
                  className="mr-2 w-1/5 rounded border p-2"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddOption}
              className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
            >
              Add Option
            </button>
          </div>
          <div className="mb-4">
            <button
              type="button"
              className="w-full rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Creator;
