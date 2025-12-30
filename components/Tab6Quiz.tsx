import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, Award, RefreshCw } from 'lucide-react';

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Is a Data Warehouse optimized for many small writes or massive reads?",
    options: ["Many Small Writes (OLTP)", "Massive Reads (OLAP)"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "In a Star Schema, which table contains the numbers/metrics?",
    options: ["Dimension Table", "Fact Table", "Staging Table"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What storage technique allows Warehouses to compress repetitive data efficiently?",
    options: ["Row-oriented Storage", "Columnar Storage", "Linked Lists"],
    correctAnswer: 1
  }
];

const Tab6Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  
  const score = Object.entries(answers).reduce((acc, [qId, ansIdx]) => {
    const question = QUESTIONS.find(q => q.id === parseInt(qId));
    return acc + (question?.correctAnswer === ansIdx ? 1 : 0);
  }, 0);

  const handleSelect = (qId: number, optIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-2xl mx-auto">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Knowledge Check</h3>

        {!submitted ? (
          <div className="space-y-8">
            {QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-3">
                <h4 className="text-lg text-slate-200 font-medium">{q.id}. {q.question}</h4>
                <div className="space-y-2">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(q.id, idx)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        answers[q.id] === idx 
                          ? 'bg-blue-600 border-blue-400 text-white' 
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length < QUESTIONS.length}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg mt-8 transition-colors"
            >
              Submit Answers
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
                {score === QUESTIONS.length ? (
                    <Award className="w-24 h-24 text-yellow-400 animate-bounce" />
                ) : (
                    <Award className="w-24 h-24 text-slate-600" />
                )}
            </div>
            
            <div>
              <h4 className="text-4xl font-bold text-white mb-2">Score: {score} / {QUESTIONS.length}</h4>
              <p className="text-slate-400">
                {score === QUESTIONS.length ? "Perfect! You are a Data Warehouse Architect." : "Good effort! Review the tabs to master the concepts."}
              </p>
            </div>

            <div className="space-y-4 text-left bg-slate-900 p-6 rounded-lg border border-slate-700">
               {QUESTIONS.map(q => {
                   const isCorrect = answers[q.id] === q.correctAnswer;
                   return (
                       <div key={q.id} className="flex items-start gap-3">
                           {isCorrect ? <CheckCircle className="text-emerald-500 w-5 h-5 mt-1 shrink-0" /> : <XCircle className="text-red-500 w-5 h-5 mt-1 shrink-0" />}
                           <div>
                               <p className="text-slate-300 font-medium">{q.question}</p>
                               <p className={`text-sm ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                                   Answer: {q.options[q.correctAnswer]}
                               </p>
                           </div>
                       </div>
                   )
               })}
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab6Quiz;