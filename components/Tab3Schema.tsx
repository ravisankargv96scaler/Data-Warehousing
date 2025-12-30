import React, { useState } from 'react';
import { SchemaField } from '../types';
import { Database, LayoutGrid, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';

const INITIAL_FIELDS: SchemaField[] = [
  { id: 'f1', name: 'Sale_Amount', type: 'fact' },
  { id: 'f2', name: 'Customer_Name', type: 'dimension' },
  { id: 'f3', name: 'Product_ID (FK)', type: 'fact' },
  { id: 'f4', name: 'Store_Location', type: 'dimension' },
  { id: 'f5', name: 'Date', type: 'dimension' },
  { id: 'f6', name: 'Quantity_Sold', type: 'fact' },
];

const Tab3Schema: React.FC = () => {
  const [availableFields, setAvailableFields] = useState<SchemaField[]>(INITIAL_FIELDS);
  const [factFields, setFactFields] = useState<SchemaField[]>([]);
  const [dimFields, setDimFields] = useState<SchemaField[]>([]);
  const [feedback, setFeedback] = useState<{ msg: string, type: 'success' | 'error' | 'neutral' }>({ msg: "Drag or click fields to assign them.", type: 'neutral' });

  const handleMove = (field: SchemaField, target: 'fact' | 'dimension') => {
    // Logic check
    if (field.type !== target) {
      if (target === 'fact' && field.type === 'dimension') {
        setFeedback({ msg: `Inefficient! Keep text like "${field.name}" in Dimensions to save space.`, type: 'error' });
      } else {
        setFeedback({ msg: `Metrics like "${field.name}" belong in the Fact table.`, type: 'error' });
      }
      return; 
    }

    // Success move
    setFeedback({ msg: "Correct placement!", type: 'success' });
    setAvailableFields(prev => prev.filter(f => f.id !== field.id));
    
    if (target === 'fact') {
      setFactFields(prev => [...prev, field]);
    } else {
      setDimFields(prev => [...prev, field]);
    }
  };

  const handleReset = () => {
    setAvailableFields(INITIAL_FIELDS);
    setFactFields([]);
    setDimFields([]);
    setFeedback({ msg: "Drag or click fields to assign them.", type: 'neutral' });
  };

  // Drag handlers
  const onDragStart = (e: React.DragEvent, field: SchemaField) => {
    e.dataTransfer.setData("fieldId", field.id);
  };

  const onDrop = (e: React.DragEvent, target: 'fact' | 'dimension') => {
    e.preventDefault();
    const fieldId = e.dataTransfer.getData("fieldId");
    const field = availableFields.find(f => f.id === fieldId);
    if (field) {
      handleMove(field, target);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-bold text-slate-100 mb-2">Star Schema Builder</h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong>Fact Tables</strong> contain metrics (numbers) and keys. 
          <strong> Dimension Tables</strong> contain descriptive context (who, where, when).
        </p>
        
        <div className={`p-3 rounded-lg mb-6 text-sm flex items-center gap-2 ${
          feedback.type === 'error' ? 'bg-red-900/30 text-red-200 border border-red-800' :
          feedback.type === 'success' ? 'bg-emerald-900/30 text-emerald-200 border border-emerald-800' :
          'bg-slate-900 text-slate-400 border border-slate-700'
        }`}>
          {feedback.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : 
           feedback.type === 'success' ? <CheckCircle className="w-4 h-4" /> : 
           <ArrowRight className="w-4 h-4" />}
          {feedback.msg}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Draggable Source */}
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <h4 className="font-semibold text-slate-300 mb-4 border-b border-slate-700 pb-2">Available Fields</h4>
            <div className="space-y-2">
              {availableFields.length === 0 && <div className="text-slate-600 italic text-sm">All assigned!</div>}
              {availableFields.map(field => (
                <div 
                  key={field.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, field)}
                  className="bg-slate-800 p-3 rounded border border-slate-600 cursor-move hover:border-blue-400 hover:shadow-md transition-all group flex justify-between items-center"
                >
                  <span className="text-sm font-mono text-slate-200">{field.name}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100">
                     {/* Mobile friendly click buttons */}
                    <button onClick={() => handleMove(field, 'fact')} className="text-[10px] bg-blue-900 text-blue-200 px-2 py-1 rounded hover:bg-blue-800">Fact</button>
                    <button onClick={() => handleMove(field, 'dimension')} className="text-[10px] bg-purple-900 text-purple-200 px-2 py-1 rounded hover:bg-purple-800">Dim</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drop Zones */}
          <div className="lg:col-span-2 relative h-[400px] bg-slate-900/50 rounded-lg border border-slate-700 border-dashed p-4">
            
            {/* Fact Table (Center) */}
            <div 
              onDrop={(e) => onDrop(e, 'fact')}
              onDragOver={onDragOver}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 bg-blue-900/20 border-2 border-blue-500 rounded-lg p-4 min-h-[160px] flex flex-col items-center transition-colors hover:bg-blue-900/30"
            >
              <Database className="text-blue-400 mb-2 w-6 h-6" />
              <h5 className="font-bold text-blue-300 mb-2">FACT Table</h5>
              <div className="w-full space-y-1">
                {factFields.map(f => (
                  <div key={f.id} className="text-xs bg-blue-900/50 text-blue-100 px-2 py-1 rounded text-center border border-blue-800">{f.name}</div>
                ))}
                {factFields.length === 0 && <div className="text-xs text-blue-500/50 text-center mt-4">Drop Metrics Here</div>}
              </div>
            </div>

            {/* Dimension Tables (Surrounding) */}
            <div 
              onDrop={(e) => onDrop(e, 'dimension')}
              onDragOver={onDragOver}
              className="absolute top-4 left-4 w-40 bg-purple-900/20 border-2 border-purple-500 rounded-lg p-3 min-h-[120px] transition-colors hover:bg-purple-900/30"
            >
              <h5 className="font-bold text-purple-300 text-xs mb-2 text-center">DIMENSION (Who/Where)</h5>
              <div className="space-y-1">
                 {dimFields.filter((_, i) => i % 2 === 0).map(f => (
                   <div key={f.id} className="text-[10px] bg-purple-900/50 text-purple-100 px-2 py-1 rounded border border-purple-800">{f.name}</div>
                 ))}
              </div>
            </div>

            <div 
               onDrop={(e) => onDrop(e, 'dimension')}
               onDragOver={onDragOver}
               className="absolute bottom-4 right-4 w-40 bg-purple-900/20 border-2 border-purple-500 rounded-lg p-3 min-h-[120px] transition-colors hover:bg-purple-900/30"
            >
              <h5 className="font-bold text-purple-300 text-xs mb-2 text-center">DIMENSION (When)</h5>
               <div className="space-y-1">
                 {dimFields.filter((_, i) => i % 2 !== 0).map(f => (
                   <div key={f.id} className="text-[10px] bg-purple-900/50 text-purple-100 px-2 py-1 rounded border border-purple-800">{f.name}</div>
                 ))}
              </div>
            </div>

            {/* Visual Connectors */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
               <line x1="30%" y1="20%" x2="50%" y2="40%" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
               <line x1="70%" y1="80%" x2="50%" y2="60%" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
            </svg>

          </div>
        </div>
        
        <div className="flex justify-end">
            <button onClick={handleReset} className="text-sm text-slate-500 hover:text-white underline">Reset Schema</button>
        </div>
      </div>
    </div>
  );
};

export default Tab3Schema;