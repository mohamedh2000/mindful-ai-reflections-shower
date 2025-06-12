// src/context/RoomContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Room } from 'livekit-client';

type RoomContextType = {
  room: Room | null;
  setRoom: React.Dispatch<React.SetStateAction<Room | null>>;
};

export const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRoom = () => {
  const ctx = useContext(RoomContext);
  if (!ctx) throw new Error("useRoom must be used within a RoomProvider");
  return ctx;
};

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [room, setRoom] = useState<Room | null>(null);
  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};