import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlacePhotos = ({ location }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const UNSPLASH_API_KEY = 'Y2mBSBTIXOZVm3yzmyMEznd_wQq-cignKupbPEXHU5Vg';  // Replace with your Unsplash API Key
  const UNSPLASH_API_URL = `https://api.unsplash.com/search/photos`;

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(UNSPLASH_API_URL, {
          params: {
            query: location,
            client_id: UNSPLASH_API_KEY, // Your Unsplash API key
            per_page: 12,  // Number of photos to fetch
          },
        });
        setPhotos(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchPhotos();
    }
  }, [location]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Explore Places in {location}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={photo.urls.small}
              alt={photo.alt_description}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-500">{photo.alt_description || 'No description'}</p>
              <p className="text-xs text-gray-400">Photo by {photo.user.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacePhotos;
