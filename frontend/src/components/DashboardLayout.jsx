import React from 'react';
import { DashboardHeader, Sidebar } from '../pages/Dashboard.jsx';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#f6fbf9] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f6fbf9] p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
