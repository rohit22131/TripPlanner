import React from "react";

const Rooms = () => {
  return (
    <div className="max-w-[1090px] h-[370px] bg-blue-100 mx-auto my-20 py-10 px-10 lg:mb-[20%] md:mb-[35%] px-4 grid lg:grid-cols-3 gap-4">
      <div className="lg:top-20 relative lg:col-span-1 col-span-2">
        <h3 className="text-2xl font-bold">Find Hotel Rooms</h3>
        <p className="pt-4">
          Relax in comfort and style. Our hotel rooms offer modern amenities,
          exceptional service, and the perfect retreat for any traveler.
        </p>
      </div>

      <div className="grid grid-cols-2 col-span-2 gap-2">
        <img className="object-cover w-full h-full" src="/room1.jpg" alt="/" />
        <img
          className="row-span-2 object-cover w-full h-full"
          src="/room3.jpg"
          alt="/"
        />
        <img className="object-cover w-full h-full" src="/room4.jpg" alt="/" />
      </div>
    </div>
  );
};

export default Rooms;
