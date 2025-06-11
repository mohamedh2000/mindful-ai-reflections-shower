import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import WaveformDisplay from './WaveformDisplay';
import { Room } from 'livekit-client';
import { Button } from '@/components/ui/button';

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
  room: Room;
  isListening: boolean;
  isSpeaking: boolean;
  onToggleListening: () => void;
  onToggleSpeaking: () => void;
}

const SpeechShower: React.FC<SpeechShowerProps> = ({
  room,
  isListening,
  isSpeaking,
  onToggleListening,
  onToggleSpeaking
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const animationRef = useRef<number>();
  const [connected, setConnected] = useState(false);

  const onConnectButtonClicked = useCallback(async () => {
    const url = new URL(
      "http://localhost:3000/api/connection-details"
    );
    const response = await fetch(url.toString());
    const connectionDetailsData = await response.json();

    await room.connect(connectionDetailsData.serverUrl, connectionDetailsData.participantToken);
    await room.localParticipant.setMicrophoneEnabled(true);
    setConnected(true);
  }, [room]);

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

      {/* Central Waveform Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`relative transition-all duration-500 ${isSpeaking ? 'scale-110' : 'scale-100'}`}>
          <div className={`w-40 h-32 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl
            ${isSpeaking ? 'animate-pulse-soft' : ''} 
            ${isListening ? 'ring-4 ring-therapy-blue ring-opacity-50' : ''}`}>
            <WaveformDisplay isListening={isListening} isSpeaking={isSpeaking} />
          </div>

          {/* Ripple effect when speaking */}
          {isSpeaking && (
            <div className="absolute inset-0 rounded-2xl bg-therapy-purple/20 animate-ping" />
          )}
        </div>
      </div>

      {/* Connect Button */}
      {!connected ? (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
          <Button onClick={onConnectButtonClicked} className="px-6 py-2 rounded-xl bg-blue-600 text-white">
            Connect to LiveKit
          </Button>
        </div>
      ) : (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button
            onClick={onToggleListening}
            className={`p-4 rounded-full transition-all duration-300 shadow-lg ${isListening
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-white hover:bg-gray-50 text-therapy-blue border-2 border-therapy-blue'
              }`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <button
            onClick={onToggleSpeaking}
            className={`p-4 rounded-full transition-all duration-300 shadow-lg ${isSpeaking
              ? 'bg-therapy-purple hover:bg-therapy-purple/80 text-white'
              : 'bg-white hover:bg-gray-50 text-therapy-purple border-2 border-therapy-purple'
              }`}
          >
            {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>
      )}

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
