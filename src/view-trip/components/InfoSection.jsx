import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import axios from "axios";

function InfoSection({ trip }) {
  const [photos, setPhotos] = useState([]); // Store array of photos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const photoApi = import.meta.env.VITE_UNSPLASH_API_KEY;
  const UNSPLASH_API_URL = `https://api.unsplash.com/search/photos`;

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(UNSPLASH_API_URL, {
          params: {
            query: trip?.userSelection?.location,
            client_id: photoApi,
            per_page: 1,
          },
        });
        setPhotos(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (trip?.userSelection?.location) {
      fetchPhotos();
    }
  }, [trip?.userSelection?.location]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-4">
      {photos.length > 0 && (
        <div>
          {photos.map((photo) => (
            <div key={photo.id}>
              <img
                src={photo.urls.small}
                alt={photo.alt_description}
                className="h-[340px] w-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div>
          <div className="my-5 flex flex-col gap-2">
            <h2 className="font-bold text-2xl">
              {trip?.userSelection?.location}
            </h2>
          </div>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 rounded-full bg-gray-200 text-gray-600 text-xs md:text-md">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 rounded-full bg-gray-200 text-gray-600 text-xs md:text-md">
              💵 Budget: {trip?.userSelection?.budget}
            </h2>
            <h2 className="p-1 px-3 rounded-full bg-gray-200 text-gray-600 text-xs md:text-md">
              🧑‍🤝‍🧑 Number of Travellers: {trip?.userSelection?.people} people
            </h2>
          </div>
        </div>
        <Button className="w-15 h-10">
          <IoMdSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
