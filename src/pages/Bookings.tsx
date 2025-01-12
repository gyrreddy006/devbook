import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import type { Booking, Developer } from '../types';
import { Button } from '../components/ui/button';
import { Video, Calendar } from 'lucide-react';

export function Bookings() {
  const { user } = useStore();
  const [bookings, setBookings] = useState<(Booking & { developer: Developer })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            developer:profiles!bookings_developer_id_fkey(*)
          `)
          .eq('customer_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const joinMeeting = (meetingUrl: string) => {
    window.open(meetingUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-600">Loading bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
        <p className="text-gray-600">
          When you book a developer, your sessions will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Bookings</h2>
      
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Session with {booking.developer.full_name}
                </h3>
                <p className="text-gray-600">
                  {new Date(booking.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'}`}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${booking.payment_status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'}`}
                >
                  Payment: {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-gray-600">
                Amount: ${booking.amount}
              </div>
              {booking.status === 'confirmed' && booking.meeting_url && (
                <Button
                  onClick={() => joinMeeting(booking.meeting_url)}
                  className="inline-flex items-center space-x-2"
                >
                  <Video className="h-4 w-4" />
                  <span>Join Meeting</span>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}