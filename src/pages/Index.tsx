import React, { useState } from 'react';
import LoginScreen from '@/components/LoginScreen';
import TherapyInterface from '@/components/TherapyInterface';
import { RoomProvider } from '@/context/RoomContext';
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { useUser } from "@clerk/clerk-react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isSignedIn, isLoaded, user } = useUser();
  console.log("isSignedIn:", isSignedIn, "isLoaded:", isLoaded, "user:", user);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Room disconnect logic should be handled inside TherapyInterface or via context-aware logout
  };

  return (
      <RoomProvider>
        <SignedIn>
          <TherapyInterface onLogout={handleLogout} />
        </SignedIn>
        <SignedOut>
          <LoginScreen  />
        </SignedOut>
      </RoomProvider>
    

  );
};

export default Index;
