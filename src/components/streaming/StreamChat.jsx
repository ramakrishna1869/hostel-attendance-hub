
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

const StreamChat = ({ sessionId, isHost, viewerName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef(null);
  const { toast } = useToast();
  
  // Load initial chat messages and simulate real-time updates
  useEffect(() => {
    // In a real app, you would use socket.io to get real-time messages
    
    // Get initial messages from localStorage for demo
    const allSessions = JSON.parse(localStorage.getItem('streamingSessions') || '[]');
    const currentSession = allSessions.find(s => s.id === sessionId);
    
    if (currentSession && currentSession.messages) {
      setMessages(currentSession.messages);
    } else {
      // Add welcome message
      const initialMessages = [
        {
          id: 'system-1',
          sender: 'System',
          text: 'Welcome to the live stream! Please keep the chat respectful.',
          timestamp: new Date().toISOString(),
          type: 'system'
        }
      ];
      
      setMessages(initialMessages);
      
      // Save to localStorage
      const allSessions = JSON.parse(localStorage.getItem('streamingSessions') || '[]');
      const sessionIndex = allSessions.findIndex(s => s.id === sessionId);
      
      if (sessionIndex !== -1) {
        allSessions[sessionIndex].messages = initialMessages;
        localStorage.setItem('streamingSessions', JSON.stringify(allSessions));
      }
    }
    
    // Simulate other people chatting
    if (!isHost) {
      const chatInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          const randomNames = ['Rahul', 'Priya', 'Anjali', 'Karthik', 'Deepak'];
          const randomMessages = [
            'Great stream!',
            'Can you explain that again?',
            'This is so helpful, thank you!',
            'Is this being recorded?',
            'When is the next stream?'
          ];
          
          const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
          const randomText = randomMessages[Math.floor(Math.random() * randomMessages.length)];
          
          addMessageToChat({
            id: `auto-${Date.now()}`,
            sender: randomName,
            text: randomText,
            timestamp: new Date().toISOString(),
            type: 'user'
          });
        }
      }, 15000);
      
      return () => clearInterval(chatInterval);
    }
  }, [sessionId, isHost]);
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  const addMessageToChat = (message) => {
    setMessages(prev => [...prev, message]);
    
    // Save to localStorage
    const allSessions = JSON.parse(localStorage.getItem('streamingSessions') || '[]');
    const sessionIndex = allSessions.findIndex(s => s.id === sessionId);
    
    if (sessionIndex !== -1) {
      allSessions[sessionIndex].messages = [...(allSessions[sessionIndex].messages || []), message];
      localStorage.setItem('streamingSessions', JSON.stringify(allSessions));
    }
  };
  
  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const message = {
      id: `msg-${Date.now()}`,
      sender: isHost ? 'Host' : viewerName,
      text: newMessage,
      timestamp: new Date().toISOString(),
      type: isHost ? 'host' : 'viewer'
    };
    
    addMessageToChat(message);
    setNewMessage('');
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden mb-4">
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex flex-col ${
                  message.type === 'system' 
                    ? 'bg-gray-100 p-2 rounded text-center' 
                    : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="text-sm">
                      <span 
                        className={`font-semibold ${
                          message.type === 'host' 
                            ? 'text-primary' 
                            : message.type === 'system' 
                              ? 'text-gray-500' 
                              : ''
                        }`}
                      >
                        {message.sender}
                      </span>
                      {message.type !== 'system' && ': '}
                      <span>{message.text}</span>
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <form onSubmit={sendMessage} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default StreamChat;
