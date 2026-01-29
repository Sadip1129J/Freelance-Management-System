import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Briefcase, LogOut, MessageSquare, LayoutDashboard, User as UserIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    return user?.role === UserRole.FREELANCER ? '/dashboard/freelancer' : '/dashboard/client';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Briefcase className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-slate-900 tracking-tight">FreelanceFlow</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} className="text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
                  <LayoutDashboard className="h-4 w-4 mr-1.5" />
                  Dashboard
                </Link>
                <Link to="/chat" className="text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
                  <MessageSquare className="h-4 w-4 mr-1.5" />
                  Messages
                </Link>
                <div className="flex items-center ml-4 pl-4 border-l border-slate-200">
                  <img src={user?.avatar} alt={user?.name} className="h-8 w-8 rounded-full ring-2 ring-indigo-50" />
                  <span className="ml-2 text-sm font-semibold text-slate-700 hidden sm:block">{user?.name}</span>
                  <button onClick={handleLogout} className="ml-4 text-slate-400 hover:text-red-500 transition-colors">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Log in
                </Link>
                <Link to="/login" className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                  Join
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};