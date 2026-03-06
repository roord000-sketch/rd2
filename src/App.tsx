/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, 
  Minimize2, 
  Gamepad2, 
  Info, 
  Trophy, 
  Users, 
  Zap,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change events (e.g., if user presses Esc)
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 selection:text-white overflow-hidden flex flex-col">
      {/* Floating Header / Controls */}
      <div className="fixed top-4 left-4 right-4 z-[60] flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto bg-black/40 backdrop-blur-md p-2 pr-4 rounded-2xl border border-white/10 shadow-2xl">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Gamepad2 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">
              Smash Karts <span className="text-orange-500">Unblocked</span>
            </h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] uppercase tracking-wider font-bold text-emerald-500/80">Live</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button 
            onClick={() => setShowDashboard(!showDashboard)}
            className={`p-3 rounded-xl transition-all border shadow-xl backdrop-blur-md ${showDashboard ? 'bg-orange-500 border-orange-400 text-white' : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:bg-white/5'}`}
            title="Toggle Dashboard"
          >
            <Info size={20} />
          </button>
          <button 
            onClick={toggleFullscreen}
            className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all shadow-xl"
            title="Browser Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>

      {/* Main Game View */}
      <div 
        ref={containerRef}
        className="flex-1 relative bg-zinc-900 overflow-hidden"
      >
        <iframe 
          src="https://smashkarts.freetls.fastly.net/" 
          className="w-full h-full border-none"
          allow="autoplay; fullscreen; keyboard; mouse"
          title="Smash Karts"
        />
      </div>

      {/* Dashboard Overlay */}
      <AnimatePresence>
        {showDashboard && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl overflow-y-auto pt-24 pb-12 px-4"
          >
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-black tracking-tighter sm:text-6xl">
                  SMASH <span className="text-orange-500">KARTS</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                  The ultimate 3D multiplayer kart battle game. Drive, collect weapons, and blow up your opponents in fast-paced arena combat.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="text-orange-500" size={20} />
                  </div>
                  <h3 className="font-bold">Controls</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center justify-between">
                      <span>Drive</span>
                      <span className="px-2 py-0.5 bg-white/10 rounded text-xs">WASD / Arrows</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Fire</span>
                      <span className="px-2 py-0.5 bg-white/10 rounded text-xs">Space</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="text-blue-500" size={20} />
                  </div>
                  <h3 className="font-bold">Features</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Level up to unlock new characters and karts. Compete in seasonal events and climb the global leaderboards.
                  </p>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Users className="text-emerald-500" size={20} />
                  </div>
                  <h3 className="font-bold">Multiplayer</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Battle against players from all over the world in real-time. Join rooms or create private matches with friends.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-xs">
                <p>© {new Date().getFullYear()} Smash Karts Unblocked Mirror</p>
                <div className="flex gap-6">
                  <a href="https://smashkarts.io" target="_blank" rel="noopener" className="hover:text-white flex items-center gap-1">
                    Official Site <ExternalLink size={10} />
                  </a>
                  <button onClick={() => setShowDashboard(false)} className="text-orange-500 font-bold hover:underline">
                    Back to Game
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
