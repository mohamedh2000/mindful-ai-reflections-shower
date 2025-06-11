import React, { useState } from 'react';
import { Calendar, Clock, TrendingUp, Heart, ChevronRight } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import OverviewCard from './SessionDashboardComp/OverviewCard';
import PastEntryCard from './SessionDashboardComp/PastEntryCard';

// Mock data for past sessions
const pastSessionsMock = [
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
  },
  {
    id: 5,
    date: '2024-06-03',
    duration: '41 min',
    mood: 'Positive',
    topics: ['Progress review', 'Mindfulness']
  },
  {
    id: 6,
    date: '2024-06-03',
    duration: '41 min',
    mood: 'Positive',
    topics: ['Progress review', 'Mindfulness']
  },
  {
    id: 7,
    date: '2024-06-03',
    duration: '41 min',
    mood: 'Positive',
    topics: ['Progress review', 'Mindfulness']
  }, 
  {
    id: 8,
    date: '2024-06-03',
    duration: '41 min',
    mood: 'Positive',
    topics: ['Progress review', 'Mindfulness']
  }
];

const SessionDashboard: React.FC = () => {

  const [pastSessions, setPastSessions] = useState(pastSessionsMock);

  return (
    <Sidebar style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-therapy-blue" />
          <h2 className="text-lg font-semibold text-foreground">Session History</h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        {/* Session Stats */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <div className="grid grid-cols-1 gap-3">

              <OverviewCard icon={<Calendar className="w-4 h-4 text-therapy-blue" />} metric="Total Sessions" value="12" />
              <OverviewCard icon={<Clock className="w-4 h-4 text-therapy-purple" />} metric="This Week" value="3" />
              <OverviewCard icon={<TrendingUp className="w-4 h-4 text-therapy-green" />} metric="Progress" value="Improving" />

            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Sessions */}
        <SidebarGroup style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <SidebarGroupLabel>Recent Sessions</SidebarGroupLabel>
          <SidebarGroupContent style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <SidebarMenu>
                {pastSessions.map((session) => (
                  <PastEntryCard session={session} />
                ))}
              </SidebarMenu>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SessionDashboard;