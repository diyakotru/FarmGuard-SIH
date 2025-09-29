import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '../components/DashboardLayout.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MessageSquare, PlusCircle, Calendar, Sun, Moon } from 'lucide-react';

// --- Enhanced Task Data with Icons ---
const TASKS = {
  daily: [
    { id: 'daily1', label: 'Feed the animals and check water supply.', icon: <Calendar size={20} /> },
    { id: 'daily2', label: 'Walk around and check for any sick animals.', icon: <Calendar size={20} /> },
    { id: 'daily3', label: 'Clean animal living areas.', icon: <Calendar size={20} /> },
  ],
  weekly: [
    { id: 'weekly1', label: 'Check the pest and rodent traps.', icon: <Calendar size={20} /> },
    { id: 'weekly2', label: 'Clean and disinfect shared tools.', icon: <Calendar size={20} /> },
    { id: 'weekly3', label: 'Look at the list of visitors from the past week.', icon: <Calendar size={20} /> },
  ],
  monthly: [
    { id: 'monthly1', label: 'Check the fences and buildings for any damage.', icon: <Calendar size={20} /> },
    { id: 'monthly2', label: 'Make sure staff training is up-to-date.', icon: <Calendar size={20} /> },
  ],
};

// --- LocalStorage Helper Functions (Updated to handle notes) ---
function getTodayKey(type) {
  const today = new Date();
  if (type === 'daily') return today.toISOString().slice(0, 10);
  if (type === 'weekly') {
    const year = today.getFullYear();
    const week = Math.ceil(((today - new Date(year, 0, 1)) / 86400000 + new Date(year, 0, 1).getDay() + 1) / 7);
    return `${year}-W${week}`;
  }
  if (type === 'monthly') return today.toISOString().slice(0, 7);
  return '';
}

function loadChecklist(type) {
  const key = `checklist-${type}-${getTodayKey(type)}`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : {};
}

function saveChecklist(type, state) {
  const key = `checklist-${type}-${getTodayKey(type)}`;
  localStorage.setItem(key, JSON.stringify(state));
}

// --- Reusable Components for this Page ---
const TaskItem = ({ task, taskState, onToggle, onNoteChange }) => {
  const [note, setNote] = useState(taskState?.note || '');
  const [showNote, setShowNote] = useState(false);
  const isChecked = taskState?.checked || false;

  const handleNoteBlur = () => {
    onNoteChange(task.id, note);
    setShowNote(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg shadow-sm transition-colors ${isChecked ? 'bg-teal-50' : 'bg-white'}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onToggle(task.id, !isChecked)}
            className={`w-6 h-6 rounded-md flex items-center justify-center transition-all border-2 ${
              isChecked ? 'bg-teal-600 border-teal-600' : 'bg-white border-gray-300'
            }`}
          >
            {isChecked && <Check size={16} className="text-white" />}
          </button>
          <div className="flex items-center gap-2">
            <span className={isChecked ? 'text-gray-400' : 'text-teal-800'}>{task.icon}</span>
            <span className={`font-medium ${isChecked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {task.label}
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowNote(!showNote)}
          className="text-gray-400 hover:text-teal-600 p-1 rounded-full"
          title="Add a note"
        >
          <MessageSquare size={18} />
        </button>
      </div>
      {showNote && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 ml-10">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={handleNoteBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleNoteBlur()}
            placeholder="Add an optional note..."
            className="w-full text-sm p-2 border-b-2 border-gray-200 focus:border-teal-500 outline-none"
            autoFocus
          />
        </motion.div>
      )}
      {taskState?.note && !showNote && (
        <p className="text-xs text-gray-500 mt-2 ml-10 pl-2 border-l-2 border-gray-200">{taskState.note}</p>
      )}
    </motion.div>
  );
};

const ProgressTracker = ({ tasks, checklistState }) => {
  const completedCount = useMemo(() => {
    return tasks.filter(task => checklistState[task.id]?.checked).length;
  }, [tasks, checklistState]);

  const totalCount = tasks.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-700">Completion Progress</span>
        <span className="font-bold text-teal-600">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          className="bg-teal-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="text-xs text-gray-500 text-right mt-1">{completedCount} of {totalCount} tasks completed</p>
    </div>
  );
};

// --- Main Digital Checklist Page Component ---
export default function DigitalChecklistPage() {
  const [tab, setTab] = useState('daily');
  const [checklistState, setChecklistState] = useState(() => loadChecklist('daily'));

  useEffect(() => {
    setChecklistState(loadChecklist(tab));
  }, [tab]);

  const handleToggle = (taskId, isChecked) => {
    const newState = {
      ...checklistState,
      [taskId]: { ...checklistState[taskId], checked: isChecked },
    };
    setChecklistState(newState);
    saveChecklist(tab, newState);
  };

  const handleNoteChange = (taskId, note) => {
    const newState = {
      ...checklistState,
      [taskId]: { ...checklistState[taskId], note: note },
    };
    setChecklistState(newState);
    saveChecklist(tab, newState);
  };

  const tabs = ['daily', 'weekly', 'monthly'];

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Digital Checklist</h1>
            <p className="text-gray-500">Your daily, weekly, and monthly biosecurity action plan.</p>
          </div>
          <button className="flex items-center gap-2 bg-teal-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-teal-700 transition-colors shadow-sm">
            <PlusCircle size={20} />
            Log an Event
          </button>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 font-semibold capitalize transition-all ${
                tab === t
                  ? 'border-b-2 border-teal-600 text-teal-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {t} Tasks
            </button>
          ))}
        </div>

        <ProgressTracker tasks={TASKS[tab]} checklistState={checklistState} />

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {TASKS[tab].map(task => (
              <TaskItem
                key={task.id}
                task={task}
                taskState={checklistState[task.id]}
                onToggle={handleToggle}
                onNoteChange={handleNoteChange}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
