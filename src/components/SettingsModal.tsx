import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, CreditCard, Palette, Shield, Bell, Mic, Volume2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useThemeColor } from '@/context/ThemeColorContext';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { themeColor, setThemeColor } = useThemeColor();

  const sidebarItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'payment', label: 'Payment Management', icon: CreditCard },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'audio', label: 'Audio Settings', icon: Volume2 },
  ];

  const themeColors = [
    { name: 'purple', style: { backgroundColor: 'hsl(280, 60%, 70%)' }, label: 'Purple' },
    { name: 'blue', style: { backgroundColor: 'hsl(217, 91%, 60%)' }, label: 'Blue' },
    { name: 'green', style: { backgroundColor: 'hsl(160, 60%, 65%)' }, label: 'Green' },
    { name: 'pink', style: { backgroundColor: 'hsl(320, 70%, 75%)' }, label: 'Pink' },
    { name: 'orange', style: { backgroundColor: 'hsl(35, 85%, 70%)' }, label: 'Orange' },
    { name: 'teal', style: { backgroundColor: 'hsl(180, 65%, 60%)' }, label: 'Teal' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'appearance':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Dark Mode</label>
                  <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                </div>
                <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
              </div>
              <Separator />
              <div>
                <label className="font-medium">Theme Color</label>
                <p className="text-sm text-muted-foreground mb-3">Choose your preferred accent color</p>
                <div className="flex gap-3 flex-wrap">
                  {themeColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setThemeColor(color.name as any)}
                      className={`w-10 h-10 rounded-full cursor-pointer border-4 transition-all hover:scale-110 ${
                        themeColor === color.name 
                          ? 'border-foreground shadow-lg' 
                          : 'border-white dark:border-gray-700 shadow-md'
                      }`}
                      style={color.style}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Display Name</label>
                <input 
                  type="text" 
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Therapy Goals</label>
                <textarea 
                  className="w-full mt-1 px-3 py-2 border rounded-md h-24"
                  placeholder="What would you like to work on?"
                />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        );

      case 'payment':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">Current Plan</h4>
                <p className="text-sm text-muted-foreground">Free Plan - 3 sessions remaining</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Payment Method</h4>
                <div className="p-3 border rounded-md flex items-center justify-between">
                  <span className="text-sm">•••• •••• •••• 4242</span>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Billing History</h4>
                <div className="text-sm text-muted-foreground">
                  No billing history available
                </div>
              </div>
              <Button className="w-full">Upgrade Plan</Button>
            </CardContent>
          </Card>
        );

      case 'privacy':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Data Encryption</label>
                    <p className="text-sm text-muted-foreground">All conversations are encrypted</p>
                  </div>
                  <span className="text-therapy-green text-sm">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Session Recording</label>
                    <p className="text-sm text-muted-foreground">Record sessions for analysis</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Anonymous Mode</label>
                    <p className="text-sm text-muted-foreground">Hide identifying information</p>
                  </div>
                  <Switch />
                </div>
              </div>
              <Separator />
              <Button variant="outline" className="w-full">Download My Data</Button>
              <Button variant="destructive" className="w-full">Delete Account</Button>
            </CardContent>
          </Card>
        );

      case 'notifications':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Session Reminders</label>
                  <p className="text-sm text-muted-foreground">Get reminded about upcoming sessions</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Progress Updates</label>
                  <p className="text-sm text-muted-foreground">Weekly progress summaries</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Tips & Insights</label>
                  <p className="text-sm text-muted-foreground">Helpful mental health tips</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        );

      case 'audio':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Audio Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Microphone</label>
                  <p className="text-sm text-muted-foreground">Enable voice input</p>
                </div>
                <Switch checked={micEnabled} onCheckedChange={setMicEnabled} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Audio Output</label>
                  <p className="text-sm text-muted-foreground">Enable AI voice responses</p>
                </div>
                <Switch checked={audioEnabled} onCheckedChange={setAudioEnabled} />
              </div>
              <div>
                <label className="font-medium">Voice Speed</label>
                <input type="range" className="w-full mt-2" min="0.5" max="2" step="0.1" defaultValue="1" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>
              <div>
                <label className="font-medium">Audio Quality</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-md">
                  <option>High (48kHz)</option>
                  <option>Medium (44kHz)</option>
                  <option>Low (22kHz)</option>
                </select>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogHeader className="px-6 py-3 border-b">
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r bg-muted/30 p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
