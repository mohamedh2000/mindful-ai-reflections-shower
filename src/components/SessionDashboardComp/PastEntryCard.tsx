import { ChevronRight } from 'lucide-react';
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
const PastEntryCard = ({session}) => {
    return (
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
    )
}

export default PastEntryCard;