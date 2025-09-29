import { AuthProvider } from './AuthContext';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './i18n.js';
import LoginPage from './pages/LoginPage.jsx';
import SignUp from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx';
import RiskAssessmentPage from './pages/RiskAssessmentPage.jsx';
import DigitalChecklistPage from './pages/DigitalChecklistPage.jsx';
import TrainingModulesPage from './pages/TrainingModulesPage.jsx';
import AlertsPage from './pages/AlertsPage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import MyFarm360Page from './pages/MyFarm360Page.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/risk-assessment" element={<RiskAssessmentPage />} />
          <Route path="/digital-checklist" element={<DigitalChecklistPage />} />
          <Route path="/training-modules" element={<TrainingModulesPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/myfarm-360" element={<MyFarm360Page />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);