import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Briefcase, User as UserIcon, Shield } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login(role);
    if (role === UserRole.FREELANCER) {
      navigate('/dashboard/freelancer');
    } else if (role === UserRole.ADMIN) {
      navigate('/dashboard/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Briefcase className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          (Demo Mode: Select a role to simulate login)
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <button
              onClick={() => handleLogin(UserRole.CLIENT)}
              className="w-full flex items-center justify-center px-4 py-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 transition-colors"
            >
              <UserIcon className="h-5 w-5 mr-2" />
              Continue as Client
            </button>
            
            <button
              onClick={() => handleLogin(UserRole.FREELANCER)}
              className="w-full flex items-center justify-center px-4 py-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <Briefcase className="h-5 w-5 mr-2" />
              Continue as Freelancer
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">System Access</span>
              </div>
            </div>

            <button
              onClick={() => handleLogin(UserRole.ADMIN)}
              className="w-full flex items-center justify-center px-4 py-3 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              <Shield className="h-5 w-5 mr-2 text-slate-500" />
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};