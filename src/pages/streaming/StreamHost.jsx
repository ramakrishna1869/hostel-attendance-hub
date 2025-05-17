import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, MicOff, Video, VideoOff, ScreenShare, MessageSquare, Record, Users } from 'lucide-react';
import StreamChat from '@/components/streaming/StreamChat';
import StreamViewers from '@/components/streaming/StreamViewers';

const StreamHost = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const localVideoRef = useRef(null);
  const streamRef = useRef(null);
  
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [streamControls, setStreamControls] = useState({
    video: true,
    audio: true,
    screenShare: false,
    recording: false
  });
  const [viewerCount, setViewerCount] = useState(0);
  const [streamUrl, setStreamUrl] = useState('');
  
  // Check if user is logged in and is host
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'admin') {
      navigate('/');
      return;
    }
    
    // Get session data (in a real app, this would be from an API)
    const allSessions = JSON.parse(localStorage.getItem('streamingSessions') || '[]');
    const currentSession = allSessions.find(s => s.id === sessionId);
    
    if (!currentSession) {
      setError('Session not found');
      setIsLoading(false);
      return;
    }
    
    setSession(currentSession);
    setStreamUrl(`${window.location.origin}/streams/view/${sessionId}`);
    setIsLoading(false);
    
    // Simulate viewers joining
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const randomChange = Math.random() > 0.7 ? 1 : 0;
        return prev + randomChange;
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, [navigate, sessionId]);
  
  // Initialize webcam when component mounts
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const constraints = {
          audio: true,
          video: true
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        toast({
          title: "Stream started",
          description: "Your webcam and microphone are now active."
        });
      } catch (err) {
        console.error("Error accessing media devices:", err);
        toast({
          variant: "destructive",
          title: "Failed to start stream",
          description: err.message || "Could not access camera or microphone."
        });
      }
    };
    
    if (!isLoading && !error) {
      startWebcam();
    }
    
    // Cleanup function to stop all tracks when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isLoading, error, toast]);
  
  const toggleVideo = async () => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      
      setStreamControls(prev => ({
        ...prev,
        video: !prev.video
      }));
    }
  };
  
  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      
      setStreamControls(prev => ({
        ...prev,
        audio: !prev.audio
      }));
    }
  };
  
  const toggleScreenShare = async () => {
    // If currently screen sharing, switch back to camera
    if (streamControls.screenShare) {
      try {
        const constraints = {
          audio: true,
          video: true
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        // Stop current stream tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        streamRef.current = stream;
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        setStreamControls(prev => ({
          ...prev,
          screenShare: false
        }));
      } catch (err) {
        console.error("Error switching to camera:", err);
        toast({
          variant: "destructive",
          title: "Failed to switch to camera",
          description: err.message || "Could not access camera."
        });
      }
    } else {
      // Switch to screen share
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: streamControls.audio
        });
        
        // Stop current stream video tracks
        if (streamRef.current) {
          streamRef.current.getVideoTracks().forEach(track => track.stop());
        }
        
        // Keep audio tracks from original stream if they exist
        const audioTracks = streamRef.current ? streamRef.current.getAudioTracks() : [];
        
        // Combine screen share video with original audio
        const combinedStream = new MediaStream([
          ...stream.getVideoTracks(),
          ...audioTracks
        ]);
        
        streamRef.current = combinedStream;
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = combinedStream;
        }
        
        // Handle user ending screen share
        stream.getVideoTracks()[0].onended = () => {
          toggleScreenShare();
        };
        
        setStreamControls(prev => ({
          ...prev,
          screenShare: true
        }));
      } catch (err) {
        console.error("Error sharing screen:", err);
        toast({
          variant: "destructive",
          title: "Failed to share screen",
          description: err.message || "Could not access screen sharing."
        });
      }
    }
  };
  
  const toggleRecording = () => {
    setStreamControls(prev => ({
      ...prev,
      recording: !prev.recording
    }));
    
    if (!streamControls.recording) {
      toast({
        title: "Recording started",
        description: "Your stream is now being recorded."
      });
    } else {
      toast({
        title: "Recording stopped",
        description: "Your recording has been saved."
      });
    }
  };
  
  const copyStreamUrl = () => {
    navigator.clipboard.writeText(streamUrl).then(() => {
      toast({
        title: "Link copied!",
        description: "Stream link copied to clipboard."
      });
    });
  };
  
  const endStream = () => {
    // In a real app, you would call an API to end the stream
    
    // Stop all media tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    toast({
      title: "Stream ended",
      description: "Your streaming session has ended."
    });
    
    // Navigate back to create screen
    navigate('/streams/create');
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Loading Stream...</h2>
            <div className="animate-pulse">Setting up your streaming session</div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
            <p>{error}</p>
            <Button className="mt-4" onClick={() => navigate('/streams/create')}>
              Back to Sessions
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{session.title}</h1>
            <p className="text-gray-500">{session.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <Users className="w-4 h-4 mr-1 text-primary" />
              <span className="text-sm font-medium">{viewerCount} Viewers</span>
            </div>
            
            <div className="flex items-center">
              {streamControls.recording && (
                <div className="flex items-center bg-red-100 text-red-500 px-3 py-1 rounded-full mr-2">
                  <Record className="w-4 h-4 mr-1 animate-pulse" />
                  <span className="text-sm font-medium">Recording</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <video 
                    ref={localVideoRef}
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full bg-black"
                  />
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    <Button 
                      variant={streamControls.video ? "default" : "destructive"} 
                      size="icon" 
                      onClick={toggleVideo}
                    >
                      {streamControls.video ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </Button>
                    
                    <Button 
                      variant={streamControls.audio ? "default" : "destructive"} 
                      size="icon" 
                      onClick={toggleAudio}
                    >
                      {streamControls.audio ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                    </Button>
                    
                    <Button 
                      variant={streamControls.screenShare ? "default" : "outline"} 
                      size="icon" 
                      onClick={toggleScreenShare}
                    >
                      <ScreenShare className="h-5 w-5" />
                    </Button>
                    
                    <Button 
                      variant={streamControls.recording ? "destructive" : "outline"} 
                      size="icon" 
                      onClick={toggleRecording}
                    >
                      <Record className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={copyStreamUrl}>
                  Copy Stream Link
                </Button>
                <div className="text-sm text-gray-500 hidden md:block">
                  {streamUrl}
                </div>
              </div>
              
              <Button variant="destructive" onClick={endStream}>
                End Stream
              </Button>
            </div>
          </div>
          
          <div>
            <Tabs defaultValue="chat">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="chat" className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="viewers" className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Viewers
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="mt-2 h-[500px]">
                <StreamChat sessionId={sessionId} isHost={true} />
              </TabsContent>
              
              <TabsContent value="viewers" className="mt-2 h-[500px]">
                <StreamViewers sessionId={sessionId} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StreamHost;
