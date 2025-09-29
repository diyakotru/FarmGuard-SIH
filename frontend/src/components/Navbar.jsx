import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'te', label: 'తెలుగు' }
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="FarmGuard Logo" className="h-10 w-10 object-contain rounded-full" />
            <Link to="/" className="text-2xl font-bold">
              FarmGuard
            </Link>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-200">
              About
            </Link>
            <Link to="/community" className="hover:text-gray-200 font-semibold">
              {t('community')}
            </Link>
            <Link to="/LoginPage" className="hover:text-gray-200 font-semibold">
              Login
            </Link>
            {/* Language Switcher Button */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center px-3 py-2 bg-[#0e766d] hover:bg-[#0b5e53] text-white rounded-full shadow-sm border border-gray-200 font-medium focus:outline-none"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                style={{ minWidth: '110px' }}
              >
                <span className="mr-2">{languages.find(l => l.code === i18n.language)?.label || 'Language'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <ul className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 text-black">
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
        </div>
      </div>
    </nav>
  );
}
