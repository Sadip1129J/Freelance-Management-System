import React from 'react';
import { MOCK_USERS, MOCK_ORDERS, MOCK_SERVICES } from '../services/mockData';
import { Users, ShoppingCart, DollarSign, Briefcase } from 'lucide-react';
import { OrderStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  // Calculate system stats
  const totalUsers = MOCK_USERS.length;
  const totalRevenue = MOCK_ORDERS.reduce((acc, order) => acc + order.totalPrice, 0);
  const totalOrders = MOCK_ORDERS.length;
  const activeOrders = MOCK_ORDERS.filter(o => o.status === OrderStatus.IN_PROGRESS).length;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Users</p>
              <p className="text-2xl font-bold text-slate-900">{totalUsers}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Platform Revenue</p>
              <p className="text-2xl font-bold text-slate-900">${totalRevenue}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Orders</p>
              <p className="text-2xl font-bold text-slate-900">{totalOrders}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Gigs</p>
              <p className="text-2xl font-bold text-slate-900">{MOCK_SERVICES.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* All Users Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Registered Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {MOCK_USERS.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-8 w-8 rounded-full" src={user.avatar} alt="" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${user.role === 'Admin' ? 'bg-red-100 text-red-800' : 
                            user.role === 'Freelancer' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* All Orders Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Recent Platform Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {MOCK_ORDERS.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{order.serviceTitle}</div>
                        <div className="text-xs text-slate-500">ID: {order._id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-bold">
                        ${order.totalPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === OrderStatus.COMPLETED ? 'bg-green-100 text-green-800' : 
                            order.status === OrderStatus.IN_PROGRESS ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};