
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/Student";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import { useState, useEffect } from 'react';
import CreateStreamSession from "./pages/streaming/CreateStreamSession";
import StreamView from "./pages/streaming/StreamView";
import StreamHost from "./pages/streaming/StreamHost";

const queryClient = new QueryClient();

const App = () => {
  // Loading state for transition effects
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">Hostel Attendance System</h1>
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student" element={<Student />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/reports" element={<Students />} />
            <Route path="/students/history/:id" element={<StudentDetails />} />
            <Route path="/streams/create" element={<CreateStreamSession />} />
            <Route path="/streams/host/:sessionId" element={<StreamHost />} />
            <Route path="/streams/view/:sessionId" element={<StreamView />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
