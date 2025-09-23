// ChatbotIcon.jsx
import React from 'react';

const ChatbotIcon = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button className="bg-teal-600 text-white rounded-full p-4 shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all">
        {/* Chatbot icon, using an SVG for flexibility */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16l3-3m0 0l3 3m-3-3v9a2 2 0 01-2 2h-4l-2 2V19a2 2 0 01-2-2v-2" />
        </svg>
      </button>
    </div>
  );
};

export default ChatbotIcon;