import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Star, CheckCircle, ArrowLeft, Shield } from 'lucide-react';
import { api } from '../services/mockData';
import { Service, OrderStatus } from '../types';
import { useAuth } from '../context/AuthContext';

export const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [service, setService] = useState<Service | null>(null);
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => {
    if (id) {
      api.getServiceById(id).then(setService);
    }
  }, [id]);

  const handleOrder = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!service || !user) return;

    setIsOrdering(true);
    try {
      await api.createOrder({
        serviceId: service._id,
        serviceTitle: service.title,
        clientId: user._id,
        clientName: user.name,
        freelancerId: service.freelancerId,
        status: OrderStatus.PENDING,
        totalPrice: service.price,
        createdAt: new Date().toISOString()
      });
      // Navigate to client dashboard after successful order
      navigate('/dashboard/client');
    } catch (error) {
      console.error("Order failed", error);
    } finally {
      setIsOrdering(false);
    }
  };

  if (!service) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{service.title}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-amber-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-1 font-bold text-slate-900">{service.rating}</span>
                <span className="ml-1 text-slate-500">({service.reviewCount} reviews)</span>
              </div>
              <div className="h-4 w-px bg-slate-300"></div>
              <span className="text-slate-600">{service.category}</span>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <img src={service.imageUrl} alt={service.title} className="w-full h-96 object-cover" />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">About this Gig</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {service.description}
              </p>

              <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4">Why choose me?</h3>
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-slate-600">Professional quality work with unlimited revisions</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 font-medium">Standard Package</span>
                <span className="text-2xl font-bold text-slate-900">${service.price}</span>
              </div>
              
              <p className="text-slate-600 mb-6 text-sm">
                A complete package including source files, high resolution export, and commercial rights.
              </p>

              <div className="flex items-center justify-between text-sm text-slate-600 mb-6 font-medium">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {service.deliveryTimeDays} Days Delivery
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Guaranteed
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={isOrdering}
                className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isOrdering ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isOrdering ? 'Processing...' : 'Continue to Order'}
              </button>
              
              <div className="mt-4 text-center">
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  Contact Freelancer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};