
import React from 'react';
import { Calendar, Clock, TrendingUp, Heart, ChevronRight } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for past sessions
const pastSessions = [
  {
    id: 1,
    date: '2024-06-10',
    duration: '45 min',
    mood: 'Positive',
    topics: ['Anxiety', 'Work stress']
  },
  {
    id: 2,
    date: '2024-06-08',
    duration: '38 min',
    mood: 'Neutral',
    topics: ['Sleep issues', 'Goals']
  },
  {
    id: 3,
    date: '2024-06-05',
    duration: '52 min',
    mood: 'Challenging',
    topics: ['Relationships', 'Self-care']
  },
  {
    id: 4,
    date: '2024-06-03',
    duration: '41 min',
    mood: 'Positive',
    topics: ['Progress review', 'Mindfulness']
  }
];

const SessionDashboard: React.FC = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-therapy-blue" />
          <h2 className="text-lg font-semibold text-foreground">Session History</h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Session Stats */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <div className="grid grid-cols-1 gap-3">
              <Card className="bg-therapy-gradient-soft border-none">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-therapy-blue" />
                    <div>
                      <p className="text-xs text-muted-foreground">Total Sessions</p>
                      <p className="text-lg font-semibold text-foreground">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-therapy-gradient-soft border-none">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-therapy-purple" />
                    <div>
                      <p className="text-xs text-muted-foreground">This Week</p>
                      <p className="text-lg font-semibold text-foreground">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-therapy-gradient-soft border-none">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-therapy-green" />
                    <div>
                      <p className="text-xs text-muted-foreground">Progress</p>
                      <p className="text-lg font-semibold text-therapy-green">Improving</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Sessions */}
        <SidebarGroup>
          <SidebarGroupLabel>Recent Sessions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pastSessions.map((session) => (
                <SidebarMenuItem key={session.id}>
                  <SidebarMenuButton className="h-auto p-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">
                          {new Date(session.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="text-xs text-muted-foreground">{session.duration}</span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          session.mood === 'Positive' ? 'bg-therapy-green/20 text-therapy-green' :
                          session.mood === 'Neutral' ? 'bg-therapy-blue/20 text-therapy-blue' :
                          'bg-therapy-orange/20 text-therapy-orange'
                        }`}>
                          {session.mood}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {session.topics.join(', ')}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SessionDashboard;
