"use client";

import React, { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import GoogleButton from "react-google-button";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [err, setErr] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [imagee, setImagee] = useState("");

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toggleForm();
    }
  };

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    //
    name: "",
    surname: "",
    email: "",
    password: "",
    country: "",
    birthday: "",
    image: "",
  });

  const handleImageChange = (event) => {
    const selectedImages = event.target.files[0];

    const data = new FormData();
    data.append("file", selectedImages);
    data.append("upload_preset", "my-uploads");
    data.append("cloud_name", "du5u27pt0");

    fetch("https://api.cloudinary.com/v1_1/du5u27pt0/image/upload", {
      method: "post",
      body: data,
    })
      .then(async (res) => {
        const result = await res.json();
        console.log(result);
        setImagee((prev) => [...prev, result.secure_url]);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(imagee);

    setFormValues({ ...formValues, image: imagee });
  };

  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn("credentials", {
        //
        name: formValues.name,
        surname: formValues.surname,
        email: formValues.email,
        password: formValues.password,
        country: formValues.country,
        birthday: formValues.birthday,
        image: formValues.image,
        redirect: false,
        callbackUrl: "/",
      });
      setFormValues({
        name: "",
        surname: "",
        email: "",
        password: "",
        country: "",
        birthday: "",
        image: "",
      }); //
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    console.log(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        className="focus:shadow-outline rounded-3xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
        onClick={toggleForm}
      >
        Sign Up
      </button>
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-3xl bg-white p-8" ref={modalRef}>
            <h2 className="mb-6 flex justify-center text-heading-2 font-normal">
              Sign Up
            </h2>
            <form onSubmit={onSubmit}>
              {error && (
                <p className="mb-6 rounded bg-red-300 py-4 text-center">
                  {error}
                </p>
              )}
              <div className="mb-4">
                <label
                  className="text-sm mb-2 block font-bold text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className={`${input_style}`}
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-sm mb-2 block font-bold text-gray-700"
                  htmlFor="surname"
                >
                  Surame
                </label>
                <input
                  className={`${input_style}`}
                  id="surname"
                  name="surname"
                  placeholder="Enter your surname"
                  value={formValues.surname}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-sm mb-2 block font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`${input_style}`}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-sm mb-2 block font-bold text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className={`${input_style}`}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-sm mb-2 block font-bold text-gray-700"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  className={`${input_style}`}
                  id="country"
                  name="country"
                  placeholder="Enter your country"
                  value={formValues.country}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-sm mb-2 block font-bold text-gray-700"
                  htmlFor="birthday"
                >
                  Birthday
                </label>
                <input
                  className={`${input_style}`}
                  id="birthday"
                  name="birthday"
                  placeholder="Enter your birthday"
                  value={formValues.birthday}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <p className="text-bold mb-5 mr-5 inline h-6 text-left text-body-18 text-stone-800">
                  Add image:
                </p>
                <label
                  htmlFor="image"
                  className="mr-5 w-full cursor-pointer rounded bg-blue-500 px-4 py-2 text-center font-medium text-white hover:bg-blue-600"
                >
                  Choose Image
                </label>
                {formValues.image ? (
                  <p className="text-sm mt-2 inline text-stone-800">
                    Image uploaded
                  </p>
                ) : (
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                )}
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="focus:shadow-outline rounded-[40px] bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "loading..." : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <span className="text-gray-400">- or -</span>
            </div>
            <GoogleButton
              className="ml-9 mt-2 flex items-center justify-center"
              onClick={() => signIn("google")}
            />
            {err && console.log(err)}
            <div className="mt-4 text-center">
              <span className="text-gray-700">Have an account?</span>
              <a className="ml-2 text-blue-500 hover:text-blue-600" href="/">
                Log In
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
