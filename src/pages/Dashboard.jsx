import React from 'react'
import Hero from '../sections/home/Hero';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <Hero />
        </div>
    );
}
