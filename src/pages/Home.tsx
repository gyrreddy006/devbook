import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Code2 className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Instant Developer Consultations
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect with expert developers instantly for quick problem-solving and code reviews
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/auth')}
          className="inline-flex items-center space-x-2"
        >
          <span>Get Started</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Instant Access</h3>
          <p className="text-gray-600">
            Connect with developers immediately through video calls
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Crypto Payments</h3>
          <p className="text-gray-600">
            Secure and fast payments using cryptocurrency
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Expert Developers</h3>
          <p className="text-gray-600">
            Access to skilled developers across various technologies
          </p>
        </div>
      </div>
    </div>
  );
}