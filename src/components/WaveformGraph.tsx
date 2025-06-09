
import React, { useEffect, useState, useRef } from 'react';

interface WaveformGraphProps {
  isSpeaking: boolean;
  isListening: boolean;
}

const WaveformGraph: React.FC<WaveformGraphProps> = ({ isSpeaking, isListening }) => {
  const [bars, setBars] = useState<number[]>(Array(20).fill(0));
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isSpeaking && !isListening) {
      setBars(Array(20).fill(0));
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = () => {
      setBars(prev => prev.map((_, index) => {
        if (isSpeaking) {
          // More dynamic animation when speaking
          return Math.random() * 100 + 20;
        } else if (isListening) {
          // Subtle animation when listening
          return Math.random() * 30 + 5;
        }
        return 0;
      }));

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
    <div className="flex items-end justify-center space-x-1 h-32 w-64">
      {bars.map((height, index) => (
        <div
          key={index}
          className={`w-3 rounded-t transition-all duration-100 ${
            isSpeaking 
              ? 'bg-therapy-purple' 
              : isListening 
                ? 'bg-therapy-blue' 
                : 'bg-muted'
          }`}
          style={{
            height: `${Math.max(height, 4)}%`,
            opacity: isSpeaking ? 0.8 : isListening ? 0.6 : 0.3
          }}
        />
      ))}
    </div>
  );
};

export default WaveformGraph;
