import React from 'react'
import Hero from '../sections/home/Hero';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AlertBox from '../components/AlertBox';

export default function Dashboard() {
    const today = new Date().toLocaleDateString();
    const alertText = "Upcoming biosecurity check in 3 days.";

    return (
        <div>
            <Navbar />
            <AlertBox date={today} alertMessage={alertText} />
            <Sidebar />
            <Hero />
        </div>
    );
}
