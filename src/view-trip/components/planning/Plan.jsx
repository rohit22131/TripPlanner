import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Plan({trip,i}) {
    const dayKey = `day${i}`;
    const [morn, setMorn] = useState([]); 
    const [aft, setAft] = useState([]); 
    const [evn, setEvn] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const photoApi = import.meta.env.VITE_UNSPLASH_API_KEY;
    const UNSPLASH_API_URL = `https://api.unsplash.com/search/photos`;
  
    useEffect(() => {
      const fetchPhotos = async () => {
        setLoading(true);
        try {
          const responseMorn = await axios.get(UNSPLASH_API_URL, {
            params: {
              query: trip?.tripData?.itinerary[dayKey]?.morning?.place_name,
              client_id: photoApi,
              per_page: 1, 
            },
          });
          const responseAft = await axios.get(UNSPLASH_API_URL, {
            params: {
              query: trip?.tripData?.itinerary[dayKey]?.afternoon?.place_name,
              client_id: photoApi,
              per_page: 1, 
            },
          });
          const responseEve = await axios.get(UNSPLASH_API_URL, {
            params: {
              query: trip?.tripData?.itinerary[dayKey]?.evening?.place_name,
              client_id: photoApi, 
              per_page: 1, 
            },
          });
          setMorn(responseMorn.data.results);
          setAft(responseAft.data.results);
          setEvn(responseEve.data.results);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
        fetchPhotos();
    }, [trip?.tripData?.itinerary[dayKey]?.morning?.place_name]);
  
    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;


  return (
            <div className='flex flex-col gap-3 mt-5'>
    
            <div className='font-bold text-lg bg-gray-200 rounded-full flex justify-center p-2'>Day{i}</div>
            <Link to={'https://www.google.com/maps/search/?api=1&query='+trip?.tripData?.itinerary[dayKey]?.morning?.place_name} target="_black">
            <div className='flex gap-5 border rounded-lg p-3 hover:shadow-md transition-all'>
                    
                    
            {morn.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {morn.map((photo) => (
            <div key={photo.id}>
              <img
                src={photo.urls.small}
                alt={photo.alt_description}
                className='w-[130px] h-[130px] rounded-lg'
              />
            </div>
          ))}
        </div>
      )}
      <div>
          <h2 className='font-bold text-lg text-blue-900'>Morning</h2>
          <h2 className='font-medium text-md'>{trip?.tripData?.itinerary[dayKey]?.morning?.place_name}</h2>
          <h2 className='text-sm text-gray-500'>{trip?.tripData?.itinerary[dayKey]?.morning?.place_details}</h2>
          <h2 className='text-sm font-medium'>🕙 {trip?.tripData?.itinerary[dayKey]?.morning?.time_travel}</h2>
      </div>
      </div>
          </Link>
          <Link to={'https://www.google.com/maps/search/?api=1&query='+trip?.tripData?.itinerary[dayKey]?.afternoon?.place_name} target="_black">
  <div className='flex gap-5 border rounded-lg p-3 hover:shadow-md transition-all'>
            {aft.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {aft.map((photo) => (
            <div key={photo.id}>
              <img
                src={photo.urls.small}
                alt={photo.alt_description}
                className='w-[130px] h-[130px] rounded-lg'
              />
            </div>
          ))}
        </div>
      )}
      <div>
          <h2 className='font-bold text-lg text-blue-900'>Afternoon</h2>
          <h2 className='font-medium text-md'>{trip?.tripData?.itinerary[dayKey]?.afternoon?.place_name}</h2>
          <h2 className='text-sm text-gray-500'>{trip?.tripData?.itinerary[dayKey]?.afternoon?.place_details}</h2>
          <h2 className='text-sm font-medium'>🕙 {trip?.tripData?.itinerary[dayKey]?.afternoon?.time_travel}</h2>
      </div>
  </div>
            </Link>
            <Link to={'https://www.google.com/maps/search/?api=1&query='+trip?.tripData?.itinerary[dayKey]?.evening?.place_name} target="_black">
            <div className='flex gap-5 border rounded-lg p-3 hover:shadow-md transition-all'>
                    
                    
                    {evn.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {evn.map((photo) => (
            <div key={photo.id}>
              <img
                src={photo.urls.small}
                alt={photo.alt_description}
                className='w-[130px] h-[130px] rounded-lg'
              />
            </div>
          ))}
        </div>
      )}
    <div>
          <h2 className='font-bold text-lg text-blue-900'>Evening</h2>
          <h2 className='font-medium text-md'>{trip?.tripData?.itinerary[dayKey]?.evening?.place_name}</h2>
          <h2 className='text-sm text-gray-500'>{trip?.tripData?.itinerary[dayKey]?.evening?.place_details}</h2>
          <h2 className='text-sm font-medium'>🕙 {trip?.tripData?.itinerary[dayKey]?.evening?.time_travel}</h2>
      </div>
  </div>
  </Link>
  </div>
  )
}

export default Plan