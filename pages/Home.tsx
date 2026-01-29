import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock } from 'lucide-react';
import { api } from '../services/mockData';
import { Service } from '../types';

export const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        setServices(data);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-indigo-700 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find the perfect freelance services
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
            Connect with talented professionals to get your project done.
          </p>
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-lg border-gray-300 rounded-md py-4"
                placeholder="What service are you looking for?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Popular Services</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Link key={service._id} to={`/service/${service._id}`} className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-slate-100">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded">
                      {service.category}
                    </span>
                    <div className="flex items-center text-amber-400 text-sm">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 font-medium text-slate-700">{service.rating}</span>
                      <span className="ml-1 text-slate-400">({service.reviewCount})</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>
                  <div className="flex items-center mt-auto pt-4 border-t border-slate-100">
                    <img src={`https://picsum.photos/seed/${service.freelancerName}/50/50`} alt="" className="h-8 w-8 rounded-full bg-slate-200" />
                    <span className="ml-2 text-sm text-slate-600 font-medium">By {service.freelancerName}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-slate-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.deliveryTimeDays} days
                    </div>
                    <span className="text-lg font-bold text-slate-900">From ${service.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};