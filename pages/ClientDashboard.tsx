import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/mockData';
import { Order, OrderStatus } from '../types';
import { Package, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      api.getOrdersByClient(user._id).then(setOrders);
    }
  }, [user]);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.COMPLETED: return 'bg-green-100 text-green-800 border-green-200';
      case OrderStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-800 border-blue-200';
      case OrderStatus.DISPUTED: return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">My Orders</h1>
        <p className="text-slate-500 mb-8">Manage your purchased services and project status.</p>

        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex-1 mb-4 sm:mb-0">
                  <div className="flex items-center justify-between sm:justify-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 mr-4">{order.serviceTitle}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-slate-500 flex flex-wrap gap-4">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Ordered: {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span>Order ID: #{order._id}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 border-t sm:border-t-0 border-slate-100 pt-4 sm:pt-0">
                  <div className="text-right mr-4 hidden sm:block">
                    <p className="text-sm text-slate-500">Total</p>
                    <p className="text-xl font-bold text-slate-900">${order.totalPrice}</p>
                  </div>
                  
                  <Link to="/chat" className="flex items-center justify-center p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors" title="Chat with Freelancer">
                    <MessageSquare className="h-5 w-5" />
                  </Link>

                  {order.status === OrderStatus.COMPLETED ? (
                    <button className="flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors shadow-sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Review
                    </button>
                  ) : (
                    <button className="flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
              <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No orders found</h3>
              <p className="text-slate-500 mt-1">Ready to start your next project?</p>
              <Link to="/" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Browse Services
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};