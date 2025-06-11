
import React, { useEffect, useState } from 'react';

interface WaveformDisplayProps {
  isListening: boolean;
  isSpeaking: boolean;
}

const WaveformDisplay: React.FC<WaveformDisplayProps> = ({ isListening, isSpeaking }) => {
  const [bars, setBars] = useState<number[]>(Array(12).fill(0.2));

  useEffect(() => {
    if (!isListening && !isSpeaking) {
      setBars(Array(12).fill(0.2));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map(() => {
        if (isSpeaking) {
          return Math.random() * 0.8 + 0.2; // More active when speaking
        } else if (isListening) {
          return Math.random() * 0.4 + 0.1; // Less active when listening
        }
        return 0.2;
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [isListening, isSpeaking]);

  return (
    <div className="flex items-end justify-center space-x-1 h-24">
      {bars.map((height, index) => (
        <div
          key={index}
          className={`w-2 rounded-full transition-all duration-100 ${
            isSpeaking ? 'bg-therapy-purple' : 
            isListening ? 'bg-therapy-blue' : 
            'bg-therapy-blue opacity-30'
          }`}
          style={{
            height: `${height * 100}%`,
            minHeight: '8px'
          }}
        />
      ))}
    </div>
  );
};

export default WaveformDisplay;
