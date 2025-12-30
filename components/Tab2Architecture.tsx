import React, { useState, useEffect } from 'react';
import { Database, FileSpreadsheet, Server, ArrowRight, LayoutDashboard, Filter } from 'lucide-react';

const Tab2Architecture: React.FC = () => {
  const [animating, setAnimating] = useState(false);
  const [stage, setStage] = useState(0);

  const startAnimation = () => {
    if (animating) return;
    setAnimating(true);
    setStage(0);
  };

  useEffect(() => {
    if (!animating) return;

    const timings = [0, 1000, 2000, 3000, 4000]; // milliseconds for each stage

    const timers = timings.map((t, index) => {
      return setTimeout(() => {
        setStage(index + 1);
        if (index === timings.length - 1) {
          setTimeout(() => setAnimating(false), 1500);
        }
      }, t);
    });

    return () => timers.forEach(clearTimeout);
  }, [animating]);

  const steps = [
    { id: 1, label: 'Sources', icon: FileSpreadsheet, desc: "CRM, ERP, Logs" },
    { id: 2, label: 'ETL', icon: Filter, desc: "Clean & Transform" },
    { id: 3, label: 'Warehouse', icon: Database, desc: "Central Repository" },
    { id: 4, label: 'Data Marts', icon: Server, desc: "Department Slices" },
    { id: 5, label: 'BI Tools', icon: LayoutDashboard, desc: "Analysis" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">The Data Journey</h2>
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Data isn't just stored; it flows. It must be extracted from messy sources, cleaned (ETL), 
          centralized in the Warehouse, sliced for specific teams (Marts), and finally visualized (BI).
        </p>
        
        <button
          onClick={startAnimation}
          disabled={animating}
          className={`px-6 py-3 rounded-full font-bold shadow-lg transition-all ${animating ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-500/25'}`}
        >
          {animating ? 'Tracking Data Packet...' : 'Trace Sales Data'}
        </button>
      </div>

      <div className="relative p-8 bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden min-h-[300px] flex items-center justify-between gap-2">
        
        {/* Connection Line Background */}
        <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-700 -translate-y-1/2 z-0"></div>

        {/* Moving Packet */}
        {animating && (
          <div 
            className="absolute top-1/2 w-8 h-8 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20 transition-all duration-1000 ease-linear flex items-center justify-center -translate-y-1/2"
            style={{ 
              left: `${((stage - 1) / (steps.length - 1)) * 100}%`,
              opacity: stage > 0 && stage <= steps.length ? 1 : 0
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </div>
        )}

        {/* Steps */}
        {steps.map((step, index) => {
          const isActive = stage === step.id;
          const isPast = stage > step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                isActive || isPast 
                  ? 'bg-slate-800 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                  : 'bg-slate-900 border-slate-700 text-slate-600'
              }`}>
                <Icon className={`w-8 h-8 ${isActive ? 'animate-bounce' : ''}`} />
              </div>
              
              <div className={`mt-4 text-center transition-opacity duration-500 ${isActive || isPast ? 'opacity-100' : 'opacity-50'}`}>
                <h4 className="font-bold text-sm text-slate-200">{step.label}</h4>
                <span className="text-xs text-slate-500 block">{step.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
        <div className={`p-4 rounded border ${stage === 1 ? 'border-cyan-500 bg-cyan-900/10' : 'border-slate-800 bg-slate-900'}`}>
          <strong className="block text-slate-200 mb-1">1. Extraction</strong>
          Raw sales data is pulled from the ERP system. It's messy and unorganized.
        </div>
        <div className={`p-4 rounded border ${stage === 2 || stage === 3 ? 'border-cyan-500 bg-cyan-900/10' : 'border-slate-800 bg-slate-900'}`}>
          <strong className="block text-slate-200 mb-1">2. Transformation & Storage</strong>
          Dates are standardized. Invalid rows removed. Data loads into the main Warehouse.
        </div>
        <div className={`p-4 rounded border ${stage === 4 || stage === 5 ? 'border-cyan-500 bg-cyan-900/10' : 'border-slate-800 bg-slate-900'}`}>
          <strong className="block text-slate-200 mb-1">3. Presentation</strong>
          Data is copied to the "Sales Mart" for speed, then rendered on the CEO's dashboard.
        </div>
      </div>
    </div>
  );
};

export default Tab2Architecture;