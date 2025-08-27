import React, { useState, useEffect } from 'react';
import { useAirdrops } from '../../context/AirdropContext';
import { Button } from '../ui/Button';
import { Check, Clock } from 'lucide-react';

interface CheckInButtonProps {
  airdropId: string;
  lastCheckedIn?: string;
}

export const CheckInButton: React.FC<CheckInButtonProps> = ({ airdropId, lastCheckedIn }) => {
  const { checkInAirdrop } = useAirdrops();
  const [timeLeft, setTimeLeft] = useState('');
  const [canCheckIn, setCanCheckIn] = useState(false);

  useEffect(() => {
    if (!lastCheckedIn) {
      setCanCheckIn(true);
      return;
    }

    const checkInTime = new Date(lastCheckedIn).getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const nextCheckInTime = checkInTime + twentyFourHours;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextCheckInTime - now;

      if (distance < 0) {
        setCanCheckIn(true);
        setTimeLeft('');
        clearInterval(interval);
        return;
      }
      
      setCanCheckIn(false);
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastCheckedIn]);

  const handleCheckIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    checkInAirdrop(airdropId);
  };

  if (canCheckIn) {
    return (
      <Button onClick={handleCheckIn} className="w-full bg-green-500 hover:bg-green-600 text-white !py-2 !text-sm">
        <span className="flex items-center justify-center gap-1.5"><Check size={14} /> Mark Daily Task as Done</span>
      </Button>
    );
  }

  return (
    <div className="w-full bg-gray-200 text-black border-[3px] border-black font-bold px-4 py-2.5 text-sm text-center">
      <span className="flex items-center justify-center gap-1.5"><Clock size={14} /> Check in again in: {timeLeft}</span>
    </div>
  );
};