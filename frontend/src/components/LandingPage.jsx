import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

export default function RocketLanding() {
  const [stage, setStage] = useState('loading'); // loading -> launching -> zoom -> countdown -> redirect
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Stage progression with timings
    const timers = [
      
      setTimeout(() => setStage('launching'), 2000),
    
      setTimeout(() => setStage('zoom'), 4500),

      setTimeout(() => setStage('countdown'), 5500),
      
      // Countdown timers
      setTimeout(() => setCountdown(2), 6500),
      setTimeout(() => setCountdown(1), 7500),
      setTimeout(() => setCountdown(0), 8500),
      
   
      setTimeout(() => {
        window.location.href = "/Home";
      }, 9500)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-black">
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-purple-400 rounded-full opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 1}s`
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}>
        </div>

        {/* Animated rays */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-transparent via-purple-500 to-transparent h-0.5 w-full animate-pulse opacity-30"
              style={{
                top: `${10 + i * 12}%`,
                transform: `rotate(${i * 22.5}deg)`,
                transformOrigin: 'center',
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center">
        
        {/* Title with stages */}
        <div className={`absolute transition-all duration-1000 ease-in-out ${
          stage === 'loading' ? 'top-1/3 scale-100 opacity-100' :
          stage === 'launching' ? 'top-20 scale-110 opacity-100' :
          stage === 'zoom' ? 'top-10 scale-75 opacity-60' :
          'top-10 scale-50 opacity-30'
        }`}>
          <h1 className={`text-center font-black transition-all duration-1000 ${
            stage === 'loading' ? 'text-7xl md:text-9xl' :
            stage === 'launching' ? 'text-8xl md:text-10xl' :
            'text-6xl md:text-8xl'
          } bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl`}>
            
            {stage === 'loading' && (
              <div className="animate-bounce">
                <span className="text-purple-400 text-8xl">●</span>
                <span className="tracking-widest font-extrabold ml-6 mr-6">LOOPWAR</span>
                <span className="text-purple-400 text-8xl">●</span>
                <div className="text-2xl mt-4 text-purple-300 animate-pulse">
                  INITIALIZING...
                </div>
              </div>
            )}
            
            {stage === 'launching' && (
              <div className="animate-pulse">
                <span className="text-yellow-400 text-8xl font-bold">▲</span>
                <span className="tracking-widest font-extrabold animate-pulse ml-6 mr-6">LOOPWAR</span>
                <span className="text-yellow-400 text-8xl font-bold">▲</span>
                <div className="text-3xl mt-4 text-green-400 animate-bounce font-bold">
                  LAUNCHING NOW!!
                </div>
              </div>
            )}
            
            {stage === 'zoom' && (
              <div className="animate-pulse opacity-80">
                <span className="tracking-widest font-extrabold">LOOPWAR</span>
              </div>
            )}
          </h1>

          {/* Loading bar for loading stage */}
          {stage === 'loading' && (
            <div className="mt-8 w-96 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse transition-all duration-2000 w-full"></div>
            </div>
          )}
        </div>

        {/* Spline Component with dynamic scaling */}
        <div className={`transition-all duration-1500 ease-in-out ${
          stage === 'loading' ? 'scale-90 opacity-60' :
          stage === 'launching' ? 'scale-125 opacity-90' :
          stage === 'zoom' ? 'scale-200 opacity-100' :
          'scale-150 opacity-80'
        } ${(stage === 'zoom' || stage === 'countdown') ? 'animate-pulse' : ''}`}>
          <div className="relative w-screen h-screen flex items-center justify-center">
            {/* Enhanced glow effect around Spline */}
            <div className={`absolute inset-0 transition-all duration-1000 ${
              stage === 'launching' ? 'shadow-[0_0_100px_50px_rgba(147,51,234,0.3)]' :
              stage === 'zoom' ? 'shadow-[0_0_200px_100px_rgba(147,51,234,0.5)]' :
              'shadow-[0_0_50px_25px_rgba(147,51,234,0.2)]'
            } rounded-full`}></div>
            
            {/* Orbital rings around Spline */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={`absolute border border-purple-500/20 rounded-full transition-all duration-1000 ${
                stage === 'launching' ? 'w-96 h-96 animate-spin' :
                stage === 'zoom' ? 'w-[600px] h-[600px] animate-spin' :
                'w-80 h-80'
              }`} style={{ animationDuration: '20s' }}></div>
              <div className={`absolute border border-purple-400/10 rounded-full transition-all duration-1000 ${
                stage === 'launching' ? 'w-[500px] h-[500px] animate-spin' :
                stage === 'zoom' ? 'w-[800px] h-[800px] animate-spin' :
                'w-96 h-96'
              }`} style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>
            </div>
            
            {/* Spline container with proper sizing for interactivity */}
            <div className="w-[800px] h-[600px] relative z-10">
              <Spline 
                scene="https://prod.spline.design/ng-R5Gu6M0rgLW68/scene.splinecode"
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent'
                }}
              />
            </div>
          </div>
        </div>

        {/* Countdown Display */}
        {stage === 'countdown' && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="text-center">
              <div className="text-[20rem] font-black text-transparent bg-gradient-to-b from-red-400 via-orange-500 to-yellow-400 bg-clip-text drop-shadow-[0_0_50px_rgba(255,165,0,0.8)] animate-bounce">
                {countdown === 0 ? 'GO!' : countdown}
              </div>
              <div className="text-4xl font-bold text-white mt-4 animate-pulse">
                {countdown === 0 ? 'LAUNCHING TO HOME!' : 'LAUNCHING IN...'}
              </div>
            </div>
          </div>
        )}

        {/* Bottom progress indicators */}
        <div className="absolute bottom-10 flex space-x-4">
          {['INIT', 'LAUNCH', 'DEPLOY', 'GO'].map((label, index) => (
            <div key={label} className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                (stage === 'loading' && index === 0) ||
                (stage === 'launching' && index === 1) ||
                (stage === 'zoom' && index === 2) ||
                (stage === 'countdown' && index === 3)
                ? 'bg-purple-500 border-purple-400 shadow-lg shadow-purple-500/50 animate-pulse' 
                : index < (['loading', 'launching', 'zoom', 'countdown'].indexOf(stage))
                ? 'bg-green-500 border-green-400'
                : 'bg-transparent border-gray-600'
              }`}></div>
              <span className={`text-xs mt-2 font-bold tracking-wider transition-colors duration-500 ${
                (stage === 'loading' && index === 0) ||
                (stage === 'launching' && index === 1) ||
                (stage === 'zoom' && index === 2) ||
                (stage === 'countdown' && index === 3)
                ? 'text-purple-400' 
                : index < (['loading', 'launching', 'zoom', 'countdown'].indexOf(stage))
                ? 'text-green-400'
                : 'text-gray-600'
              }`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Zoom transition overlay */}
        {(stage === 'zoom' || stage === 'countdown') && (
          <div className="absolute inset-0 bg-black animate-pulse opacity-0 animate-fade-in pointer-events-none">
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-900/20 to-black"></div>
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 0.8; }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-in-out;}
      `}</style>
    </div>
  );
}