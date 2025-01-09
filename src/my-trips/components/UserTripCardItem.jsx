import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "@/service/FirebaseConfig";
import { MdDelete } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";
import axios from "axios";

function UserTripCardItem({ trip }) {
  const deleteTrip = async () => {
    try {
      const tripRef = doc(db, "AITrips", trip?.id);
      await deleteDoc(tripRef);
      console.log("Trip deleted successfully");
    } catch (error) {
      console.error("Error deleting trip: ", error);
    }
  };

  const [photos, setPhotos] = useState([]);
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
    <div className="flex justify-between items-center px-4 border rounded-xl hover:scale-105 transition-all">
      <Link to={"/view-trip/" + trip?.id}>
        <div className="w-full flex gap-5 py-3">
          {photos.length > 0 && (
            <div>
              {photos.map((photo) => (
                <div key={photo.id}>
                  <img
                    src={photo.urls.small}
                    alt={photo.alt_description}
                    className="w-[100px] h-[100px] rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col justify-center">
            <h2 className="font-bold text-lg">
              {trip?.userSelection?.location}
            </h2>
            <h2 className="font-sm text-gray-500">
              {trip?.userSelection?.noOfDays} days trip with{" "}
              {trip?.userSelection?.budget} budget
            </h2>
          </div>
        </div>
      </Link>
      <Button className="bg-red-700 hover:bg-red-800" onClick={deleteTrip}>
        <MdDelete />
      </Button>
    </div>
  );
}

export default UserTripCardItem;
