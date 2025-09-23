import React from 'react';
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
    Circle
} from 'lucide-react';

// --- All Components are now in this single file ---

// 1. Sidebar Component
const Sidebar = () => {
  const navLinks = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', active: true },
    { icon: <ShieldCheck size={20} />, text: 'Risk Assessment' },
    { icon: <ListTodo size={20} />, text: 'Digital Checklist' },
    { icon: <GraduationCap size={20} />, text: 'Training Modules' },
    { icon: <Bell size={20} />, text: 'Alerts' },
  ];

  return (
    <div className="w-64 bg-white text-[#08202b] flex-col shadow-lg hidden lg:flex">
      {/* ✅ YOUR COLOR is used here for the main title */}
      <div className="p-6 text-2xl font-bold text-[#0f766e] border-b border-gray-200">
        FarmGuard
      </div>
      <nav className="flex-1 px-4 py-6">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center gap-4 px-4 py-3 mb-2 rounded-lg transition-colors
              ${link.active 
                // ✅ YOUR COLOR is used here for the active navigation link
                ? 'bg-[#0f766e] text-white font-semibold shadow-sm' 
                : 'text-[#5b6770] hover:bg-[#f6fbf9] hover:text-[#08202b]'
              }`}
          >
            {link.icon}
            <span>{link.text}</span>
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <a href="#" className="flex items-center gap-4 px-4 py-3 text-[#5b6770] hover:bg-[#f6fbf9] hover:text-[#08202b] rounded-lg">
          <LogOut size={20} />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

// 2. Dashboard Header Component
const DashboardHeader = () => {
  return (
    <header className="bg-white p-6 border-b border-gray-200 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-[#08202b]">Welcome back, Ram Singh</h1>
        <p className="text-[#5b6770]">Singh Poultry Farm - Punjab, India</p>
      </div>
      <div className="flex items-center gap-6">
        {/* ✅ YOUR COLOR is used here for the hover effect */}
        <button className="text-[#5b6770] hover:text-[#0f766e] relative">
          <Bell size={24} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#f87171] rounded-full"></span>
        </button>
        {/* ✅ YOUR COLOR is used here for the hover effect */}
        <button className="flex items-center gap-2 text-[#5b6770] hover:text-[#0f766e]">
          <Globe size={20} />
          <span>English</span>
        </button>
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
    </div>
  );
}