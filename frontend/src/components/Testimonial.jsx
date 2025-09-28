import React from 'react' 
const Testimonial = ({ quote, name, role }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
    <p className="text-gray-700 italic mb-4">"{quote}"</p>
    <div className="flex items-center space-x-4">
      <img src={avatarDataUrl(name)} alt={name} className="testimonial-avatar" />
      <div>
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{role}</div>
      </div>
    </div>
  </div>
);
export default Testimonial;