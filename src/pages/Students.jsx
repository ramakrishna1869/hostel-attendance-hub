
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import StudentsTable from '../components/students/StudentsTable';
import StudentReports from '../components/students/StudentReports';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

const Students = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'reports'
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  // Check if we should show reports based on URL
  useEffect(() => {
    if (location.pathname.includes('/reports')) {
      setActiveTab('reports');
    } else {
      setActiveTab('list');
    }
  }, [location]);

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    navigate(`/students/history/${student.id}`);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'reports') {
      navigate('/students/reports');
    } else {
      navigate('/students');
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {activeTab === 'list' ? (
                <BreadcrumbPage>Students</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href="/students">Students</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {activeTab === 'reports' && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Reports</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
            {selectedStudent && activeTab !== 'reports' && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Student History: {selectedStudent.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold">Student Management</h1>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <Button 
              onClick={() => handleTabChange('list')} 
              variant={activeTab === 'list' ? 'default' : 'outline'}
            >
              Student List
            </Button>
            <Button 
              onClick={() => handleTabChange('reports')} 
              variant={activeTab === 'reports' ? 'default' : 'outline'}
            >
              Attendance Reports
            </Button>
          </div>
        </div>

        {/* Main Content based on active tab */}
        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === 'list' ? 'Student Information' : 'Student Attendance Reports'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeTab === 'list' ? (
              <StudentsTable onViewDetails={handleViewDetails} />
            ) : (
              <StudentReports />
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Students;
