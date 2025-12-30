import React, { useState } from 'react';
import { Database, Network, Box, LayoutPanelLeft, Users, GraduationCap, Github } from 'lucide-react';
import Tab1Concept from './components/Tab1Concept';
import Tab2Architecture from './components/Tab2Architecture';
import Tab3Schema from './components/Tab3Schema';
import Tab4Storage from './components/Tab4Storage';
import Tab5DataMarts from './components/Tab5DataMarts';
import Tab6Quiz from './components/Tab6Quiz';
import { TabItem } from './types';

const TABS: TabItem[] = [
  { id: 'concept', label: 'OLTP vs OLAP', shortLabel: 'Concept', icon: Database },
  { id: 'architecture', label: 'Architecture', shortLabel: 'Flow', icon: Network },
  { id: 'schema', label: 'Star Schema', shortLabel: 'Schema', icon: Box },
  { id: 'storage', label: 'Columnar Storage', shortLabel: 'Storage', icon: LayoutPanelLeft },
  { id: 'marts', label: 'Data Marts', shortLabel: 'Marts', icon: Users },
  { id: 'quiz', label: 'Quiz', shortLabel: 'Quiz', icon: GraduationCap },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('concept');

  const renderContent = () => {
    switch (activeTab) {
      case 'concept': return <Tab1Concept />;
      case 'architecture': return <Tab2Architecture />;
      case 'schema': return <Tab3Schema />;
      case 'storage': return <Tab4Storage />;
      case 'marts': return <Tab5DataMarts />;
      case 'quiz': return <Tab6Quiz />;
      default: return <Tab1Concept />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500 selection:text-white flex flex-col">
      
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
                <Database className="text-white w-6 h-6" />
             </div>
             <div>
               <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">DataWarehouse Explorer</h1>
               <p className="text-xs text-slate-500">Interactive Architecture Learning</p>
             </div>
          </div>
          <div className="text-xs text-slate-600 hidden sm:block">
            v1.0.0 • Educational Demo
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        
        {/* Navigation Sidebar / Topbar */}
        <nav className="w-full md:w-64 flex-shrink-0 flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 custom-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all whitespace-nowrap md:whitespace-normal ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-200' : 'text-slate-500'}`} />
                <span className="font-medium text-sm">{tab.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full hidden md:block"></div>}
              </button>
            );
          })}
        </nav>

        {/* Dynamic Content Panel */}
        <div className="flex-1 min-w-0">
          <div className="bg-slate-900/50 border border-slate-800 p-1 rounded-2xl">
              <div className="bg-slate-900 rounded-xl p-6 md:p-8 min-h-[500px] shadow-2xl">
                {renderContent()}
              </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 p-6 text-center text-slate-600 text-sm mt-auto">
        <p>© 2024 Data Engineering Concepts. Built with React & Tailwind.</p>
      </footer>
      
    </div>
  );
};

export default App;