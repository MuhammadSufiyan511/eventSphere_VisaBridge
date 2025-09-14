import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, User, Ticket } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600 hover:text-primary-600';
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-800">EventSphere</span>
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link to="/" className={`flex items-center space-x-1 font-medium ${isActive('/')}`}>
              <Ticket className="h-5 w-5" />
              <span>Events</span>
            </Link>
            <Link to="/bookings" className={`flex items-center space-x-1 font-medium ${isActive('/bookings')}`}>
              <User className="h-5 w-5" />
              <span>My Bookings</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;