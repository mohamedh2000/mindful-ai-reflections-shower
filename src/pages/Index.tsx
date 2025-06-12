import React, { useState } from 'react';
import LoginScreen from '@/components/LoginScreen';
import TherapyInterface from '@/components/TherapyInterface';
import { RoomProvider } from '@/context/RoomContext';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Room disconnect logic should be handled inside TherapyInterface or via context-aware logout
  };

  return (
    <RoomProvider>
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <TherapyInterface onLogout={handleLogout} />
      )}
    </RoomProvider>
  );
};

export default Index;
