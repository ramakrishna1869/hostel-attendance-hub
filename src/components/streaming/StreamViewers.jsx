
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { TrashIcon } from 'lucide-react';

const StreamViewers = ({ sessionId }) => {
  const [viewers, setViewers] = useState([]);
  const { toast } = useToast();
  
  // Load viewers data
  useEffect(() => {
    // In a real app, this would come from an API or WebSocket
    const allSessions = JSON.parse(localStorage.getItem('streamingSessions') || '[]');
    const currentSession = allSessions.find(s => s.id === sessionId);
    
    if (currentSession && currentSession.viewers) {
      setViewers(currentSession.viewers);
    } else {
      // Generate sample viewers for demo
      const sampleViewers = [
        { id: 'v1', name: 'Rahul Sharma', joinedAt: new Date().toISOString() },
        { id: 'v2', name: 'Priya Patel', joinedAt: new Date().toISOString() },
        { id: 'v3', name: 'Anjali Singh', joinedAt: new Date().toISOString() },
      ];
      
      setViewers(sampleViewers);
      
      // Save to localStorage
      const allSessions = JSON.parse(localStorage.getItem('streamingSessions') || '[]');
      const sessionIndex = allSessions.findIndex(s => s.id === sessionId);
      
      if (sessionIndex !== -1) {
        allSessions[sessionIndex].viewers = sampleViewers;
        allSessions[sessionIndex].viewerCount = sampleViewers.length;
        localStorage.setItem('streamingSessions', JSON.stringify(allSessions));
      }
    }
  }, [sessionId]);
  
  const removeViewer = (viewerId) => {
    // Filter out the removed viewer
    const updatedViewers = viewers.filter(viewer => viewer.id !== viewerId);
    setViewers(updatedViewers);
    
    // Update in localStorage
    const allSessions = JSON.parse(localStorage.getItem('streamingSessions') || '[]');
    const sessionIndex = allSessions.findIndex(s => s.id === sessionId);
    
    if (sessionIndex !== -1) {
      allSessions[sessionIndex].viewers = updatedViewers;
      allSessions[sessionIndex].viewerCount = updatedViewers.length;
      localStorage.setItem('streamingSessions', JSON.stringify(allSessions));
    }
    
    toast({
      title: "Viewer removed",
      description: "The viewer has been removed from the stream."
    });
  };
  
  return (
    <div className="h-full">
      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          {viewers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No viewers yet
            </div>
          ) : (
            viewers.map((viewer) => (
              <div 
                key={viewer.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
              >
                <div>
                  <p className="font-medium">{viewer.name}</p>
                  <p className="text-xs text-gray-500">
                    Joined {new Date(viewer.joinedAt).toLocaleTimeString()}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeViewer(viewer.id)}
                  title="Remove viewer"
                >
                  <TrashIcon className="h-4 w-4 text-gray-500 hover:text-red-500" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StreamViewers;
