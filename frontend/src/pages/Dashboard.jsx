import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { createPortal } from 'react-dom';
import logo from '../assets/logo.png';

// Make sure to install lucide-react: npm install lucide-react
import { 
    LogOut, 
    LayoutDashboard, 
    ShieldCheck, 
    ListTodo, 
    GraduationCap, 
    Bell, 
    Globe, 
    ShieldAlert, 
    ListChecks, 
    AlertTriangle,
    Circle,
    Users,
    MessageSquare,
    X,
} from 'lucide-react';

// --- All Components are now in this single file ---

// 1. Sidebar Component
export const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const navLinks = [
    { icon: <LayoutDashboard size={20} />, text: t('dashboard'), to: '/dashboard' },
    { icon: <ShieldCheck size={20} />, text: t('risk_assessment'), to: '/risk-assessment' },
    { icon: <ListTodo size={20} />, text: t('digital_checklist'), to: '/digital-checklist' },
    { icon: <GraduationCap size={20} />, text: t('training_modules'), to: '/training-modules' },
    { icon: <Bell size={20} />, text: t('alerts'), to: '/alerts', badge: 3 },
    { icon: <Users size={20} />, text: t('community_hub'), to: '/community' },
    { icon: <Globe size={20} />, text: t('myfarm_360'), to: '/myfarm-360' },
  ];
  const mapLink = { 
    icon: <Globe size={20} />, 
    text: t('myfarm_360'), 
    key: 'map-360' 
  };
  
    const handleMapClick = (e) => {
    e.preventDefault(); // Prevents React Router from trying to navigate anywhere
    alert("MyFarm 360° is coming soon! Thank you for your patience.");
  };

  return (
    <div className="w-64 bg-white text-[#08202b] flex-col shadow-lg hidden lg:flex">
      {/* ✅ YOUR COLOR is used here for the main title */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="FarmGuard Logo" className="h-8 w-8" />
          <div className="text-2xl font-bold text-[#0f766e]">
            {t('farmguard')}
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6">
        {navLinks.map((link, index) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
            key={index}
            to={link.to}
            className={`flex items-center gap-4 px-4 py-3 mb-2 rounded-lg transition-colors relative
                ${isActive
                  ? 'bg-[#0f766e] text-white font-semibold shadow-sm'
                  : 'text-[#5b6770] hover:bg-[#f6fbf9] hover:text-[#08202b]'
                }`}
            >
              {link.icon}
              <span>{link.text}</span>
              {link.badge && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          className="flex items-center gap-4 px-4 py-3 text-[#5b6770] hover:bg-[#f6fbf9] hover:text-[#08202b] rounded-lg w-full text-left"
          onClick={() => { logout(); navigate('/'); }}
        >
          <LogOut size={20} />
          <span>{t('logout')}</span>
        </button>
      </div>
    </div>
  );
};

// 2. Dashboard Header Component with Language Switcher
export const DashboardHeader = () => {
  const { i18n, t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'te', label: 'తెలుగు' }
  ];
  return (
    <header className="bg-white p-6 border-b border-gray-200 flex justify-between items-center">
      <div>
  <h1 className="text-2xl font-bold text-[#08202b]">{t('welcome_back')}, Ram Singh</h1>
  <p className="text-[#5b6770]">Singh Poultry Farm - Punjab, India</p>
      </div>
      <div className="flex items-center gap-6">
        {/* Notification Button */}
        <button className="text-[#5b6770] hover:text-[#0f766e] relative">
          <Bell size={24} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#f87171] rounded-full"></span>
        </button>
        {/* Language Switcher Button */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center px-3 py-2 bg-[#0e766d] hover:bg-[#0b5e53] text-white rounded-full shadow-sm border border-gray-200 font-medium focus:outline-none"
            aria-haspopup="listbox"
            aria-expanded={langOpen}
            style={{ minWidth: '110px' }}
            >
            <Globe size={20} className="mr-2" />
            <span className="mr-2">{languages.find(l => l.code === i18n.language)?.label || t('language')}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {langOpen && (
            <ul className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {languages.map(lang => (
                <li key={lang.code}>
                  <button
                    onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${i18n.language === lang.code ? 'bg-[#0e766d] text-white font-semibold' : ''}`}
                    >
                    {lang.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

// 3. StatCard Component
const StatCard = ({ icon, title, value, label, labelColor }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#5b6770]">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold text-[#08202b] mb-2">{value}</p>
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${labelColor}`}>
        {label}
      </span>
    </div>
  );
};

// 4. Recent Alerts Component
const RecentAlerts = () => {
  const alerts = [
    { title: 'Avian Flu Alert - Regional', date: '2025-01-14', level: 'high' },
    { title: 'Updated Vaccination Requirements', date: '2025-01-13', level: 'medium' },
    { title: 'Heavy Rain Warning', date: '2025-01-12', level: 'low' },
  ];
  
  const getIconColor = (level) => {
    if (level === 'high') return 'text-[#f87171]'; // critical-red
    if (level === 'medium') return 'text-[#fb923c]'; // warning-orange
    return 'text-[#60a5fa]'; // progress-blue
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-[#08202b] mb-4">Recent Alerts</h2>
      <ul className="space-y-4">
        {alerts.map((alert, index) => (
          <li key={index} className="flex items-start gap-4 p-2 rounded-md hover:bg-[#f6fbf9]">
            <div className={`mt-1 ${getIconColor(alert.level)}`}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="font-semibold text-[#08202b]">{alert.title}</p>
              <p className="text-sm text-[#5b6770]">{alert.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 5. Pending Tasks Component
const PendingTasks = () => {
  const tasks = [
    { title: 'Record feed consumption', type: 'Daily Tasks', due: '2025-01-15' },
    { title: 'Disinfect equipment and tools', type: 'Weekly Tasks', due: '2025-01-20' },
    { title: 'Review visitor log and access controls', type: 'Weekly Tasks', due: '2025-01-20' },
    { title: 'Update staff training records', type: 'Monthly Tasks', due: '2025-01-30' },
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-[#08202b] mb-4">Pending Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-start gap-4 p-2 rounded-md hover:bg-[#f6fbf9]">
            <div className="mt-1 text-yellow-500">
              <Circle size={16} fill="currentColor" />
            </div>
            <div>
              <p className="font-semibold text-[#08202b]">{task.title}</p>
            
              <p className="text-sm text-[#5b6770]">{task.type} - Due: {task.due}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// CHATBOT WINDOW COMPONENT
const ChatbotWindow = ({ onClose }) => {
  return (
    // Max z-index (z-[9999]) is used to ensure visibility over all other elements
    <div className="fixed bottom-20 right-4 z-[9999] w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col">
      {/* Header */}
      <div className="bg-[#0f766e] text-white p-3 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">FarmGuard AI Assistant</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200 p-1 rounded-full">
          <X size={20} />
        </button>
      </div>

      {/* Body/Message Area */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {/* DEMO MESSAGE */}
        <div className="flex justify-start">
          <div className="bg-gray-200 p-3 rounded-lg rounded-tl-none max-w-[85%] text-sm">
            Hello! I'm your Biosecurity Assistant. How can I help monitor your farm today?
          </div>
        </div>
        
      </div>

      {/* Footer/Input Area */}
      <div className="p-3 border-t">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
        />
      </div>
    </div>
  );
};

//FLOATING CHAT WIDGET (Button + Floating Message + Portal)
const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);

  // The content to be rendered outside the main DOM tree via Portal
  const WidgetContent = (
    <>
      {/* 1. Chat Window (Rendered Conditionally) */}
      {isOpen && <ChatbotWindow onClose={toggleChat} />}

      {/* 2. The Floating Button and Message Bubble */}
      <div className="fixed bottom-4 right-4 z-[9999]">
        
        {/* Floating Message Bubble (Visible only when chat is closed) */}
        {!isOpen && (
          <div className="absolute right-0 bottom-full mb-3 p-3 bg-white text-gray-800 text-sm rounded-lg shadow-xl max-w-sm transition-all duration-300 transform origin-bottom-right">
            Hi there! How can I help you?
            {/* Simple triangle pointer using CSS borders */}
            <div className="absolute right-3 bottom-[-5px] w-0 h-0 border-t-[5px] border-t-white border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"></div>
          </div>
        )}

        {/* Chat Button (Always visible) */}
        <button
          onClick={toggleChat}
          className="bg-teal-600 text-white rounded-full p-4 shadow-xl hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-offset-2 transition-all"
        >
          <MessageSquare size={32} />
        </button>
      </div>
    </>
  );

  // Use createPortal to render the content directly into the document.body.
  // This is the most reliable way to prevent clipping from parent overflow properties.
  return createPortal(
    WidgetContent,
    document.body
  );
};

// // 360 MAP VIEW COMPONENT
// export const Map360View = () => {
//   // Example coordinates for a generic farm/location (like Punjab)
// //   const latitude = 30.7333; // Chandigarh area
// //   const longitude = 76.7794; 
// //   const apiKey = "AIzaSyDvD809YI7FOrCXtMKyZ33T5Nd4KuuLYho"; 

// // const streetViewUrl = `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${latitude},${longitude}&heading=210&pitch=10&fov=35`;
// //  return (
// //     <div className="flex flex-col h-full">
// //       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
// //         <h1 className="text-2xl font-bold text-[#08202b]">360° Farm View</h1>
// //         <p className="text-[#5b6770]">Explore your farm environment interactively.</p>
// //       </div>

// //       <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
// //         {/* The iframe embeds the 360-degree panoramic view */}
// //         <iframe
// //           width="100%"
// //           height="100%"
// //           style={{ border: 0 }}
// //           loading="lazy"
// //           allowFullScreen
// //           referrerPolicy="no-referrer-when-downgrade"
// //           src={streetViewUrl}
// //           title="360 Degree Farm Map View"
// //         ></iframe>
// //       </div>
      
// //       {/* ⚠️ IMPORTANT: Replace 'YOUR_API_KEY' in the streetViewUrl above with your actual Google Maps API key if you deploy this. */}
// //     </div>
// //   );
//  return (
//     // If this text shows up, the routing is fine, and the problem is the map code/API key.
//     <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
//       <h1>MAP VIEW ROUTE SUCCESSFUL!</h1>
//       <p>The routing works, the problem is with the iframe/Google Maps API.</p>
//     </div>
//   );
// };


// --- Main Dashboard Export ---
export default function Dashboard() {

  return (
    <div className="flex h-screen bg-[#f6fbf9] font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f6fbf9] p-8">
          <div className="container mx-auto max-w-7xl">
            {/* Farm Overview Section */}
            {/* ✅ YOUR COLOR is used here for the main banner background */}
            <div className="bg-[#0f766e] text-white p-6 rounded-lg shadow-md mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Farm Overview</h1>
                    <p className="text-teal-200">Monitor your farm's biosecurity status and compliance</p>
                </div>
                <div className="text-white">
                    <ShieldCheck size={40} />
                </div>
                {/* ✅ CHATBOT ICON ADDED HERE (Optional: Add a click handler for functionality) */}
                {/* <div className="text-white cursor-pointer hover:text-teal-200 transition-colors">
                  <ChatbotIcon size={40} />
                </div> */}
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                icon={<ShieldAlert className="text-[#f87171]" size={28} />}
                title="Risk Score"
                value="82/100"
                label="Critical Risk"
                labelColor="bg-[#f87171]/20 text-[#f87171]"
              />
              <StatCard 
                icon={<ListChecks className="text-[#60a5fa]" size={28} />}
                title="Checklist Progress"
                value="33%"
                label="2/6 completed"
                labelColor="bg-[#60a5fa]/20 text-[#60a5fa]"
              />
              <StatCard 
                icon={<GraduationCap className="text-yellow-500" size={28} />}
                title="Training Progress"
                value="45%"
                label="1/4 completed"
                labelColor="bg-yellow-500/20 text-yellow-500"
              />
              <StatCard 
                icon={<AlertTriangle className="text-[#fb923c]" size={28} />}
                title="Active Alerts"
                value="1"
                label="Critical notifications"
                labelColor="bg-[#fb923c]/20 text-[#fb923c]"
              />
            </div>

            {/* Recent Alerts and Pending Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentAlerts />
              <PendingTasks />
            </div>
          </div>
        </main>
      </div>
         <FloatingChatWidget/>
    </div>
  );
}