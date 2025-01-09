import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

   export  const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate travel plan for location: Las Vegas, for 3 days for couple with a cheap budget. give me the hotel options lists with hotel names, hotel address, price, hotel images url, geo coordinates, rating, descriptions and suggest itinerary with place name, place details and place images url, geo coordinates, ticket pricing, rating, time travel each of the location for 3 days plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotel_options\": [\n    {\n      \"name\": \"The D Las Vegas\",\n      \"address\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50-$100 per night\",\n      \"image_url\": \"https://www.thedorleans.com/media/images/hotel/the-d-las-vegas-hotel-exterior-daytime.jpg\",\n      \"geo_coordinates\": \"36.1699° N, 115.1421° W\",\n      \"rating\": 4.0,\n      \"description\": \"A budget-friendly hotel located in the heart of Fremont Street Experience. It features a casino, a rooftop pool, and various dining options.\"\n    },\n    {\n      \"name\": \"Circus Circus Hotel & Casino\",\n      \"address\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"$40-$80 per night\",\n      \"image_url\": \"https://www.circuscircus.com/media/images/hotel/exterior.jpg\",\n      \"geo_coordinates\": \"36.1153° N, 115.1724° W\",\n      \"rating\": 3.5,\n      \"description\": \"A classic Las Vegas hotel with a carnival theme. It features a large casino, a midway with rides, and affordable dining options.\"\n    },\n    {\n      \"name\": \"Golden Nugget Hotel & Casino\",\n      \"address\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$60-$120 per night\",\n      \"image_url\": \"https://www.goldennugget.com/media/images/hotel/exterior.jpg\",\n      \"geo_coordinates\": \"36.1696° N, 115.1418° W\",\n      \"rating\": 4.5,\n      \"description\": \"A luxurious hotel with a historic charm, located on Fremont Street. It features a casino, a shark tank, and a variety of restaurants and bars.\"\n    },\n    {\n      \"name\": \"The Strat Hotel, Casino & SkyPod\",\n      \"address\": \"2000 Las Vegas Blvd S, Las Vegas, NV 89104\",\n      \"price\": \"$45-$90 per night\",\n      \"image_url\": \"https://www.thestrat.com/media/images/hotel/exterior.jpg\",\n      \"geo_coordinates\": \"36.1250° N, 115.1679° W\",\n      \"rating\": 3.8,\n      \"description\": \"A tall hotel with an observation deck offering panoramic views of Las Vegas. It features a casino, a pool, and several dining options.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"morning\": {\n        \"place_name\": \"Fremont Street Experience\",\n        \"place_details\": \"A vibrant pedestrian mall with live music, street performers, and a giant LED canopy. You can also enjoy a variety of restaurants and bars.\",\n        \"image_url\": \"https://www.fremontstreetexperience.com/media/images/fremont-street-experience-overview.jpg\",\n        \"geo_coordinates\": \"36.1694° N, 115.1419° W\",\n        \"ticket_pricing\": \"Free entry\",\n        \"rating\": 4.5,\n        \"time_travel\": \"2 hours\"\n      },\n      \"afternoon\": {\n        \"place_name\": \"Neon Museum\",\n        \"place_details\": \"A museum showcasing historic Las Vegas neon signs. You can take a guided tour and learn about the city's colorful past.\",\n        \"image_url\": \"https://www.neonmuseum.org/media/images/neon-museum-exterior.jpg\",\n        \"geo_coordinates\": \"36.1732° N, 115.1357° W\",\n        \"ticket_pricing\": \"$25 per adult\",\n        \"rating\": 4.8,\n        \"time_travel\": \"1.5 hours\"\n      },\n      \"evening\": {\n        \"place_name\": \"The D Las Vegas\",\n        \"place_details\": \"Enjoy a free concert at the D Las Vegas, or watch a show at the Golden Nugget.\",\n        \"image_url\": \"https://www.thedorleans.com/media/images/hotel/the-d-las-vegas-hotel-exterior-daytime.jpg\",\n        \"geo_coordinates\": \"36.1699° N, 115.1421° W\",\n        \"ticket_pricing\": \"Free\",\n        \"rating\": 4.0,\n        \"time_travel\": \"2 hours\"\n      }\n    },\n    \"day2\": {\n      \"morning\": {\n        \"place_name\": \"Hoover Dam\",\n        \"place_details\": \"A magnificent dam located near Las Vegas. You can take a tour of the dam and learn about its history and engineering marvels.\",\n        \"image_url\": \"https://www.hooverdam.com/media/images/hoover-dam-exterior.jpg\",\n        \"geo_coordinates\": \"36.0297° N, 114.9622° W\",\n        \"ticket_pricing\": \"$30 per adult\",\n        \"rating\": 4.9,\n        \"time_travel\": \"4 hours\"\n      },\n      \"afternoon\": {\n        \"place_name\": \"Red Rock Canyon National Conservation Area\",\n        \"place_details\": \"A scenic park with red rock formations, hiking trails, and scenic drives.\",\n        \"image_url\": \"https://www.nps.gov/redr/media/images/red-rock-canyon-national-conservation-area-exterior.jpg\",\n        \"geo_coordinates\": \"36.1486° N, 115.2397° W\",\n        \"ticket_pricing\": \"$15 per vehicle\",\n        \"rating\": 4.7,\n        \"time_travel\": \"3 hours\"\n      },\n      \"evening\": {\n        \"place_name\": \"Las Vegas Strip\",\n        \"place_details\": \"Walk along the Strip and admire the dazzling lights and iconic hotels.\",\n        \"image_url\": \"https://www.visitlasvegas.com/media/images/las-vegas-strip-overview.jpg\",\n        \"geo_coordinates\": \"36.1146° N, 115.1729° W\",\n        \"ticket_pricing\": \"Free\",\n        \"rating\": 5.0,\n        \"time_travel\": \"2 hours\"\n      }\n    },\n    \"day3\": {\n      \"morning\": {\n        \"place_name\": \"Bellagio Conservatory & Botanical Garden\",\n        \"place_details\": \"A beautiful garden with seasonal floral displays and stunning sculptures.\",\n        \"image_url\": \"https://www.bellagio.com/media/images/bellagio-conservatory-and-botanical-garden-exterior.jpg\",\n        \"geo_coordinates\": \"36.1135° N, 115.1725° W\",\n        \"ticket_pricing\": \"Free\",\n        \"rating\": 4.8,\n        \"time_travel\": \"1 hour\"\n      },\n      \"afternoon\": {\n        \"place_name\": \"The LINQ Promenade\",\n        \"place_details\": \"A shopping and dining destination with a variety of restaurants, bars, and shops.\",\n        \"image_url\": \"https://www.caesars.com/media/images/the-linq-promenade-exterior.jpg\",\n        \"geo_coordinates\": \"36.1208° N, 115.1709° W\",\n        \"ticket_pricing\": \"Free\",\n        \"rating\": 4.4,\n        \"time_travel\": \"2 hours\"\n      },\n      \"evening\": {\n        \"place_name\": \"Free Show on the Strip\",\n        \"place_details\": \"Enjoy a free show on the Strip such as the Bellagio Fountains, the Mirage Volcano, or the Wynn Lake of Dreams.\",\n        \"image_url\": \"https://www.bellagio.com/media/images/bellagio-fountains-show-exterior.jpg\",\n        \"geo_coordinates\": \"36.1135° N, 115.1725° W\",\n        \"ticket_pricing\": \"Free\",\n        \"rating\": 4.9,\n        \"time_travel\": \"2 hours\"\n      }\n    }\n  },\n  \"best_time_to_visit\": \"Las Vegas is a year-round destination, but the best time to visit is during the spring (March-May) and fall (September-November) for pleasant weather and fewer crowds.\"\n}\n```\n\n**Note:**\n\n* Prices for hotels and attractions are approximate and may vary depending on the season and availability.\n* This itinerary is just a suggestion, and you can customize it based on your interests and budget.\n* You can use public transportation or ride-sharing services to get around Las Vegas.\n* Make sure to check the opening hours and ticket prices of attractions before you visit.\n* Remember to pack comfortable shoes for walking, sunscreen, and a hat.\n* Have fun!\n"},
          ],
        },
      ],
    });
  