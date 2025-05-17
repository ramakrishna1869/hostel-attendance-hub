
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const StreamSessionsList = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  
  // Load sessions data
  useEffect(() => {
    const storedSessions = JSON.parse(localStorage.getItem('streamingSessions') || '[]');
    
    if (storedSessions.length === 0) {
      // Create sample sessions for demo
      const sampleSessions = [
        {
          id: 'stream-sample-1',
          title: 'Hostel Rules and Regulations',
          description: 'Important information for all students',
          hostId: 'admin@example.com',
          hostName: 'Admin User',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          status: 'ended',
          viewerCount: 45,
          duration: '45 minutes'
        },
        {
          id: 'stream-sample-2',
          title: 'Semester Schedule Discussion',
          description: 'Updates on the upcoming semester schedule',
          hostId: 'admin@example.com',
          hostName: 'Admin User',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          status: 'ended',
          viewerCount: 32,
          duration: '30 minutes'
        }
      ];
      
      setSessions(sampleSessions);
      localStorage.setItem('streamingSessions', JSON.stringify(sampleSessions));
    } else {
      setSessions(storedSessions);
    }
  }, []);
  
  const continueSession = (sessionId) => {
    navigate(`/streams/host/${sessionId}`);
  };
  
  const viewRecording = (sessionId) => {
    // In a real app, this would navigate to a recording playback page
    navigate(`/streams/view/${sessionId}`);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {sessions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No previous sessions found
          </div>
        ) : (
          sessions.map((session) => (
            <div 
              key={session.id}
              className="border rounded-md p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{session.title}</h3>
                  <p className="text-sm text-gray-500">{session.description}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <p className="text-xs text-gray-500">
                      {formatDate(session.createdAt)}
                    </p>
                    <Badge variant={session.status === 'active' ? 'default' : 'secondary'}>
                      {session.status === 'active' ? 'Active' : 'Ended'}
                    </Badge>
                    <p className="text-xs text-gray-500">
                      {session.viewerCount} viewers
                    </p>
                    {session.duration && (
                      <p className="text-xs text-gray-500">
                        {session.duration}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  {session.status === 'active' ? (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => continueSession(session.id)}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => viewRecording(session.id)}
                    >
                      View Recording
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default StreamSessionsList;
