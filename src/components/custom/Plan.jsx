import React from "react";
import { Button } from "../ui/button";

const Plan = () => {
  return (
    <div className="max-w-[1400px] m-auto p-20 grid lg:grid-cols-2 gap-4">
      {/* Left Side */}
      <div className="grid grid-cols-2 grid-rows-6 h-[80vh]">
        <img
          className="row-span-3 object-cover w-full h-full p-2"
          src="/travel1.jpg"
          alt="/"
        />
        <img
          className="row-span-2 object-cover w-full h-full p-2"
          src="/travel2.jpg"
          alt="/"
        />
        <img
          className="row-span-2 object-cover w-full h-full p-2"
          src="/travel3.jpg"
          alt="/"
        />
        <img
          className="row-span-3 object-cover w-full h-full p-2"
          src="/travel4.jpg"
          alt="/"
        />
        <img
          className="row-span-2 object-cover w-full h-full p-2"
          src="/travel5.jpg"
          alt="/"
        />
      </div>
      {/* Right Side */}
      <div className="flex flex-col h-full justify-center">
        <h3 className="text-5xl md:text-6xl font-bold">Plan Your Trip</h3>
        <p className="text-2xl py-6">Plan your next trip with TripGo</p>
        <p className="pb-6">
          Plan your perfect trip effortlessly! Create personalized itineraries,
          discover top destinations, book accommodations, and find exciting
          activities—all in one place. Travel smart, stress-free, and make every
          journey unforgettable!
        </p>
        <div className="flex justify-center mt-3">
          <a href="/my-trips">
            <Button
              variant="outline"
              className="border-black rounded-full hover:bg-red-700 hover:text-white hover:border-red-700"
            >
              My Trips
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Plan;
