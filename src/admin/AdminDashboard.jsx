import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ManageProjects from './ManageProjects';
import ManageSkills from './ManageSkills';
import ViewMessages from './ViewMessages';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const { logoutAdmin } = useAuth();

  const tabs = [
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'messages', label: 'Messages' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={logoutAdmin}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Logout
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'projects' && <ManageProjects />}
        {activeTab === 'skills' && <ManageSkills />}
        {activeTab === 'messages' && <ViewMessages />}
      </div>
    </div>
  );
};

export default AdminDashboard;