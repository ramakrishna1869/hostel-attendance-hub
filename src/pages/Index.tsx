
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { motion } from 'framer-motion';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="overflow-hidden shadow-lg">
          <div className="bg-primary p-6 text-white text-center">
            <h1 className="text-2xl font-bold">Hostel Attendance System</h1>
            <p className="text-sm opacity-80 mt-2">Streamlining daily attendance monitoring</p>
          </div>

          <div className="grid grid-cols-2 border-b">
            <Button 
              variant={activeTab === 'login' ? 'default' : 'ghost'}
              className={`rounded-none py-3 ${activeTab === 'login' ? 'bg-primary text-white' : 'text-gray-500'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </Button>
            <Button 
              variant={activeTab === 'register' ? 'default' : 'ghost'}
              className={`rounded-none py-3 ${activeTab === 'register' ? 'bg-primary text-white' : 'text-gray-500'}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </Button>
          </div>

          <div className="p-6">
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </Card>
      </motion.div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2025 Hostel Attendance System</p>
      </footer>
    </div>
  );
};

export default Index;
