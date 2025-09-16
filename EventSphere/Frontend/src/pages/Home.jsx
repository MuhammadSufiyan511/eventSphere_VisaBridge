import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventList from '../Components/EventList';
import { getEvents } from '../Services/api';
import { Calendar, Ticket, Star, Users, ArrowRight, Play, Award, Heart } from 'lucide-react';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data.slice(0, 6)); // Show only 6 events on homepage
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const stats = [
    { icon: Calendar, label: 'Events', value: '50+', color: 'bg-blue-500' },
    { icon: Users, label: 'Happy Customers', value: '2K+', color: 'bg-green-500' },
    { icon: Ticket, label: 'Tickets Sold', value: '5K+', color: 'bg-purple-500' },
    { icon: Star, label: 'Rating', value: '4.9/5', color: 'bg-yellow-500' },
  ];

  const categories = [
    { name: 'Music', icon: '🎵', count: 18 },
    { name: 'Sports', icon: '⚽', count: 12 },
    { name: 'Arts', icon: '🎨', count: 20 },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Music Enthusiast",
      content: "EventSphere made finding and booking tickets so effortless. The best platform for event lovers!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Michael Chen",
      role: "Sports Fan",
      content: "I've attended 5 events through EventSphere this year. Each experience was seamless from booking to entry.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Emma Rodriguez",
      role: "Art Lover",
      content: "The curated art events on EventSphere are exceptional. Found exhibitions I wouldn't have discovered otherwise.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with gradient background and subtle animation */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/30 to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-bounce delay-1000"></div>
        
        <div className="container relative mx-auto px-4 py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-down">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Amazing Events</span> Near You
            </h1>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
              From concerts to conferences, find and book tickets for the best events in your city with our seamless platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/events" 
                className="group relative bg-white text-indigo-700 font-semibold text-lg px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center"
              >
                Browse All Events
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group flex items-center text-white bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl hover:bg-white/20 transition-all duration-300">
                <Play className="h-5 w-5 mr-2" />
                Watch Video
              </button>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg className="relative block w-full h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section with animated counters */}
      <section className="bg-white py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.color} text-white mb-4`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Explore by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover events that match your interests across our diverse categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border-2 border-transparent hover:border-indigo-100"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} events</p>
                <div className="mt-4 flex items-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">Explore events</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of must-attend events happening near you
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          ) : (
            <EventList events={events} />
          )}

          <div className="text-center mt-12">
            <Link 
              to="/events" 
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied event-goers who trust EventSphere
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-soft-light filter blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-soft-light filter blur-xl"></div>
        </div>
        
        <div className="container relative mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 text-cyan-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Something New?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join thousands of event-goers who trust EventSphere for their ticket booking needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/events" 
              className="group bg-white text-indigo-700 font-semibold text-lg px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group bg-white/10 backdrop-blur-sm text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
              <Heart className="h-5 w-5 mr-2" />
              Save Events
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;