import React, { useState } from 'react';
import { Building2, Database, Users, Banknote, ShieldCheck, Lock } from 'lucide-react';

const Tab5DataMarts: React.FC = () => {
  const [activeMart, setActiveMart] = useState<'marketing' | 'finance' | null>(null);

  return (
    <div className="space-y-6 animate-fadeIn">
       <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
         <h3 className="text-xl font-bold text-slate-100 mb-2">Data Marts & Security</h3>
         <p className="text-slate-400 text-sm mb-6">
           Data Marts are subject-oriented slices of the warehouse. They ensure <strong>Performance Isolation</strong> (Marketing queries don't slow down Finance) and <strong>Security</strong> (Marketing can't see payroll).
         </p>

         <div className="flex justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveMart(activeMart === 'marketing' ? null : 'marketing')}
              className={`px-4 py-2 rounded-full border transition-all flex items-center gap-2 ${activeMart === 'marketing' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-900 border-slate-600 text-slate-400 hover:border-purple-500'}`}
            >
              <Users className="w-4 h-4" /> Marketing Team
            </button>
            <button 
              onClick={() => setActiveMart(activeMart === 'finance' ? null : 'finance')}
              className={`px-4 py-2 rounded-full border transition-all flex items-center gap-2 ${activeMart === 'finance' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-900 border-slate-600 text-slate-400 hover:border-emerald-500'}`}
            >
              <Banknote className="w-4 h-4" /> Finance Team
            </button>
         </div>

         {/* Diagram */}
         <div className="relative h-[400px] bg-slate-900/50 rounded-xl border border-slate-700 p-4 overflow-hidden">
            
            {/* Central Warehouse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-900/20 border-4 border-blue-500 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
               <Database className="w-16 h-16 text-blue-400 mb-2" />
               <h4 className="font-bold text-blue-100">Enterprise DW</h4>
               <span className="text-xs text-blue-300">All Data (PB Scale)</span>
            </div>

            {/* Pipes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Marketing Pipe */}
                <path 
                    d="M 50% 50% L 20% 70%" 
                    className={`transition-all duration-500 ${activeMart === 'marketing' ? 'stroke-purple-500 stroke-[4px] opacity-100' : 'stroke-slate-700 stroke-2 opacity-30'}`}
                    fill="none" 
                />
                {/* Finance Pipe */}
                <path 
                    d="M 50% 50% L 80% 70%" 
                    className={`transition-all duration-500 ${activeMart === 'finance' ? 'stroke-emerald-500 stroke-[4px] opacity-100' : 'stroke-slate-700 stroke-2 opacity-30'}`}
                    fill="none" 
                />
            </svg>

            {/* Flowing Particles */}
            {activeMart === 'marketing' && (
                 <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-purple-400 rounded-full animate-ping z-20" style={{ animationDuration: '1s' }}></div>
            )}
             {activeMart === 'finance' && (
                 <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-emerald-400 rounded-full animate-ping z-20" style={{ animationDuration: '1s' }}></div>
            )}


            {/* Marketing Mart */}
            <div className={`absolute bottom-10 left-[10%] w-40 p-4 rounded-xl border-2 transition-all duration-500 z-10 ${activeMart === 'marketing' ? 'bg-purple-900/20 border-purple-500 opacity-100 scale-105' : 'bg-slate-900 border-slate-700 opacity-50'}`}>
                <div className="flex items-center gap-2 mb-2 text-purple-300 font-bold">
                    <Users className="w-5 h-5" /> Marketing Mart
                </div>
                <ul className="text-xs space-y-1 text-purple-200/70">
                    <li className="flex items-center gap-1"><CheckCircleIcon /> Customer Emails</li>
                    <li className="flex items-center gap-1"><CheckCircleIcon /> Ad Clicks</li>
                    <li className="flex items-center gap-1 text-red-400/50"><LockIcon /> Salary Data (Hidden)</li>
                </ul>
            </div>

             {/* Finance Mart */}
             <div className={`absolute bottom-10 right-[10%] w-40 p-4 rounded-xl border-2 transition-all duration-500 z-10 ${activeMart === 'finance' ? 'bg-emerald-900/20 border-emerald-500 opacity-100 scale-105' : 'bg-slate-900 border-slate-700 opacity-50'}`}>
                <div className="flex items-center gap-2 mb-2 text-emerald-300 font-bold">
                    <Banknote className="w-5 h-5" /> Finance Mart
                </div>
                <ul className="text-xs space-y-1 text-emerald-200/70">
                    <li className="flex items-center gap-1"><CheckCircleIcon /> Revenue</li>
                    <li className="flex items-center gap-1"><CheckCircleIcon /> Tax Records</li>
                    <li className="flex items-center gap-1"><CheckCircleIcon /> Payroll</li>
                </ul>
            </div>

         </div>
       </div>
    </div>
  );
};

const CheckCircleIcon = () => <ShieldCheck className="w-3 h-3" />;
const LockIcon = () => <Lock className="w-3 h-3" />;

export default Tab5DataMarts;