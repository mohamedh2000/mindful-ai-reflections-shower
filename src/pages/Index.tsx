
import React, { useState } from 'react';
import LoginScreen from '@/components/LoginScreen';
import TherapyInterface from '@/components/TherapyInterface';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <TherapyInterface onLogout={handleLogout} />
      )}
    </>
  );
};

export default Index;
