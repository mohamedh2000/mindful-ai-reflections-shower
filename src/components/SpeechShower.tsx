
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Volume2 } from 'lucide-react';
import WaveformGraph from './WaveformGraph';

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
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: 'hsl(35, 45%, 92%)' }}>
      {/* Central Waveform Graph */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`relative transition-all duration-500 ${isSpeaking ? 'scale-110' : 'scale-100'}`}>
          <div className={`p-8 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl border border-white/30
            ${isSpeaking ? 'animate-pulse-soft' : ''} 
            ${isListening ? 'ring-4 ring-blue-400 ring-opacity-50' : ''}`}>
            <WaveformGraph isSpeaking={isSpeaking} isListening={isListening} />
          </div>
        </div>
      </div>
      
      {/* Status text */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
          <p className="text-sm font-medium text-gray-700">
            {isSpeaking ? "I'm here to listen and support you" : 
             isListening ? "I'm listening..." : 
             "How are you feeling today?"}
          </p>
        </div>
      </div>

      {/* Control buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <Button
          onClick={onToggleListening}
          variant={isListening ? "default" : "outline"}
          size="lg"
          className={`rounded-full ${isListening ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/20 border-white/30 hover:bg-white/30'}`}
        >
          <Mic className="w-5 h-5 mr-2" />
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </Button>
        
        <Button
          onClick={onToggleSpeaking}
          variant={isSpeaking ? "default" : "outline"}
          size="lg"
          className={`rounded-full ${isSpeaking ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/20 border-white/30 hover:bg-white/30'}`}
        >
          <Volume2 className="w-5 h-5 mr-2" />
          {isSpeaking ? 'Stop Speaking' : 'Start Speaking'}
        </Button>
      </div>
    </div>
  );
};

export default SpeechShower;
