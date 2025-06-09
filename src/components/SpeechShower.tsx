
import React, { useEffect, useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface SpeechShowerProps {
  isListening: boolean;
  isSpeaking: boolean;
  onToggleListening: () => void;
  onToggleSpeaking: () => void;
}

const SpeechShower: React.FC<SpeechShowerProps> = ({
  isListening,
  isSpeaking,
  onToggleListening,
  onToggleSpeaking
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isSpeaking && !isListening) {
      setParticles([]);
      return;
    }

    const colors = [
      'hsl(217, 91%, 60%)',
      'hsl(280, 60%, 70%)',
      'hsl(320, 70%, 75%)',
      'hsl(180, 65%, 60%)',
      'hsl(160, 60%, 65%)',
      'hsl(35, 85%, 70%)'
    ];

    const createParticle = (id: number): Particle => ({
      id,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 20,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 2,
      speedY: -Math.random() * 3 - 1,
      opacity: Math.random() * 0.7 + 0.3
    });

    let particleId = 0;
    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = [...prev];
        
        // Add new particles
        const particleCount = isSpeaking ? 5 : 3;
        for (let i = 0; i < particleCount; i++) {
          newParticles.push(createParticle(particleId++));
        }
        
        // Update existing particles
        return newParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.speedX,
            y: particle.y + particle.speedY,
            opacity: particle.opacity - 0.005
          }))
          .filter(particle => particle.y > -50 && particle.opacity > 0)
          .slice(-100); // Limit particles
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isSpeaking, isListening]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full pointer-events-none transition-all duration-100 animate-pulse-soft"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: 'blur(1px)',
            transform: `scale(${0.5 + particle.opacity})`
          }}
        />
      ))}
      
      {/* Central AI Avatar */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`relative transition-all duration-500 ${isSpeaking ? 'scale-110' : 'scale-100'}`}>
          <div className={`w-32 h-32 rounded-full therapy-gradient flex items-center justify-center shadow-2xl
            ${isSpeaking ? 'animate-pulse-soft' : ''} 
            ${isListening ? 'ring-4 ring-therapy-blue ring-opacity-50' : ''}`}>
            <div className="text-4xl">🤖</div>
          </div>
          
          {/* Ripple effect when speaking */}
          {isSpeaking && (
            <div className="absolute inset-0 rounded-full therapy-gradient opacity-30 animate-ping" />
          )}
        </div>
      </div>
      
      {/* Control buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          onClick={onToggleListening}
          className={`p-4 rounded-full transition-all duration-300 shadow-lg ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-white hover:bg-gray-50 text-therapy-blue border-2 border-therapy-blue'
          }`}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        
        <button
          onClick={onToggleSpeaking}
          className={`p-4 rounded-full transition-all duration-300 shadow-lg ${
            isSpeaking 
              ? 'bg-therapy-purple hover:bg-therapy-purple/80 text-white' 
              : 'bg-white hover:bg-gray-50 text-therapy-purple border-2 border-therapy-purple'
          }`}
        >
          {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Status text */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="speech-bubble px-6 py-3 rounded-full">
          <p className="text-sm font-medium text-therapy-blue">
            {isSpeaking ? "I'm here to listen and support you" : 
             isListening ? "I'm listening..." : 
             "How are you feeling today?"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpeechShower;
