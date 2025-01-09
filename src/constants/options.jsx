export const SelectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole travels in exploration",
    icon: "🛩️",
    People: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "A sole travels in exploration",
    icon: "🥂",
    People: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A sole travels in exploration",
    icon: "🏡",
    People: "4",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A sole travels in exploration",
    icon: "⛵",
    People: "5",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on moderate side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Give the best suggestions",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Generate travel plan for location: {location}, for {totalDays} days for {people} people with a {budget} budget. give me the hotel options lists with hotel names, hotel address, price, hotel images url, geo coordinates, rating, descriptions and suggest itinerary with place name, place details and place images url, geo coordinates, ticket pricing, rating, time travel each of the location for {totalDays} days plan with best time to visit in JSON format.";
