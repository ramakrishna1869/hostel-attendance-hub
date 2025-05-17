
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import StudentHistory from '../components/students/StudentHistory';
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator, 
  BreadcrumbPage 
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
              <BreadcrumbLink href="/students">Students</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Student History</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Details</h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => navigate('/students')}>
              Back to Students
            </Button>
            <Button variant="outline" onClick={() => navigate('/students/reports')}>
              View Reports
            </Button>
          </div>
        </div>

        <StudentHistory />
      </div>
    </MainLayout>
  );
};

export default StudentDetails;
