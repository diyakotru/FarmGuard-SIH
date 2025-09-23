// AlertBox.jsx
import React from 'react';

const AlertBox = ({ date, alertMessage }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
      {/* Date section */}
      <div className="text-sm font-semibold text-gray-500">
        {date}
      </div>
      
      {/* Alert message section */}
      <div className="text-base text-gray-800 font-medium">
        {alertMessage}
      </div>
    </div>
  );
};

export default AlertBox;