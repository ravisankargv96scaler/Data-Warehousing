import React, { useState } from 'react';
import { Columns, List, Search, Play, Timer } from 'lucide-react';

const Tab4Storage: React.FC = () => {
  const [activeQuery, setActiveQuery] = useState(false);
  const [scannedRows, setScannedRows] = useState<number[]>([]);
  const [resultTime, setResultTime] = useState<string | null>(null);

  // Generate mock data: 20 rows, 18 USA, 2 UK
  const mockData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    country: i < 18 ? 'USA' : 'UK'
  }));

  const runQuery = () => {
    setActiveQuery(true);
    setScannedRows([]);
    setResultTime(null);

    // Animate Row Scanning
    let current = 0;
    const interval = setInterval(() => {
      setScannedRows(prev => [...prev, current]);
      current++;
      if (current >= mockData.length) {
        clearInterval(interval);
        setResultTime("Row Store: 2.5s (Scanned all rows)");
        setActiveQuery(false);
      }
    }, 100);
  };

  const runColumnarQuery = () => {
    // Instant
    setActiveQuery(true);
    setTimeout(() => {
        setResultTime("Column Store: 0.01s (Read metadata only)");
        setActiveQuery(false);
    }, 400);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-bold text-slate-100 mb-2">Row vs. Columnar Storage</h3>
        <p className="text-slate-400 text-sm mb-6">
          Warehouses use <strong>Columnar Storage</strong>. Because similar data is stored together, it compresses massively (e.g., "USA" written once instead of a million times). 
          Queries like <code>COUNT</code> skip the raw data entirely.
        </p>

        <div className="bg-black/40 p-3 rounded border border-slate-600 font-mono text-green-400 text-sm mb-6 flex items-center justify-between">
          <span>QUERY: SELECT COUNT(*) FROM Sales WHERE Country = 'USA'</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Row Store Visualization */}
          <div className="border border-slate-600 rounded-lg overflow-hidden bg-slate-900">
            <div className="bg-slate-700 p-3 flex justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-slate-200">
                <List className="w-4 h-4" /> Row Store (MySQL)
              </div>
              <button 
                onClick={runQuery}
                disabled={activeQuery}
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 text-xs rounded flex items-center gap-1 disabled:opacity-50"
              >
                <Play className="w-3 h-3" /> Run
              </button>
            </div>
            <div className="h-64 overflow-y-auto p-4 space-y-2 custom-scrollbar relative">
              {mockData.map((row, idx) => (
                <div 
                  key={row.id} 
                  className={`flex justify-between p-2 rounded text-xs font-mono transition-colors duration-200 ${
                    scannedRows.includes(idx) ? 'bg-red-900/50 border border-red-500 text-white' : 'bg-slate-800 border border-slate-700 text-slate-400'
                  }`}
                >
                  <span>ID: {row.id}</span>
                  <span>Country: {row.country}</span>
                  <span>...Data...</span>
                </div>
              ))}
              {activeQuery && scannedRows.length < 20 && (
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <span className="bg-slate-900 px-3 py-1 rounded text-red-400 text-xs animate-pulse">Scanning row by row...</span>
                </div>
              )}
            </div>
          </div>

          {/* Column Store Visualization */}
          <div className="border border-slate-600 rounded-lg overflow-hidden bg-slate-900">
            <div className="bg-slate-700 p-3 flex justify-between items-center">
               <div className="flex items-center gap-2 font-bold text-slate-200">
                <Columns className="w-4 h-4" /> Column Store (Snowflake)
              </div>
              <button 
                onClick={runColumnarQuery}
                disabled={activeQuery}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 text-xs rounded flex items-center gap-1 disabled:opacity-50"
              >
                <Play className="w-3 h-3" /> Run
              </button>
            </div>
            <div className="h-64 p-4 flex flex-col items-center justify-center relative">
                
                {/* Simulated Disk Block */}
                <div className={`w-full bg-slate-800 border-2 rounded-lg p-4 mb-4 transition-all duration-300 ${resultTime && resultTime.includes('Column') ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-slate-600'}`}>
                    <h4 className="text-xs text-slate-500 uppercase font-bold mb-2">Column Block: Country</h4>
                    <div className="flex gap-2">
                        <div className="bg-blue-900/50 text-blue-200 p-2 rounded text-xs border border-blue-700 flex-1 text-center">
                            Value: <br/><strong className="text-lg">USA</strong>
                        </div>
                        <div className="bg-emerald-900/50 text-emerald-200 p-2 rounded text-xs border border-emerald-700 flex-1 text-center">
                            Count: <br/><strong className="text-lg">18</strong>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-slate-800 border-2 border-slate-600 rounded-lg p-4 opacity-50 grayscale">
                     <h4 className="text-xs text-slate-500 uppercase font-bold mb-2">Column Block: Country</h4>
                     <div className="flex gap-2">
                        <div className="bg-slate-900 text-slate-500 p-2 rounded text-xs border border-slate-700 flex-1 text-center">
                             Value: UK
                        </div>
                        <div className="bg-slate-900 text-slate-500 p-2 rounded text-xs border border-slate-700 flex-1 text-center">
                             Count: 2
                        </div>
                     </div>
                </div>

            </div>
          </div>

        </div>

        {/* Result Area */}
        <div className="mt-6 h-12 flex items-center justify-center">
            {resultTime && (
                <div className="flex items-center gap-2 text-xl font-bold animate-bounce text-yellow-400">
                    <Timer className="w-6 h-6" />
                    {resultTime}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Tab4Storage;