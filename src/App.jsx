
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';

// Auth Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin Pages
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import CreateStreamSession from "./pages/streaming/CreateStreamSession";
import StreamView from "./pages/streaming/StreamView";
import StreamHost from "./pages/streaming/StreamHost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentListPage from "./pages/admin/StudentListPage";
import AttendanceReportsPage from "./pages/admin/AttendanceReportsPage";
import LiveAttendancePage from "./pages/admin/LiveAttendancePage";

// Student Pages
import Student from "./pages/Student";
import Profile from "./pages/student/Profile";
import Analytics from "./pages/student/Analytics";
import AttendancePage from "./pages/student/AttendancePage";
import StudentInfoPage from "./pages/student/StudentInfoPage";
import StudentAnalyticsPage from "./pages/student/StudentAnalyticsPage";

// Auth Component
import RequireAuth from "./components/auth/RequireAuth";

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

  // Check if a user is logged in
  const userString = localStorage.getItem('user');
  const isLoggedIn = !!userString;
  const user = isLoggedIn ? JSON.parse(userString) : null;

  // Redirect function based on role
  const getHomeRedirect = () => {
    if (!isLoggedIn) return <Navigate to="/" />;
    if (user?.role === 'admin') return <Navigate to="/admin/dashboard" />;
    return <Navigate to="/student/info" />;
  };

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
            {/* Public Routes */}
            <Route path="/" element={isLoggedIn ? getHomeRedirect() : <Index />} />
            
            {/* Root Redirect */}
            <Route path="/home" element={getHomeRedirect()} />
            
            {/* Admin Routes */}
            <Route 
              path="/dashboard" 
              element={
                <RequireAuth requiredRole="admin">
                  <Dashboard />
                </RequireAuth>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <RequireAuth requiredRole="admin">
                  <AdminDashboard />
                </RequireAuth>
              } 
            />
            <Route 
              path="/students" 
              element={
                <RequireAuth requiredRole="admin">
                  <Students />
                </RequireAuth>
              } 
            />
            <Route 
              path="/admin/students" 
              element={
                <RequireAuth requiredRole="admin">
                  <StudentListPage />
                </RequireAuth>
              } 
            />
            <Route 
              path="/students/reports" 
              element={
                <RequireAuth requiredRole="admin">
                  <Students />
                </RequireAuth>
              } 
            />
            <Route 
              path="/admin/reports" 
              element={
                <RequireAuth requiredRole="admin">
                  <AttendanceReportsPage />
                </RequireAuth>
              } 
            />
            <Route 
              path="/admin/live" 
              element={
                <RequireAuth requiredRole="admin">
                  <LiveAttendancePage />
                </RequireAuth>
              } 
            />
            <Route 
              path="/students/history/:id" 
              element={
                <RequireAuth requiredRole="admin">
                  <StudentDetails />
                </RequireAuth>
              } 
            />
            <Route 
              path="/streams/create" 
              element={
                <RequireAuth requiredRole="admin">
                  <CreateStreamSession />
                </RequireAuth>
              } 
            />
            <Route 
              path="/streams/host/:sessionId" 
              element={
                <RequireAuth requiredRole="admin">
                  <StreamHost />
                </RequireAuth>
              } 
            />
            <Route 
              path="/streams/view/:sessionId" 
              element={
                <RequireAuth>
                  <StreamView />
                </RequireAuth>
              } 
            />
            
            {/* Student Routes */}
            <Route 
              path="/student" 
              element={
                <RequireAuth requiredRole="student">
                  <Student />
                </RequireAuth>
              } 
            />
            <Route 
              path="/student/profile" 
              element={
                <RequireAuth requiredRole="student">
                  <Profile />
                </RequireAuth>
              } 
            />
            <Route 
              path="/student/info" 
              element={
                <RequireAuth requiredRole="student">
                  <StudentInfoPage />
                </RequireAuth>
              } 
            />
            <Route 
              path="/student/analytics" 
              element={
                <RequireAuth requiredRole="student">
                  <StudentAnalyticsPage />
                </RequireAuth>
              } 
            />
            <Route 
              path="/student/attendance" 
              element={
                <RequireAuth requiredRole="student">
                  <AttendancePage />
                </RequireAuth>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
