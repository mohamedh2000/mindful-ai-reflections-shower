import React, { useEffect, useState, useRef } from 'react';
import WaveformGraph from './WaveformGraph';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
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
  const particleIdRef = useRef(0);
  const animationRef = useRef<number>();

  const colors = [
    'hsl(217, 91%, 60%)',
    'hsl(280, 60%, 70%)',
    'hsl(320, 70%, 75%)',
    'hsl(180, 65%, 60%)',
    'hsl(160, 60%, 65%)',
    'hsl(35, 85%, 70%)'
  ];

  const createParticle = (): Particle => {
    const id = particleIdRef.current++;
    return {
      id,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 20,
      size: Math.random() * 6 + 3,
      color: colors[id % colors.length],
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: -Math.random() * 2 - 1,
      opacity: 1,
      life: 100
    };
  };

  useEffect(() => {
    if (!isSpeaking && !isListening) {
      setParticles([]);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    let lastTime = 0;
    let particleTimer = 0;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      particleTimer += deltaTime;

      setParticles(prev => {
        let newParticles = [...prev];
        
        // Add new particles at a controlled rate
        const particleInterval = isSpeaking ? 150 : 250;
        if (particleTimer >= particleInterval) {
          const particleCount = isSpeaking ? 2 : 1;
          for (let i = 0; i < particleCount; i++) {
            newParticles.push(createParticle());
          }
          particleTimer = 0;
        }
        
        // Update existing particles
        newParticles = newParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.speedX,
            y: particle.y + particle.speedY,
            life: particle.life - 1,
            opacity: particle.life / 100
          }))
          .filter(particle => particle.life > 0 && particle.y > -50)
          .slice(-80); // Limit particles

        return newParticles;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpeaking, isListening]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: 'blur(1px)',
            transform: `scale(${0.5 + particle.opacity * 0.5})`
          }}
        />
      ))}
      
      {/* Central Waveform Graph */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`relative transition-all duration-500 ${isSpeaking ? 'scale-110' : 'scale-100'}`}>
          <div className={`p-8 rounded-2xl therapy-gradient-soft flex items-center justify-center shadow-2xl
            ${isSpeaking ? 'animate-pulse-soft' : ''} 
            ${isListening ? 'ring-4 ring-therapy-blue ring-opacity-50' : ''}`}>
            <WaveformGraph isSpeaking={isSpeaking} isListening={isListening} />
          </div>
          
          {/* Ripple effect when speaking */}
          {isSpeaking && (
            <div className="absolute inset-0 rounded-2xl therapy-gradient opacity-20 animate-ping" />
          )}
        </div>
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
