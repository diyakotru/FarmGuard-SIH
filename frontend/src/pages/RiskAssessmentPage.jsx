import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout.jsx';
// Icons from lucide-react
import { Shield, ChevronDown, AlertTriangle, TrendingUp, Check, X } from 'lucide-react';
// Charting library
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Helper Data (This would come from your backend in a real app) ---

const assessmentQuestions = [
  {
    category: 'Visitor & Vehicle Control',
    questions: [
      { id: 'q1', text: 'Is there a single, lockable entrance for the farm?', weight: 10 },
      { id: 'q2', text: 'Is a visitor log maintained for all non-farm personnel?', weight: 10 },
      { id: 'q3', text: 'Are visitors required to wear clean, provided footwear?', weight: 15 },
      { id: 'q4', text: 'Are vehicles cleaned and disinfected before entering animal areas?', weight: 15 },
    ]
  },
  {
    category: 'Feed & Water Security',
    questions: [
      { id: 'q5', text: 'Is feed stored in a secure, dry place away from pests?', weight: 10 },
      { id: 'q6', text: 'Are water sources regularly cleaned and tested?', weight: 10 },
    ]
  },
  {
    category: 'Waste & Pest Management',
    questions: [
      { id: 'q7', text: 'Is there a written plan for manure management?', weight: 10 },
      { id: 'q8', text: 'Are deceased animals disposed of safely and away from the flock?', weight: 10 },
      { id: 'q9', text: 'Is there an active and monitored pest control program?', weight: 10 },
    ]
  }
];

const allRecommendations = {
  q1: { text: 'Establish a single, controlled entry point to better monitor traffic.', icon: <Shield size={20} /> },
  q2: { text: 'Implement a mandatory sign-in log for all visitors.', icon: <Shield size={20} /> },
  q3: { text: 'Provide disposable boot covers or a disinfection station for all visitors.', icon: <Shield size={20} /> },
  q4: { text: 'Set up a designated area for vehicle cleaning before they enter the farm.', icon: <Shield size={20} /> },
  q5: { text: 'Ensure feed storage is sealed to prevent contamination from rodents and wild birds.', icon: <Shield size={20} /> },
  q6: { text: 'Schedule regular cleaning of water troughs and test water quality.', icon: <Shield size={20} /> },
  q7: { text: 'Develop and document a clear manure disposal plan to prevent disease spread.', icon: <Shield size={20} /> },
  q8: { text: 'Create a dedicated, secure area for mortality disposal, away from live animals.', icon: <Shield size={20} /> },
  q9: { text: 'Deploy and regularly check bait stations or traps for rodents and pests.', icon: <Shield size={20} /> },
};

const riskHistoryData = [
  { name: 'Jan', score: 40 },
  { name: 'Feb', score: 55 },
  { name: 'Mar', score: 50 },
  { name: 'Apr', score: 75 },
];

// --- Reusable Components for this page ---

const AccordionSection = ({ section, answers, handleAnswerChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-4">
      <button
        className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {section.category}
        <ChevronDown size={20} className={`transition-transform ${isOpen? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-100">
          {section.questions.map((q) => (
            <div key={q.id} className="flex items-center justify-between py-3">
              <p className="text-gray-600">{q.text}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAnswerChange(q.id, true)}
                  className={`p-2 rounded-full transition-colors ${answers[q.id] === true? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => handleAnswerChange(q.id, false)}
                  className={`p-2 rounded-full transition-colors ${answers[q.id] === false? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ScoreGauge = ({ score }) => {
  const percentage = score;
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  const offset = circumference - (percentage / 100) * circumference;

  const getRiskColor = () => {
    if (score === 0) return 'text-gray-400';
    if (score < 40) return 'text-red-500';
    if (score < 75) return 'text-yellow-500';
    return 'text-teal-600';
  };

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        {/* Progress circle */}
        <circle
          className={getRiskColor()}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span className={`absolute text-4xl font-bold ${getRiskColor()}`}>{score}</span>
    </div>
  );
};

// --- Main Risk Assessment Page Component ---

export default function RiskAssessmentPage() {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({...prev, [questionId]: answer }));
  };

  const { score, riskLevel, recommendations } = useMemo(() => {
    let currentScore = 0;
    const totalWeight = assessmentQuestions.flatMap(s => s.questions).reduce((sum, q) => sum + q.weight, 0);
    let answeredRecommendations = [];

    const answeredCount = Object.keys(answers).length;
    assessmentQuestions.flatMap(s => s.questions).forEach(q => {
      if (answers[q.id] === true) {
        currentScore += q.weight;
      } else if (answers[q.id] === false) {
        answeredRecommendations.push(allRecommendations[q.id]);
      }
    });

    const finalScore = Math.round((currentScore / totalWeight) * 100) || 0;

    let level = 'Low Risk';
    if (answeredCount === 0) level = 'Not Assessed';
    else if (finalScore < 40) level = 'High Risk';
    else if (finalScore < 75) level = 'Medium Risk';

    return { score: finalScore, riskLevel: level, recommendations: answeredRecommendations };
  }, [answers]);

  const getRiskLevelClasses = () => {
    if (riskLevel === 'High Risk') return 'bg-red-100 text-red-700';
    if (riskLevel === 'Medium Risk') return 'bg-yellow-100 text-yellow-700';
    return 'bg-teal-100 text-teal-700';
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Risk Assessment</h1>
            <p className="text-gray-500">Evaluate your farm's biosecurity level and get an action plan.</p>
          </div>
          <button className="bg-teal-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-teal-700 transition-colors">
            Save Assessment
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Questionnaire */}
          <div className="lg:col-span-2">
            {assessmentQuestions.map(section => (
              <AccordionSection
                key={section.category}
                section={section}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
              />
            ))}
          </div>

          {/* Right Side: Results & Recommendations */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-gray-700 mb-4">Your Biosecurity Score</h3>
              <ScoreGauge score={score} />
              <div className={`mt-4 px-3 py-1 rounded-full inline-block font-semibold text-sm ${getRiskLevelClasses()}`}>
                {riskLevel}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-yellow-500" />
                Your Action Plan
              </h3>
              {recommendations.length > 0? (
                <ul className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <span className="text-teal-600 mt-1">{rec.icon}</span>
                      <span>{rec.text}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-center py-4">Answer "No" to questions to see personalized recommendations here.</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-500" />
                Risk Trend
              </h3>
              <div style={{ height: '150px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={riskHistoryData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#0f766e" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}