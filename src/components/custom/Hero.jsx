import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import bgImage from "../../assets/background4.jpg";

function Hero() {
  return (
    <div
      className=" bg-cover lg:h-screen md:h-screen sm:h-screen h-[700px] bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className=" flex items-center backdrop-brightness-[.65] bg-cover h-[700px] lg:h-screen md:h-screen sm:h-screen">
        <div className="flex flex-col items-center mx-10 lg:mx-56 sm:mx-30 gap-9 pt-10">
          <h1 className="font-extrabold text-[30px] lg:text-[50px] sm:text-[40px] text-white text-center mt-16">
            <span className="text-red-700">
              Discover Your Next Adventure with AI:{" "}
            </span>
            personalized Itineraries at Your Fingertips
          </h1>
          <p className="text-xl text-gray-500 text-center text-white">
            {" "}
            Your personal trip planner and travel curator, creating custom
            itineraries tailored to your interest and budget.
          </p>

          <Link to={"/create-trip"}>
            <Button
              variant="outline"
              className="rounded-full bg-transparent border-white text-white hover:bg-red-700 hover:border-red-700 hover:text-white transition"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
