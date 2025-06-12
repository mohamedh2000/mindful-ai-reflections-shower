import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { RoomProvider } from '@/context/RoomContext';
import App from "./App";
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RoomProvider>
      <App />
    </RoomProvider>
  </ClerkProvider>
);
