// Fallback data in case backend is not available
export const mockEvents = [
  {
    _id: '1',
    title: "Summer Music Festival",
    description: "Join us for the biggest music festival of the year featuring top artists from around the world.",
    date: "2024-07-15T18:00:00Z",
    location: "Central Park, New York",
    category: "Music",
    price: 85,
    availableTickets: 500,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: '2',
    title: "Tech Innovation Conference",
    description: "A gathering of tech enthusiasts, entrepreneurs, and innovators discussing the future of technology.",
    date: "2024-06-20T09:00:00Z",
    location: "Convention Center, San Francisco",
    category: "Arts",
    price: 120,
    availableTickets: 300,
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: '3',
    title: "Marathon City Run",
    description: "Annual city marathon open to runners of all levels. Choose from 5K, 10K, or full marathon distances.",
    date: "2024-08-10T07:00:00Z",
    location: "Downtown, Chicago",
    category: "Sports",
    price: 45,
    availableTickets: 1000,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  // Add more mock events as needed for development
];

export default mockEvents;