import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import BookingModal from './BookingModal';

const EventCard = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div className="card hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img 
            src={event.image || `https://source.unsplash.com/random/400x300/?${event.category.toLowerCase()}`} 
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {event.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{event.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>{formatTime(event.date)}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary-600">${event.price}</span>
              <span className="text-gray-500 text-sm ml-1">/ ticket</span>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary flex items-center space-x-1"
            >
              <Ticket className="h-4 w-4" />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <BookingModal 
          event={event} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default EventCard;