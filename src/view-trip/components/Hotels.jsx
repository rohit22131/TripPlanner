import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Hotels({ trip }) {
  const [photos, setPhotos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const photoApi = import.meta.env.VITE_UNSPLASH_API_KEY;
  const UNSPLASH_API_URL = `https://api.unsplash.com/search/photos`;

  useEffect(() => {
    const fetchPhotosForHotels = async () => {
      setLoading(true);
      try {
        const hotelNames = trip?.tripData?.hotel_options.map(
          (hotel) => hotel.name
        );
        const photoRequests = hotelNames.map((name) =>
          axios.get(UNSPLASH_API_URL, {
            params: {
              query: name,
              client_id: photoApi,
              per_page: 1,
            },
          })
        );

        const responses = await Promise.all(photoRequests);
        const hotelPhotos = {};

        responses.forEach((response, index) => {
          const hotelName = hotelNames[index];
          hotelPhotos[hotelName] = response.data.results;
        });

        setPhotos(hotelPhotos);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (trip?.tripData?.hotel_options?.length) {
      fetchPhotosForHotels();
    }
  }, [trip?.tripData?.hotel_options]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <div className="mt-20">
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotel_options?.map((hotel) => (
          <Link
            key={hotel.name}
            to={`https://www.google.com/maps/search/?api=1&query=${hotel.name},${hotel.address}`}
            target="_blank"
          >
            <div className="mt-7 hover:scale-105 transition-all cursor-pointer">
              {photos[hotel.name] && photos[hotel.name].length > 0 && (
                <div>
                  {photos[hotel.name].map((photo) => (
                    <div key={photo.id}>
                      <img
                        src={photo.urls.small}
                        alt={photo.alt_description}
                        className="h-[100px] w-full object-cover rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel.name}</h2>
                <h2 className="text-xs text-gray-500">📍 {hotel.address}</h2>
                <h2 className="font-medium text-xs">💰 {hotel.price}</h2>
                <h2 className="font-medium text-xs">{hotel.rating}⭐</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
