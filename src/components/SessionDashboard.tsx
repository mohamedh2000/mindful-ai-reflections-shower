
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
import SessionDetailsModal from './SessionDetailsModal';

type SessionData = {
  id: string;
  session_date: string;
  total_time_minutes: number;
  session_rating: string;
  session_summary: string;
  session_transcript: string;
  embedding: string;
}

interface SessionDashboardProps {
  sessionData: SessionData[];
}

const SessionDashboard: React.FC<SessionDashboardProps> = ({ sessionData = [] }) => {
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSessionClick = (session: SessionData) => {
    setSelectedSession(session);
    setModalOpen(true);
  };

  return (
    <>
      <Sidebar style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <SidebarHeader className="p-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-black dark:text-white" fill="black dark:fill-white" />
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
                  {sessionData.map((session) => (
                    <PastEntryCard 
                      key={session.id} 
                      session={session} 
                      onSessionClick={handleSessionClick}
                    />
                  ))}
                </SidebarMenu>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SessionDetailsModal 
        session={selectedSession}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
};

export default SessionDashboard;
