// ChatbotIcon.jsx
import React, { useState } from 'react';

const ChatbotIcon = () => {
  const [showMessage, setShowMessage] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Speech bubble */}
      {showMessage && (
        <div className="absolute bottom-20 right-0 mb-2 mr-2">
          <div className="relative bg-white rounded-lg shadow-lg px-4 py-3 max-w-xs">
            {/* Speech bubble text */}
            <div className="text-gray-800 text-sm font-medium text-center leading-5">
              <div>Hi there!</div>
              <div>How can I</div>
              <div>help you?</div>
            </div>
            {/* Speech bubble arrow */}
            <div className="absolute bottom-0 right-4 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
            {/* Close button */}
            <button 
              onClick={() => setShowMessage(false)}
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 w-4 h-4 flex items-center justify-center text-xs"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Chatbot button */}
      <button 
        onClick={() => setShowMessage(!showMessage)}
        className="bg-teal-600 text-white rounded-full p-4 shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all"
      >
        {/* Chatbot icon, using an SVG for flexibility */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16l3-3m0 0l3 3m-3-3v9a2 2 0 01-2 2h-4l-2 2V19a2 2 0 01-2-2v-2" />
        </svg>
      </button>
    </div>
  );
};

export default ChatbotIcon;