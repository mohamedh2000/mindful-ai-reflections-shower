
import { ChevronRight } from 'lucide-react';
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

type Session = {
  id: string;
  session_date: string;
  total_time_minutes: number;
  session_rating: string;
  session_summary: string;
  session_transcript: string;
  embedding: string;
}

interface PastEntryCardProps {
  session: Session;
  onSessionClick: (session: Session) => void;
}

const PastEntryCard: React.FC<PastEntryCardProps> = ({ session, onSessionClick }) => {
    // The summary comes in as a string like "{"summary one","summary two"}"
    // We need to parse it into an array.
    const summaryList = session.session_summary
      ? session.session_summary.replace(/[{}"']/g, '').split(',')
      : [];

    return (
        <SidebarMenuItem key={session.id}>
        <SidebarMenuButton 
          className="h-auto p-3 cursor-pointer hover:bg-accent"
          onClick={() => onSessionClick(session)}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">
                {new Date(session.session_date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
              <span className="text-xs text-muted-foreground">{session.total_time_minutes} min</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs px-2 py-1 rounded-full ${
                session.session_rating === 'positive' ? 'bg-therapy-green/20 text-therapy-green' :
                session.session_rating === 'neutral' ? 'bg-therapy-blue/20 text-therapy-blue' :
                'bg-therapy-orange/20 text-therapy-orange'
              }`}>
                {session.session_rating}
              </span>
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {summaryList.join(', ')}
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
}

export default PastEntryCard;
