
import React from 'react';

const StatusMessage = ({ checkedIn, checkedOut, checkInTime, checkOutTime }) => {
  if (!checkedIn && !checkedOut) {
    return (
      <p className="text-sm text-gray-500 mt-4 text-center">
        You haven't checked in today yet.
      </p>
    );
  }

  if (checkedIn && !checkedOut) {
    return (
      <p className="text-sm text-gray-500 mt-4 text-center">
        You checked in at <span className="font-medium">{checkInTime}</span>
      </p>
    );
  }

  if (checkedIn && checkedOut) {
    return (
      <div className="text-sm text-gray-500 mt-4 text-center">
        <p>You checked in at <span className="font-medium">{checkInTime}</span></p>
        <p>You checked out at <span className="font-medium">{checkOutTime}</span></p>
      </div>
    );
  }

  return null;
};

export default StatusMessage;
