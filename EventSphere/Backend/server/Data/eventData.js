export const eventData = [
  {
    title: "Summer Music Festival",
    description: "Join us for the biggest music festival of the year featuring top artists from around the world. Food trucks, drinks, and amazing vibes!",
    date: "2024-07-15T18:00:00Z",
    location: "Central Park, New York",
    category: "Music",
    price: 85,
    availableTickets: 500,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Tech Innovation Conference",
    description: "A gathering of tech enthusiasts, entrepreneurs, and innovators discussing the future of technology and digital transformation.",
    date: "2024-06-20T09:00:00Z",
    location: "Convention Center, San Francisco",
    category: "Arts",
    price: 120,
    availableTickets: 300,
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Marathon City Run",
    description: "Annual city marathon open to runners of all levels. Choose from 5K, 10K, or full marathon distances.",
    date: "2024-08-10T07:00:00Z",
    location: "Downtown, Chicago",
    category: "Sports",
    price: 45,
    availableTickets: 1000,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  // Add 47 more events following the same pattern
  {
    title: "Jazz Night Under the Stars",
    description: "Enjoy an evening of smooth jazz performances with local and international artists in an intimate outdoor setting.",
    date: "2024-07-08T19:30:00Z",
    location: "Riverside Amphitheater, Boston",
    category: "Music",
    price: 35,
    availableTickets: 200,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Contemporary Art Exhibition",
    description: "Featuring works from emerging contemporary artists exploring themes of identity and society.",
    date: "2024-06-25T10:00:00Z",
    location: "Modern Art Museum, Seattle",
    category: "Arts",
    price: 25,
    availableTickets: 150,
    image: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Professional Basketball Championship",
    description: "Witness the finals of the professional basketball league with the top two teams competing for the championship.",
    date: "2024-07-02T20:00:00Z",
    location: "City Arena, Los Angeles",
    category: "Sports",
    price: 95,
    availableTickets: 800,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
  // Continue adding more events to reach 50 total...
];

// Generate more events programmatically to reach 50
const additionalEvents = [];
const categories = ["Music", "Sports", "Arts"];
const locations = [
  "New York", "Los Angeles", "Chicago", "San Francisco", "Miami", 
  "Austin", "Seattle", "Boston", "Denver", "Las Vegas"
];
const eventTemplates = [
  { base: "Festival", categories: ["Music", "Arts"] },
  { base: "Concert", categories: ["Music"] },
  { base: "Exhibition", categories: ["Arts"] },
  { base: "Conference", categories: ["Arts"] },
  { base: "Championship", categories: ["Sports"] },
  { base: "Tournament", categories: ["Sports"] },
  { base: "Marathon", categories: ["Sports"] },
  { base: "Gala", categories: ["Arts", "Music"] },
  { base: "Show", categories: ["Music", "Arts"] },
  { base: "Cup", categories: ["Sports"] }
];

for (let i = 8; i <= 50; i++) {
  const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
  const category = template.categories[Math.floor(Math.random() * template.categories.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const price = Math.floor(Math.random() * 91) + 10; // $10-100
  const daysToAdd = Math.floor(Math.random() * 180) + 7; // 1 week to 6 months from now
  
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + daysToAdd);
  
  additionalEvents.push({
    title: `${category} ${template.base} ${i}`,
    description: `Join us for an amazing ${category.toLowerCase()} event featuring the best in the industry. Don't miss out on this incredible experience!`,
    date: eventDate.toISOString(),
    location: `${location} City Center`,
    category: category,
    price: price,
    availableTickets: Math.floor(Math.random() * 500) + 50,
    image: `https://source.unsplash.com/random/800x600/?${category.toLowerCase()}`
  });
}

export const completeEventData = [...eventData, ...additionalEvents];