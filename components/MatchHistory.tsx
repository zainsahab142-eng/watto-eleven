import React, { useState, useEffect } from 'react';
import { MatchSummary } from '../types';

interface MatchHistoryProps {
  onBack: () => void;
  isDarkMode: boolean;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ onBack, isDarkMode }) => {
  const [history, setHistory] = useState<MatchSummary[]>([]);
  const [deleteAllStep, setDeleteAllStep] = useState(0); 
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteStep, setDeleteStep] = useState(0);

  const bgMain = isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900';
  const bgCard = isDarkMode ? 'bg-gray-900 border-green-900' : 'bg-white border-gray-200';
  const textMuted = isDarkMode ? 'text-gray-500' : 'text-gray-500';

  useEffect(() => {
    const saved = localStorage.getItem('wato_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleClearAll = () => {
      if (deleteAllStep === 0) setDeleteAllStep(1);
      else if (deleteAllStep === 1) setDeleteAllStep(2);
      else {
          localStorage.removeItem('wato_history');
          setHistory([]);
          setDeleteAllStep(0);
      }
  };

  const handleDeleteSingle = (id: string) => {
      if (deleteId !== id) {
          setDeleteId(id);
          setDeleteStep(1);
          return;
      }
      if (deleteStep === 1) setDeleteStep(2);
      else if (deleteStep === 2) {
          const newHistory = history.filter(m => m.id !== id);
          localStorage.setItem('wato_history', JSON.stringify(newHistory));
          setHistory(newHistory);
          setDeleteId(null);
          setDeleteStep(0);
      }
  };

  const getDeleteLabel = (step: number) => {
      if (step === 1) return "CONFIRM?";
      if (step === 2) return "SURE?";
      return "DEL";
  };

  return (
    <div className={`min-h-screen p-6 ${bgMain} font-mono`}>
      <div className="max-w-md mx-auto">
        <div className={`flex items-center mb-8 border-b pb-4 ${isDarkMode ? 'border-green-900' : 'border-green-200'}`}>
          <button onClick={onBack} className="text-2xl mr-4 hover:text-green-500">❮</button>
          <h2 className="text-2xl font-black text-green-600 tracking-widest">ARCHIVED_MATCHES_DB</h2>
        </div>

        {history.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No data found in local storage.</div>
        ) : (
          <div className="space-y-4">
            {history.map((match) => (
              <div key={match.id} className={`border-l-4 border-green-600 p-4 relative bg-opacity-50 ${bgCard}`}>
                <div className="flex justify-between text-[10px] text-gray-500 mb-1 uppercase tracking-widest">
                  <span>{match.date}</span>
                  <span>ID: {match.id.slice(-4)}</span>
                </div>
                <div className="text-lg font-bold mb-1 uppercase">
                  {match.teamA} <span className="text-gray-600 text-xs">vs</span> {match.teamB}
                </div>
                <div className="text-green-500 text-sm font-bold">
                  {match.result}
                </div>
                
                <div className="absolute top-4 right-4">
                    <button onClick={() => handleDeleteSingle(match.id)} className={`text-[10px] px-2 py-1 font-bold uppercase tracking-widest border ${deleteId === match.id ? 'bg-red-900 border-red-500 text-red-500 animate-pulse' : 'border-gray-700 text-gray-600 hover:text-red-500'}`}>
                        {deleteId === match.id ? getDeleteLabel(deleteStep) : "X"}
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {history.length > 0 && (
            <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
                <button onClick={handleClearAll} className={`w-full py-3 font-bold border text-sm tracking-widest uppercase ${deleteAllStep > 0 ? 'bg-red-900/20 text-red-500 border-red-900' : 'text-gray-500 border-gray-800 hover:border-red-900 hover:text-red-900'}`}>
                    {deleteAllStep === 0 ? "PURGE DATABASE" : getDeleteLabel(deleteAllStep)}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default MatchHistory;