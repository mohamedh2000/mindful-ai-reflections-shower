
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Clock, FileText } from 'lucide-react';

type Session = {
  id: string;
  session_date: string;
  total_time_minutes: number;
  session_rating: string;
  session_summary: string;
  session_transcript: string;
  embedding: string;
}

interface SessionDetailsModalProps {
  session: Session | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SessionDetailsModal: React.FC<SessionDetailsModalProps> = ({
  session,
  open,
  onOpenChange,
}) => {
  if (!session) return null;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins} minutes`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Session Details</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Session Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-therapy-blue" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">
                  {new Date(session.session_date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-therapy-purple" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{formatDuration(session.total_time_minutes)}</p>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Session Rating:</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              session.session_rating === 'positive' ? 'bg-therapy-green/20 text-therapy-green' :
              session.session_rating === 'neutral' ? 'bg-therapy-blue/20 text-therapy-blue' :
              'bg-therapy-orange/20 text-therapy-orange'
            }`}>
              {session.session_rating}
            </span>
          </div>

          {/* Transcript */}
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Session Transcript</h3>
            <ScrollArea className="h-64 w-full rounded-md border p-4">
              <div className="whitespace-pre-wrap text-sm text-muted-foreground">
                {session.session_transcript || 'No transcript available for this session.'}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SessionDetailsModal;
