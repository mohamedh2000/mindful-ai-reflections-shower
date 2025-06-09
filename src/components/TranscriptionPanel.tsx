
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TranscriptionEntry {
  id: number;
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

interface TranscriptionPanelProps {
  isListening: boolean;
  isSpeaking: boolean;
}

const TranscriptionPanel: React.FC<TranscriptionPanelProps> = ({ isListening, isSpeaking }) => {
  const [transcriptions, setTranscriptions] = useState<TranscriptionEntry[]>([
    {
      id: 1,
      type: 'ai',
      text: "Hello! I'm here to listen and support you. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [currentUserText, setCurrentUserText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate transcription updates
  useEffect(() => {
    if (isListening) {
      setCurrentUserText('Listening...');
    } else if (isSpeaking) {
      // Simulate AI response
      const responses = [
        "I understand how you're feeling.",
        "That sounds really challenging.",
        "Thank you for sharing that with me.",
        "How does that make you feel?",
        "I'm here to support you through this."
      ];
      
      const newEntry: TranscriptionEntry = {
        id: Date.now(),
        type: 'ai',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setTranscriptions(prev => [...prev, newEntry]);
      setCurrentUserText('');
    } else {
      setCurrentUserText('');
    }
  }, [isListening, isSpeaking]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcriptions, currentUserText]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="w-80 bg-white/80 backdrop-blur-sm border-white/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-foreground">
          Session Transcript
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64 px-4">
          <div ref={scrollRef} className="space-y-3">
            {transcriptions.map((entry) => (
              <div key={entry.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${
                    entry.type === 'ai' ? 'text-therapy-purple' : 'text-therapy-blue'
                  }`}>
                    {entry.type === 'ai' ? 'AI Therapist' : 'You'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(entry.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {entry.text}
                </p>
              </div>
            ))}
            
            {currentUserText && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-therapy-blue">
                    You
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(new Date())}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  {currentUserText}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TranscriptionPanel;
