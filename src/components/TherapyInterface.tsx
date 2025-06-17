import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LogOut, Settings, Heart } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import SpeechShower from './SpeechShower';
import SessionDashboard from './SessionDashboard';
import SettingsModal from './SettingsModal';
import { Room, RoomEvent } from "livekit-client";
import { RoomContext } from "@livekit/components-react";
import { useRoom } from '@/context/RoomContext';
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
interface TherapyInterfaceProps {
  onLogout: () => void;
}

const TherapyInterface: React.FC<TherapyInterfaceProps> = ({ onLogout }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { signOut } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { room, setRoom } = useRoom();

  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (!room) {
      setRoom(new Room());
    }
  }, [room, setRoom]);

  useEffect(() => {
    if (isSignedIn) {
      fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ userId: user?.id }),
      }).then(async (data) => {
        const userData = await data.json();
        console.log(userData);
      }).catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [isSignedIn, user?.id]);


  useEffect(() => {
    if (!room) return;
    function onDeviceFailure(error: Error) {
      console.error(error);
      alert(
        "Error acquiring camera or microphone permissions. Please make sure you grant the necessary permissions in your browser and reload the tab"
      );
    }
    room.on(RoomEvent.MediaDevicesError, onDeviceFailure);
    return () => {
      room.off(RoomEvent.MediaDevicesError, onDeviceFailure);
    };
  }, [room]);

  const handleLogout = () => {
    if (room) room.disconnect();
    signOut(); // This will log out of Clerk and redirect to the sign-in page
    onLogout();
  };

  const handleToggleListening = () => {
    setIsListening(!isListening);
    if (isSpeaking) setIsSpeaking(false);
  };

  const handleToggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    if (isListening) setIsListening(false);
    console.log('[UI] Toggled speaking:', !isSpeaking);
  };

  return (
    <RoomContext.Provider value={room}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <SessionDashboard />
          
          <div className="flex-1 relative">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-10 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <SidebarTrigger />
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
                    onClick={() => setSettingsOpen(true)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
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
                room={room}
                isListening={isListening}
                isSpeaking={isSpeaking}
                onToggleListening={handleToggleListening}
                onToggleSpeaking={handleToggleSpeaking}
              />
            </div>

            {/* Session info card */}
            <Card className="absolute bottom-6 right-6 w-64 bg-white/80 backdrop-blur-sm border-white/50 dark:bg-gray-800/90 dark:border-gray-700/50">
              <CardContent className="p-4">
                <h3 className="font-medium text-sm text-foreground mb-2">Today's Session</h3>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>0:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-therapy-green">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      </SidebarProvider>
    </RoomContext.Provider>
  );
};

export default TherapyInterface;
