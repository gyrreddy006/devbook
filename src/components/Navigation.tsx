import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Button } from './ui/button';
import { Code2, Calendar, User } from 'lucide-react';

export function Navigation() {
  const { isAuthenticated, user } = useStore();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">QuickDev</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/bookings">
                  <Button variant="secondary" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Bookings</span>
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="secondary" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}