
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const AttendanceSummary = ({ totalStudents }) => {
  // Sample data - in a real app, this would come from your backend
  const presentCount = 456;
  const absentCount = 44;
  const leaveCount = 34;
  
  const presentPercentage = Math.round((presentCount / totalStudents) * 100);
  const absentPercentage = Math.round((absentCount / totalStudents) * 100);
  const leavePercentage = Math.round((leaveCount / totalStudents) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-success">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Present</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="text-2xl font-bold">{presentCount}</div>
            <Progress value={presentPercentage} className="h-2 mt-2" />
            <div className="text-xs text-muted-foreground mt-1">{presentPercentage}% of students</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-destructive">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Absent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="text-2xl font-bold">{absentCount}</div>
            <Progress value={absentPercentage} className="h-2 mt-2 bg-gray-200">
              <div className="h-full bg-destructive" style={{ width: `${absentPercentage}%` }} />
            </Progress>
            <div className="text-xs text-muted-foreground mt-1">{absentPercentage}% of students</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">On Leave</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="text-2xl font-bold">{leaveCount}</div>
            <Progress value={leavePercentage} className="h-2 mt-2 bg-gray-200">
              <div className="h-full bg-primary" style={{ width: `${leavePercentage}%` }} />
            </Progress>
            <div className="text-xs text-muted-foreground mt-1">{leavePercentage}% of students</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceSummary;
