import React from 'react';

const DefaultAvatar = ({ name, size = 40 }) => {
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return parts.slice(0, 2).map(p => p[0]).join('').toUpperCase();
  };

  const getRandomColor = (name) => {
    // Generate consistent colors based on name
    const colors = [
      'bg-blue-500 text-white',
      'bg-green-500 text-white',
      'bg-purple-500 text-white',
      'bg-red-500 text-white',
      'bg-indigo-500 text-white',
      'bg-pink-500 text-white',
      'bg-yellow-500 text-white',
      'bg-teal-500 text-white',
      'bg-orange-500 text-white',
      'bg-cyan-500 text-white'
    ];
    
    if (!name) return 'bg-gray-500 text-white';
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div 
      className={`flex items-center justify-center font-bold rounded-full ${getRandomColor(name)}`}
      style={{ 
        width: size, 
        height: size, 
        fontSize: size * 0.35,
        minWidth: size,
        minHeight: size
      }}
    >
      {getInitials(name)}
    </div>
  );
};

export default DefaultAvatar;