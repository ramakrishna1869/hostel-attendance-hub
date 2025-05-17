
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Users, MessageSquare } from 'lucide-react';
import StreamChat from '@/components/streaming/StreamChat';

const StreamView = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const remoteVideoRef = useRef(null);
  
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewerCount, setViewerCount] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(true);
  const [viewerName, setViewerName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  
  // Check if session exists
  useEffect(() => {
    // Get session data (in a real app, this would be from an API)
    const allSessions = JSON.parse(localStorage.getItem('streamingSessions') || '[]');
    const currentSession = allSessions.find(s => s.id === sessionId);
    
    if (!currentSession) {
      setError('Session not found or has ended');
      setIsLoading(false);
      return;
    }
    
    setSession(currentSession);
    setViewerCount(currentSession.viewerCount || 0);
    setIsLoading(false);
    
    // Simulate getting stream from host (in a real app, this would use WebRTC)
    const interval = setInterval(() => {
      const newCount = Math.floor(Math.random() * 5) + 1;
      setViewerCount(newCount);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [sessionId]);
  
  const joinAsViewer = () => {
    if (!viewerName.trim()) {
      toast({
        variant: "destructive",
        title: "Name required",
        description: "Please enter your name to join the stream."
      });
      return;
    }
    
    // In a real app, you would call an API to join the session
    setHasJoined(true);
    setJoinDialogOpen(false);
    
    // Add viewer to session
    const allSessions = JSON.parse(localStorage.getItem('streamingSessions') || '[]');
    const sessionIndex = allSessions.findIndex(s => s.id === sessionId);
    
    if (sessionIndex !== -1) {
      allSessions[sessionIndex].viewerCount = (allSessions[sessionIndex].viewerCount || 0) + 1;
      allSessions[sessionIndex].viewers = [
        ...(allSessions[sessionIndex].viewers || []),
        {
          id: `viewer-${Date.now()}`,
          name: viewerName,
          joinedAt: new Date().toISOString()
        }
      ];
      
      localStorage.setItem('streamingSessions', JSON.stringify(allSessions));
      
      toast({
        title: "Joined stream",
        description: `You've joined as ${viewerName}`
      });
    }
  };
  
  const toggleChat = () => {
    setShowChat(prev => !prev);
  };
  
  const leaveStream = () => {
    // In a real app, you would call an API to leave the session
    
    toast({
      title: "Left stream",
      description: "You've left the streaming session."
    });
    
    navigate('/dashboard');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading Stream...</h2>
          <div className="animate-pulse">Connecting to the streaming session</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
          <p>{error}</p>
          <Button className="mt-4" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Stream as Viewer</DialogTitle>
            <DialogDescription>
              Enter your name to join "{session.title}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Input
              placeholder="Enter your name"
              value={viewerName}
              onChange={(e) => setViewerName(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button onClick={joinAsViewer}>Join Stream</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-white border-b py-4 px-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">{session.title}</h1>
              <p className="text-sm text-gray-500">Hosted by {session.hostName}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <Users className="w-4 h-4 mr-1 text-primary" />
                <span className="text-sm font-medium">{viewerCount} Viewers</span>
              </div>
              
              <Button variant="outline" onClick={toggleChat} className="md:hidden">
                <MessageSquare className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" onClick={leaveStream}>
                Leave
              </Button>
            </div>
          </div>
        </header>
        
        <div className="flex-1 flex flex-col md:flex-row p-4 gap-4">
          <div className="flex-1">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <video 
                    ref={remoteVideoRef}
                    className="w-full h-full bg-black"
                    poster="/placeholder.svg"
                  />
                  
                  {!hasJoined && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <Button onClick={() => setJoinDialogOpen(true)}>
                        Join Stream
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Chat sidebar - hidden on mobile unless toggled */}
          <div className={`w-full md:w-80 ${showChat ? 'block' : 'hidden md:block'}`}>
            <Card className="h-full">
              <CardContent className="p-4 h-full">
                <div className="flex flex-col h-full">
                  <h3 className="font-medium mb-2">Live Chat</h3>
                  {hasJoined ? (
                    <StreamChat sessionId={sessionId} isHost={false} viewerName={viewerName} />
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-gray-500 text-center">
                        Join the stream to participate in chat
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default StreamView;
