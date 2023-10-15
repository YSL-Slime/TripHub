import React from "react";
import Creator from "./Creator";

const CreatePost = async () => {
  return (
    <div className="container mx-auto px-8 py-12">
      <div>
        <h1 className="mb-3 text-left text-heading-1 text-[#23262F]">
          Add your accomodation
        </h1>
      </div>
      <div className="mb-10 mt-1 border-b-2 border-blue-500"></div>
      <Creator />
    </div>
  );
};

export default CreatePost;
