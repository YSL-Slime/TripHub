/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { useSession } from "next-auth/react";
import PBox from "./PBox";

const DataS = () => {
  const { data: session } = useSession();
  const handleImageSave = (croppedImage) => {
    setImage(croppedImage);
  };

  const [name, setName] = useState("Enter your name");
  const [surname, setSurname] = useState("Enter your surname");
  const [email, setEmail] = useState("Enter your email");
  const [password, setPassword] = useState("Enter your password");
  const [birthday, setBirthday] = useState("Enter your birthday");
  const [country, setCountry] = useState("Where're you from");
  const [image, setImage] = useState("");
  const imageInputRef = useRef(null); // Ref for the hidden file input

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingSurname, setIsEditingSurname] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingBirthday, setIsEditingBirthday] = useState(false);
  const [isEditingCountry, setIsEditingCountry] = useState(false);

  const handleEdit = (setStateFunc) => {
    setStateFunc(true);
  };

  const handleSave = async (setStateFunc, fieldName, stateValueToUpdate) => {
    try {
      setStateFunc(false);
      const updatedUserData = { [fieldName]: stateValueToUpdate };

      const response = await fetch("/api/update-user-data", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user._id, // Assuming you have _id in the user session
          updatedUserData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Handle successful update
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleInputChange = (e, setStateFunc) => {
    setStateFunc(e.target.value);
  };

  const handleImageInputChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleImageUploadClick = () => {
    // Trigger the hidden file input
    imageInputRef.current.click();
  };

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <PBox />
        <div className="w-full md:w-3/5">
          <div className="mb-4">
            <span className="text-sm block font-bold text-gray-700">Name</span>
            <div className="flex items-center">
              <input
                type="text"
                value={name}
                onChange={(e) => handleInputChange(e, setName)}
                disabled={!isEditingName}
                className="flex-grow rounded border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring"
              />
              {isEditingName ? (
                <button
                  className="ml-2 h-8 w-8 bg-transparent"
                  onClick={() => handleSave(setIsEditingName, "name", name)}
                >
                  <FaCheck className="text-body-22 text-green-400" />
                </button>
              ) : (
                <button
                  className="ml-2 h-8 w-8 bg-transparent"
                  onClick={() => handleEdit(setIsEditingName)}
                >
                  <CiEdit className="text-body-22 text-gray-700" />
                </button>
              )}
            </div>
          </div>
          {/* Surname */}
          <div className="mb-4">
            <span className="text-sm block font-bold text-gray-700">
              Surname
            </span>
            <div className="flex items-center">
              <input
                type="text"
                value={surname}
                onChange={(e) => handleInputChange(e, setSurname)}
                disabled={!isEditingSurname}
                className="flex-grow rounded border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring"
              />
              {isEditingSurname ? (
                <button
                  className="ml-2 h-8 w-8 bg-transparent"
                  onClick={() =>
                    handleSave(setIsEditingSurname, "surname", surname)
                  }
                >
                  <FaCheck className="text-body-22 text-green-400" />
                </button>
              ) : (
                <button
                  className="ml-2 h-8 w-8 bg-transparent"
                  onClick={() => handleEdit(setIsEditingSurname)}
                >
                  <CiEdit className="text-body-22 text-gray-700" />
                </button>
              )}
            </div>
          </div>
          <div className="mb-4">
            <span className="text-sm block font-bold text-gray-700">Email</span>
            <div className="flex items-center">
              <input
                type="text"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                disabled={!isEditingEmail}
                className="flex-grow rounded border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring"
              />
              {isEditingEmail ? (
                <button
                  className="ml-2 h-8 w-8 bg-transparent"
                  onClick={() => handleSave(setIsEditingEmail, "email", email)}
                >
                  <FaCheck className="text-body-22 text-green-400" />
                </button>
              ) : (
                <button
                  className="ml-2 h-8 w-8 bg-transparent"
                  onClick={() => handleEdit(setIsEditingEmail)}
                >
                  <CiEdit className="text-body-22 text-gray-700" />
                </button>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <span className="text-sm block font-bold text-gray-700">
              Password
            </span>
            <div className="flex items-center">
              <input
                type="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                disabled={!isEditingPassword}
                className="flex-grow rounded border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring"
              />
              {isEditingPassword ? (
                <button
                  className="ml-2 h-8 w-8 bg-transparent"
                  onClick={() =>
                    handleSave(setIsEditingPassword, "password", password)
                  }
                >
                  <FaCheck className="text-body-22 text-green-400" />
                </button>
              ) : (
                <button
                  className="ml-2 h-8 w-8 bg-transparent"
                  onClick={() => handleEdit(setIsEditingPassword)}
                >
                  <CiEdit className="text-body-22 text-gray-700" />
                </button>
              )}
            </div>
          </div>

          {/* Birthday */}
          <div className="mb-4">
            <span className="text-sm block font-bold text-gray-700">
              Birthday
            </span>
            <div className="flex items-center">
              <input
                type="text"
                value={birthday}
                onChange={(e) => handleInputChange(e, setBirthday)}
                disabled={!isEditingBirthday}
                className="flex-grow rounded border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring"
              />
              {isEditingBirthday ? (
                <button
                  className="ml-2 h-8 w-8 bg-transparent"
                  onClick={() =>
                    handleSave(setIsEditingBirthday, "birthday", birthday)
                  }
                >
                  <FaCheck className="text-body-22 text-green-400" />
                </button>
              ) : (
                <button
                  className="ml-2 h-8 w-8 bg-transparent"
                  onClick={() => handleEdit(setIsEditingBirthday)}
                >
                  <CiEdit className="text-body-22 text-gray-700" />
                </button>
              )}
            </div>
          </div>

          {/* Country */}
          <div className="mb-4">
            <span className="text-sm block font-bold text-gray-700">
              Country
            </span>
            <div className="flex items-center">
              <input
                type="text"
                value={country}
                onChange={(e) => handleInputChange(e, setCountry)}
                disabled={!isEditingCountry}
                className="flex-grow rounded border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring"
              />
              {isEditingCountry ? (
                <button
                  className="ml-2 h-8 w-8 bg-transparent"
                  onClick={() =>
                    handleSave(setIsEditingCountry, "country", country)
                  }
                >
                  <FaCheck className="text-body-22 text-green-400" />
                </button>
              ) : (
                <button
                  className="ml-2 h-8 w-8 bg-transparent"
                  onClick={() => handleEdit(setIsEditingCountry)}
                >
                  <CiEdit className="text-body-22 text-gray-700" />
                </button>
              )}
            </div>
          </div>
          <div className="mb-6 flex">
        <div className="ml-5 mr-10 ">
          <p className="text-bold mb-5 mr-5 inline h-6 text-left text-body-18 text-stone-800">
            Profile image:
          </p>
          <label
            htmlFor="image-upload"
            className="mr-5 w-full cursor-pointer rounded bg-blue-500 px-4 py-2 text-center font-medium text-white hover:bg-blue-600"
          >
            Change Image
          </label>
          <input
            type="file"
            id="image-upload"
            single
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default DataS;
