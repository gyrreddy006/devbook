export interface Developer {
  id: string;
  created_at: string;
  email: string;
  full_name: string;
  avatar_url: string;
  hourly_rate: number;
  skills: string[];
  bio: string;
  availability_status: 'available' | 'busy' | 'offline';
  wallet_address: string;
}

export interface Booking {
  id: string;
  created_at: string;
  developer_id: string;
  customer_id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'completed';
  amount: number;
  meeting_url: string;
}