import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LogOut, Settings, Heart } from 'lucide-react';
import SpeechShower from './SpeechShower';
import TranscriptionPanel from './TranscriptionPanel';

interface TherapyInterfaceProps {
  onLogout: () => void;
}

const TherapyInterface: React.FC<TherapyInterfaceProps> = ({ onLogout }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleToggleListening = () => {
    setIsListening(!isListening);
    if (isSpeaking) setIsSpeaking(false);
  };

  const handleToggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    if (isListening) setIsListening(false);
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full therapy-gradient flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">MindSpace AI</h1>
              <p className="text-sm text-muted-foreground">Your safe space</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main therapy area with speech shower */}
      <div className="pt-20 h-screen">
        <SpeechShower
          isListening={isListening}
          isSpeaking={isSpeaking}
          onToggleListening={handleToggleListening}
          onToggleSpeaking={handleToggleSpeaking}
        />
      </div>

      {/* Transcription panel */}
      <div className="absolute bottom-6 right-6">
        <TranscriptionPanel
          isListening={isListening}
          isSpeaking={isSpeaking}
        />
      </div>
    </div>
  );
};

export default TherapyInterface;
