import React, { useEffect, useState, useRef } from 'react';

interface WaveformDisplayProps {
  isListening: boolean;
  isSpeaking: boolean;
  mediaStream?: MediaStream | null;
}

const NUM_BARS = 12;

const WaveformDisplay: React.FC<WaveformDisplayProps> = ({ isListening, isSpeaking, mediaStream }) => {
  const [bars, setBars] = useState<number[]>(Array(NUM_BARS).fill(0.2));
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isSpeaking && mediaStream) {
      // Use the passed-in mediaStream for visualization
      let audioContext: AudioContext;
      if ('AudioContext' in window) {
        audioContext = new AudioContext();
      } else if ('webkitAudioContext' in window) {
        audioContext = new (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext();
      } else {
        throw new Error('Web Audio API is not supported in this browser');
      }
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;
      const source = audioContext.createMediaStreamSource(mediaStream);
      source.connect(analyser);
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      const animate = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        // Split the frequency data into NUM_BARS
        const chunkSize = Math.floor(bufferLength / NUM_BARS);
        const newBars = Array(NUM_BARS).fill(0).map((_, i) => {
          const start = i * chunkSize;
          const end = start + chunkSize;
          const chunk = dataArrayRef.current!.slice(start, end);
          const avg = chunk.reduce((a, b) => a + b, 0) / chunk.length;
          return Math.max(0.1, avg / 255); // Normalize to 0.1 - 1
        });
        setBars(newBars);
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animate();

      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (audioContextRef.current) audioContextRef.current.close();
        analyserRef.current = null;
        dataArrayRef.current = null;
        audioContextRef.current = null;
      };
    } else {
      // Fallback to animation
      const interval = setInterval(() => {
        setBars(prev => prev.map(() => {
          if (isListening) {
            return Math.random() * 0.4 + 0.1;
          }
          return 0.2;
        }));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isSpeaking, isListening, mediaStream]);

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
