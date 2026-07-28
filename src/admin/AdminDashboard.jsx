import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ManageProjects from './ManageProjects';
import ManageSkills from './ManageSkills';
import ManageEducation from './ManageEducation';
import ManageExperience from './ManageExperience';
import ManageAchievements from './ManageAchievements';
import ViewMessages from './ViewMessages';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const { logoutAdmin } = useAuth();

  const tabs = [
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Internship' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'messages', label: 'Messages' },
  ];

  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-herobg px-4 sm:px-6 py-4 flex justify-between items-center">
        <h1 className="font-display text-lg sm:text-xl font-semibold text-herotext">Admin Dashboard</h1>
        <button
          onClick={logoutAdmin}
          className="text-sm font-medium text-herotext/70 hover:text-gold transition-colors px-3 py-2"
        >
          Logout
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 border-b border-line overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'border-gold text-ink'
                  : 'border-transparent text-body/60 hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={activeTab === 'projects' ? 'block' : 'hidden'}>
          <ManageProjects />
        </div>
        <div className={activeTab === 'skills' ? 'block' : 'hidden'}>
          <ManageSkills />
        </div>
        <div className={activeTab === 'experience' ? 'block' : 'hidden'}>
          <ManageExperience />
        </div>
        <div className={activeTab === 'education' ? 'block' : 'hidden'}>
          <ManageEducation />
        </div>
        <div className={activeTab === 'achievements' ? 'block' : 'hidden'}>
          <ManageAchievements />
        </div>
        <div className={activeTab === 'messages' ? 'block' : 'hidden'}>
          <ViewMessages />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;