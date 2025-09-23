import React from 'react'
const HowItWorksStep = ({ step, title, description }) => (
  <div className="how-item" data-step={step}>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm text-center">{description}</p>
  </div>
);

export default HowItWorksStep;