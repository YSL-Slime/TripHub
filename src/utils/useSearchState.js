// useSearchState.js
import { useState } from "react";

export const useSearchState = () => {
  const [activeTab, setActiveTab] = useState("hotel");
  const [flightType, setFlightType] = useState("round-trip");
  const [passengerCount, setPassengerCount] = useState(1);
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  return {
    activeTab,
    setActiveTab,
    flightType,
    setFlightType,
    passengerCount,
    setPassengerCount,
    location,
    setLocation,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
  };
};
