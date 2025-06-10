
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
    <div className="min-h-screen flex flex-col">
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

      {/* Main therapy area with speech shower - takes up 90% of screen */}
      <div className="flex-1 pt-20" style={{ height: '90vh' }}>
        <SpeechShower
          isListening={isListening}
          isSpeaking={isSpeaking}
          onToggleListening={handleToggleListening}
          onToggleSpeaking={handleToggleSpeaking}
        />
      </div>

      {/* Transcription panel - takes up 10% of screen height and full width */}
      <div className="w-full" style={{ height: '10vh' }}>
        <TranscriptionPanel
          isListening={isListening}
          isSpeaking={isSpeaking}
        />
      </div>
    </div>
  );
};

export default TherapyInterface;
