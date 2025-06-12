import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, RedirectToSignUp, useUser, AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import LoginScreen from "@/components/LoginScreen";
import TherapyInterface from "@/components/TherapyInterface";
import { RoomProvider } from "@/context/RoomContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RoomProvider>
        <BrowserRouter>
            <Routes>
              {/* Public route */}
              <Route
                path="/"
                element={
                  <>
                    <SignedOut>
                      <LoginScreen />
                    </SignedOut>
                    <SignedIn>
                      <Navigate to="/home" />
                    </SignedIn>
                  </>
                }
              />
              {/* Protected route */}
              <Route
                path="/home"
                element={
                  <>
                    <SignedIn>
                      <TherapyInterface onLogout={() => {}} />
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/" />
                    </SignedOut>
                  </>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </RoomProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
