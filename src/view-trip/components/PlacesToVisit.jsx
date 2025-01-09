import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import Plan from "./planning/Plan";

function PlacesToVisit({ trip }) {
  const planning = [];
  for (let i = 0; i < trip?.userSelection?.noOfDays; i++) {
    planning.push(<Plan trip={trip} i={i + 1} />);
  }

  return (
    <div className="mt-10">
      <h2 className="font-bold text-lg">Places To Visit</h2>
      {planning}
    </div>
  );
}

export default PlacesToVisit;
