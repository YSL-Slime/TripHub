import React from "react";
import HotelCard from "./HotelCard";

const HotelList = ({ accommodations }) => {
  return (
    <div className="flex-start mx-auto mb-[200px] flex flex-col gap-[240px] lg:mb-5 lg:gap-0">
      {accommodations.map((accommodation) => (
        <HotelCard
          key={accommodation._id}
          hotel={accommodation}
          id={accommodation._id}
        />
      ))}
    </div>
  );
};

export default HotelList;
