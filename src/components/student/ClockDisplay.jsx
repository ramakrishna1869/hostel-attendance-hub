
import React, { useState, useEffect } from 'react';

const ClockDisplay = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="text-center w-full">
      <p className="text-lg font-medium text-gray-600">{formatDate(date)}</p>
      <p className="text-4xl font-extrabold text-center text-primary mt-2">
        {formatTime(date)}
      </p>
    </div>
  );
};

export default ClockDisplay;
