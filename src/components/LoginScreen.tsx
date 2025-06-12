import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Sparkles } from 'lucide-react';
import { GoogleOneTap, useSignIn, useSignUp } from '@clerk/clerk-react';
import { FaApple } from "react-icons/fa";

const LoginScreen = () => {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  const handleGoogle = () => {
    if (mode === 'sign-in') {
      signIn?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: '/home',
        redirectUrlComplete: '/home'
      });
    } else {
      signUp?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: '/home',
        redirectUrlComplete: '/home'
      });
    }
  };

  const handleApple = () => {
    if (mode === 'sign-in') {
      signIn?.authenticateWithRedirect({
        strategy: "oauth_apple",
        redirectUrl: '/home',
        redirectUrlComplete: '/home'
      });
    } else {
      signUp?.authenticateWithRedirect({
        strategy: "oauth_apple",
        redirectUrl: '/home',
        redirectUrlComplete: '/home'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-particle animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              background: `hsl(${217 + Math.random() * 100}, ${60 + Math.random() * 30}%, ${60 + Math.random() * 20}%)`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-white/50 shadow-2xl animate-slide-up">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="p-3 rounded-full therapy-gradient">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <Sparkles className="w-6 h-6 text-therapy-purple animate-pulse-soft" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            MindSpace AI
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Your personal AI therapist companion. A safe space for growth and healing.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4">
            <button
              onClick={handleApple}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-md bg-black text-white font-semibold hover:bg-gray-900 transition"
            >
              <FaApple className="w-5 h-5 text-white" />
              {mode === 'sign-in' ? 'Sign in with Apple' : 'Sign up with Apple'}
            </button>
            <button
              onClick={handleGoogle}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-md border border-gray-300 bg-white text-black font-semibold hover:bg-gray-100 transition"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <g>
                    <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.48a4.68 4.68 0 01-2.03 3.07v2.55h3.28c1.92-1.77 3.03-4.38 3.03-7.41z" fill="#4285F4" />
                    <path d="M10 20c2.7 0 4.97-.89 6.63-2.41l-3.28-2.55c-.91.61-2.07.97-3.35.97-2.57 0-4.75-1.74-5.53-4.07H1.09v2.56A9.99 9.99 0 0010 20z" fill="#34A853" />
                    <path d="M4.47 12.94A5.99 5.99 0 014.09 10c0-.51.09-1.01.18-1.49V5.95H1.09A9.99 9.99 0 000 10c0 1.64.39 3.19 1.09 4.55l3.38-2.61z" fill="#FBBC05" />
                    <path d="M10 4.01c1.47 0 2.78.51 3.81 1.51l2.85-2.85C14.97 1.11 12.7 0 10 0A9.99 9.99 0 001.09 5.95l3.38 2.56C5.25 5.75 7.43 4.01 10 4.01z" fill="#EA4335" />
                  </g>
                </svg>
              </span>
              {mode === 'sign-in' ? 'Sign in with Google' : 'Sign up with Google'}
            </button>
            <GoogleOneTap />
          </div>
          <div className="text-center mt-4">
            {mode === 'sign-in' ? (
              <button
                className="text-therapy-purple underline hover:text-therapy-purple-dark transition-colors"
                onClick={() => setMode('sign-up')}
              >
                Don't have an account? Sign up
              </button>
            ) : (
              <button
                className="text-therapy-purple underline hover:text-therapy-purple-dark transition-colors"
                onClick={() => setMode('sign-in')}
              >
                Already have an account? Sign in
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
