import React, { useState, useEffect, useRef } from 'react';

interface HackerLoginProps {
  onLoginSuccess: () => void;
}

const HackerLogin: React.FC<HackerLoginProps> = ({ onLoginSuccess }) => {
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "INITIALIZING WATO PROTOCOL v11.0...",
  ]);
  const [isHacking, setIsHacking] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [terminalLines]);

  const handleHack = () => {
    if (isHacking) return;
    setIsHacking(true);
    
    const sequence = [
      "ESTABLISHING HANDSHAKE...",
      "BYPASSING FIREWALL...",
      "ACCESSING CRICKET_DB...",
      "LOADING PLAYER_STATS_MODULE...",
      "ENABLING PRO SCORING ENGINE...",
      "WELCOME TO WATO ELEVEN SCORE CARD PRO"
    ];

    let delay = 0;
    sequence.forEach((line, index) => {
      delay += Math.random() * 500 + 200;
      setTimeout(() => {
        setTerminalLines(prev => [...prev, `> ${line}`]);
        if (index === sequence.length - 1) {
          setTimeout(() => {
            setAccessGranted(true);
            setTimeout(onLoginSuccess, 2000);
          }, 1000);
        }
      }, delay);
    });
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Matrix Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className="z-10 w-full max-w-2xl border border-green-700 bg-black/95 shadow-[0_0_50px_rgba(34,197,94,0.2)] rounded-sm p-1">
        <div className="flex justify-between items-center bg-green-900/10 px-4 py-2 border-b border-green-800 mb-2">
          <span className="text-xs tracking-widest text-green-600">ROOT@WATO-SERVER:~</span>
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-900"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-900"></div>
            <div className="w-2 h-2 rounded-full bg-green-900"></div>
          </div>
        </div>

        <div className="h-80 overflow-y-auto p-4 space-y-1 text-sm md:text-base font-bold">
          {terminalLines.map((line, idx) => (
            <div key={idx} className={`${line.includes("WELCOME") ? "text-green-400 text-lg mt-4 animate-pulse border-l-4 border-green-500 pl-2" : "text-green-600/90"}`}>
              {line}
            </div>
          ))}
          <div ref={terminalEndRef} />
          {!accessGranted && (
             <span className="animate-pulse bg-green-500 text-black px-1">_</span>
          )}
        </div>

        {!isHacking && !accessGranted && (
          <div className="p-6 border-t border-green-900/50 flex justify-center bg-green-900/5">
            <button
              onClick={handleHack}
              className="group relative px-10 py-4 bg-black border border-green-600 hover:bg-green-900/20 transition-all duration-200"
            >
              <div className="absolute inset-0 w-full h-full border border-green-600 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
              <span className="relative text-green-500 font-bold tracking-[0.2em] group-hover:text-green-400">
                EXECUTE LOGIN
              </span>
            </button>
          </div>
        )}
      </div>

      {accessGranted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50 animate-[fadeIn_0.5s_ease-out]">
          <div className="text-center space-y-4">
             <div className="inline-block border-2 border-green-500 p-8 rounded-lg shadow-[0_0_50px_rgba(34,197,94,0.4)] bg-gray-900/50 backdrop-blur-sm">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2">
                  WATO <span className="text-green-500">ELEVEN</span>
                </h1>
                <div className="h-1 w-full bg-green-500 mb-4 shadow-[0_0_10px_#22c55e]"></div>
                <p className="text-green-400 font-mono tracking-widest text-xl">
                  ACCESS GRANTED
                </p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackerLogin;
