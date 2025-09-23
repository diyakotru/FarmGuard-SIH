import React from 'react';

const FeatureItem = ({ icon, title, description }) => (
  <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
    <div className="icon mb-4 text-teal-700">{icon}</div>
    <h3 className="font-semibold text-xl mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureItem;