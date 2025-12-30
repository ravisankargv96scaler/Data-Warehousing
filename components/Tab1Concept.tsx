import React, { useState, useEffect } from 'react';
import { ShoppingCart, BarChart3, Database, Zap, Turtle, Rocket } from 'lucide-react';
import { ScenarioType } from '../types';

const Tab1Concept: React.FC = () => {
  const [scenario, setScenario] = useState<ScenarioType>(null);
  const [oltpProgress, setOltpProgress] = useState(0);
  const [olapProgress, setOlapProgress] = useState(0);
  const [message, setMessage] = useState("Select a scenario to start the race.");

  const runRace = (type: ScenarioType) => {
    setScenario(type);
    setOltpProgress(0);
    setOlapProgress(0);

    if (type === 'transaction') {
      setMessage("Scenario: Processing a single new order (Write Heavy).");
      // OLTP wins
      setTimeout(() => setOltpProgress(100), 100);
      setTimeout(() => setOlapProgress(40), 100); 
    } else if (type === 'analytics') {
      setMessage("Scenario: Calculating 5-year revenue trends (Read Heavy).");
      // OLAP wins
      setTimeout(() => setOltpProgress(20), 100); 
      setTimeout(() => setOlapProgress(100), 100); 
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Concept Cards */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex items-center gap-3 mb-4 text-emerald-400">
            <ShoppingCart className="w-6 h-6" />
            <h3 className="text-xl font-bold">OLTP: The Cash Register</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            <strong>Operational Database.</strong> Designed for day-to-day operations. 
            Fast at processing small, frequent changes (INSERT, UPDATE).
          </p>
          <ul className="text-slate-400 text-sm list-disc list-inside space-y-1">
            <li>Optimized for: <b>Writes</b></li>
            <li>Users: Clerks, Customers</li>
            <li>Example: MySQL, PostgreSQL</li>
          </ul>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <div className="flex items-center gap-3 mb-4 text-blue-400">
            <BarChart3 className="w-6 h-6" />
            <h3 className="text-xl font-bold">OLAP: The Boardroom</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            <strong>Data Warehouse.</strong> Designed for analysis and reporting. 
            Fast at reading millions of rows to find patterns.
          </p>
          <ul className="text-slate-400 text-sm list-disc list-inside space-y-1">
            <li>Optimized for: <b>Reads</b></li>
            <li>Users: Analysts, CEOs</li>
            <li>Example: Snowflake, BigQuery</li>
          </ul>
        </div>
      </div>

      {/* The Race */}
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Query Performance Race
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button 
            onClick={() => runRace('transaction')}
            className={`flex-1 p-4 rounded-lg border transition-all ${scenario === 'transaction' ? 'bg-emerald-900/30 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-600 hover:border-emerald-500/50'}`}
          >
            <div className="font-bold mb-1">Scenario A: New Order</div>
            <div className="text-xs opacity-70">Single Record Write</div>
          </button>
          <button 
            onClick={() => runRace('analytics')}
            className={`flex-1 p-4 rounded-lg border transition-all ${scenario === 'analytics' ? 'bg-blue-900/30 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-600 hover:border-blue-500/50'}`}
          >
            <div className="font-bold mb-1">Scenario B: Analyze Trends</div>
            <div className="text-xs opacity-70">Aggregating 5M Rows</div>
          </button>
        </div>

        <div className="space-y-6">
          {/* OLTP Runner */}
          <div className="relative">
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
              <span>Runner: MySQL (OLTP)</span>
              <span>{scenario === 'transaction' ? 'SPRINTING!' : scenario === 'analytics' ? 'EXHAUSTED...' : 'READY'}</span>
            </div>
            <div className="h-12 bg-slate-800 rounded-full overflow-hidden relative border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{ width: `${Math.max(5, oltpProgress)}%` }}
              >
                {scenario === 'analytics' && oltpProgress > 10 && <Turtle className="text-emerald-900 w-6 h-6 animate-pulse" />}
                {scenario === 'transaction' && <Zap className="text-emerald-900 w-6 h-6" />}
              </div>
            </div>
          </div>

          {/* OLAP Runner */}
          <div className="relative">
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
              <span>Runner: Snowflake (OLAP)</span>
              <span>{scenario === 'analytics' ? 'JETPACK ENGAGED!' : scenario === 'transaction' ? 'SLOW START...' : 'READY'}</span>
            </div>
            <div className="h-12 bg-slate-800 rounded-full overflow-hidden relative border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{ width: `${Math.max(5, olapProgress)}%` }}
              >
                 {scenario === 'analytics' && <Rocket className="text-blue-900 w-6 h-6" />}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-400 italic bg-slate-950 p-2 rounded">
          {message}
        </div>
      </div>
    </div>
  );
};

export default Tab1Concept;