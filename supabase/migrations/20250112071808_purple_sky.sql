/*
  # Initial Schema Setup for Quick Dev Booking Platform

  1. New Tables
    - `profiles`
      - Stores developer profiles with their skills and rates
      - Contains availability status and wallet information
    - `bookings`
      - Manages booking records between customers and developers
      - Tracks payment status and meeting details

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  hourly_rate numeric DEFAULT 0,
  skills text[] DEFAULT '{}',
  bio text,
  availability_status text DEFAULT 'offline',
  wallet_address text,
  is_developer boolean DEFAULT false
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  developer_id uuid REFERENCES profiles(id),
  customer_id uuid REFERENCES profiles(id),
  status text DEFAULT 'pending',
  payment_status text DEFAULT 'pending',
  amount numeric NOT NULL,
  meeting_url text
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  USING (
    auth.uid() = customer_id OR
    auth.uid() = developer_id
  );

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings
  FOR UPDATE
  USING (
    auth.uid() = customer_id OR
    auth.uid() = developer_id
  );