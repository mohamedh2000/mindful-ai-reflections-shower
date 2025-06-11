
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Brain, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLogin = useRef(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
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
          <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-therapy-blue to-therapy-purple bg-clip-text text-transparent">
            MindSpace AI
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Your personal AI therapist companion. A safe space for growth and healing.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-therapy-blue/30 focus:border-therapy-blue focus:ring-therapy-blue/20"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-therapy-blue/30 focus:border-therapy-blue focus:ring-therapy-blue/20"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full therapy-gradient hover:opacity-90 transition-opacity text-white font-medium py-3"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => isLogin.current = !isLogin.current}
              className="text-sm text-therapy-blue hover:text-therapy-purple transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground pt-4">
            <Heart className="w-4 h-4 text-therapy-pink" />
            <span>Safe, confidential, and judgment-free</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
