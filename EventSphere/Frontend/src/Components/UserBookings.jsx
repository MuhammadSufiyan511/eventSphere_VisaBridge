import React, { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  Download, 
  Filter, 
  Search, 
  ChevronDown,
  ChevronUp,
  QrCode,
  Share,
  Eye,
  Trash2
} from "lucide-react";

const UserBookings = ({ bookings }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedBooking, setExpandedBooking] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
      case "paid":
        return "✅";
      case "pending":
        return "⏳";
      case "cancelled":
        return "❌";
      default:
        return "📝";
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = activeFilter === "all" || booking.status === activeFilter;
    const matchesSearch = booking.event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleExpandBooking = (bookingId) => {
    if (expandedBooking === bookingId) {
      setExpandedBooking(null);
    } else {
      setExpandedBooking(bookingId);
    }
  };

  const handleDownloadTickets = (booking) => {
    // Simulate download functionality
    alert(`Downloading tickets for ${booking.event.title}`);
  };

  const handleShareBooking = (booking) => {
    // Simulate share functionality
    if (navigator.share) {
      navigator.share({
        title: `My booking for ${booking.event.title}`,
        text: `Check out my booking for ${booking.event.title} on ${formatDate(booking.event.date)}`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      alert('Web Share API not supported in your browser');
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-100 rounded-full mb-6">
              <Ticket className="h-12 w-12 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No bookings yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Your upcoming event tickets will appear here once you make a booking
            </p>
            <button className="btn-primary inline-flex items-center">
              <span>Browse Events</span>
              <ChevronDown className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Manage your event tickets and bookings
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 "
              />
            </div>
            
            <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300 px-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="py-2 bg-transparent focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </p>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="card overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleExpandBooking(booking._id)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-800 pr-4">
                        {booking.event.title}
                      </h3>
                      <span className="text-2xl">
                        {getStatusIcon(booking.status)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(booking.event.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatTime(booking.event.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{booking.event.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : "Pending"}
                    </span>
                    <p className="text-2xl font-bold text-primary-600 mt-2">
                      ${booking.totalAmount}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">
                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    {expandedBooking === booking._id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedBooking === booking._id && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Booking Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Booking ID</span>
                          <span className="font-medium">{booking._id.slice(-8).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tickets</span>
                          <span className="font-medium">{booking.ticketCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price per ticket</span>
                          <span className="font-medium">${(booking.totalAmount / booking.ticketCount).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Your Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name</span>
                          <span className="font-medium">{booking.user.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email</span>
                          <span className="font-medium">{booking.user.email}</span>
                        </div>
                        {booking.user.phone && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone</span>
                            <span className="font-medium">{booking.user.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <QrCode className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">Ticket QR Code</span>
                      </div>
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">QR Code</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => handleDownloadTickets(booking)}
                      className="btn-primary flex items-center space-x-2 text-sm py-2 px-4"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Tickets</span>
                    </button>
                    
                    <button 
                      onClick={() => handleShareBooking(booking)}
                      className="btn-secondary flex items-center space-x-2 text-sm py-2 px-4"
                    >
                      <Share className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                    
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center space-x-2 text-sm py-2 px-4 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    
                    {booking.status === "pending" && (
                      <button className="bg-red-100 hover:bg-red-200 text-red-700 flex items-center space-x-2 text-sm py-2 px-4 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookings found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;