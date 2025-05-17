
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video } from 'lucide-react';
import StreamSessionsList from '@/components/streaming/StreamSessionsList';

const CreateStreamSession = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');
  
  // Check if user is logged in as admin
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
  }, [navigate]);
  
  const handleCreateSession = () => {
    if (!sessionTitle.trim()) {
      toast({
        variant: "destructive",
        title: "Session title is required",
        description: "Please provide a title for your streaming session."
      });
      return;
    }
    
    setIsLoading(true);
    
    // Generate a unique session ID (in a real app, this would come from the backend)
    const sessionId = `stream-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    // Simulate API call to create a session
    setTimeout(() => {
      // In a real app, you would call an API to create the session and store it in the database
      
      // Store session data in localStorage for demo purposes
      const existingSessions = JSON.parse(localStorage.getItem('streamingSessions') || '[]');
      const userData = JSON.parse(localStorage.getItem('user'));
      
      const newSession = {
        id: sessionId,
        title: sessionTitle,
        description: sessionDescription || 'No description provided',
        hostId: userData.email,
        hostName: userData.name,
        createdAt: new Date().toISOString(),
        status: 'active',
        viewerCount: 0,
        viewers: []
      };
      
      existingSessions.push(newSession);
      localStorage.setItem('streamingSessions', JSON.stringify(existingSessions));
      
      toast({
        title: "Session created successfully",
        description: "Your streaming session has been created."
      });
      
      setIsLoading(false);
      navigate(`/streams/host/${sessionId}`);
    }, 1000);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Live Streaming Sessions</h1>
        </div>
        
        <Tabs defaultValue="create">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="create">Create New Session</TabsTrigger>
            <TabsTrigger value="sessions">Previous Sessions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-6 w-6" />
                  Create New Streaming Session
                </CardTitle>
                <CardDescription>
                  Create a new live streaming session for students and hostel staff
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTitle">Session Title</Label>
                  <Input
                    id="sessionTitle"
                    placeholder="Enter a title for your session"
                    value={sessionTitle}
                    onChange={(e) => setSessionTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionDescription">Session Description (Optional)</Label>
                  <Input
                    id="sessionDescription"
                    placeholder="Enter a description for your session"
                    value={sessionDescription}
                    onChange={(e) => setSessionDescription(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    After creating a session, you'll be able to:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                    <li>Share your webcam and screen</li>
                    <li>Chat with viewers in real-time</li>
                    <li>Record your session</li>
                    <li>Moderate viewers</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleCreateSession} 
                  disabled={isLoading || !sessionTitle.trim()}
                >
                  {isLoading ? 'Creating Session...' : 'Create & Start Streaming'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="sessions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Previous Sessions</CardTitle>
                <CardDescription>
                  Review and manage your previous streaming sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StreamSessionsList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CreateStreamSession;
