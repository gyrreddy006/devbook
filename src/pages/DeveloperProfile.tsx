import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { useStore } from '../store/useStore';
import type { Developer } from '../types';

export function DeveloperProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Developer>>({
    full_name: '',
    hourly_rate: 0,
    skills: [],
    bio: '',
    wallet_address: '',
    availability_status: 'offline'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        skills: user.skills || []
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .upsert({
          ...formData,
          is_developer: true
        })
        .select()
        .single();

      if (error) throw error;
      
      setUser(profile as Developer);
      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({ ...prev, skills }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Developer Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="full_name"
              type="text"
              value={formData.full_name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="hourly_rate" className="block text-sm font-medium text-gray-700">
              Hourly Rate (USD)
            </label>
            <input
              id="hourly_rate"
              type="number"
              value={formData.hourly_rate || 0}
              onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills (comma-separated)
            </label>
            <input
              id="skills"
              type="text"
              value={formData.skills?.join(', ') || ''}
              onChange={handleSkillsChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="React, Node.js, TypeScript"
              required
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              value={formData.bio || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="wallet_address" className="block text-sm font-medium text-gray-700">
              Wallet Address
            </label>
            <input
              id="wallet_address"
              type="text"
              value={formData.wallet_address || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, wallet_address: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="availability_status" className="block text-sm font-medium text-gray-700">
              Availability Status
            </label>
            <select
              id="availability_status"
              value={formData.availability_status}
              onChange={(e) => setFormData(prev => ({ ...prev, availability_status: e.target.value as Developer['availability_status'] }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </form>
      </div>
    </div>
  );
}