
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Clock } from 'lucide-react';

const CheckInOutButton = ({ checkedIn, checkedOut, onCheckIn, onCheckOut, loading }) => {
  if (checkedIn && checkedOut) {
    return (
      <Button 
        className="w-full py-3 rounded-lg text-lg" 
        variant="outline" 
        disabled
      >
        <Check className="mr-2 h-5 w-5" />
        Attendance Completed
      </Button>
    );
  }

  if (checkedIn) {
    return (
      <Button 
        className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white text-lg" 
        onClick={onCheckOut} 
        disabled={loading}
      >
        <Clock className="mr-2 h-5 w-5" />
        {loading ? 'Processing...' : 'Check Out'}
      </Button>
    );
  }

  return (
    <Button 
      className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-white text-lg" 
      onClick={onCheckIn} 
      disabled={loading}
    >
      <Clock className="mr-2 h-5 w-5" />
      {loading ? 'Processing...' : 'Check In'}
    </Button>
  );
};

export default CheckInOutButton;
