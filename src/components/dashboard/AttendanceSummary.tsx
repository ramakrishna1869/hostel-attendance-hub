
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface AttendanceSummaryProps {
  totalStudents: number;
}

const AttendanceSummary = ({ totalStudents }: AttendanceSummaryProps) => {
  // Minimal sample data for demonstration - would come from backend in production
  const presentCount = 142;
  const absentCount = 8;
  const leaveCount = 3;
  const lateCount = 5;
  
  const presentPercentage = Math.round((presentCount / totalStudents) * 100);
  const absentPercentage = Math.round((absentCount / totalStudents) * 100);
  const leavePercentage = Math.round((leaveCount / totalStudents) * 100);
  const latePercentage = Math.round((lateCount / totalStudents) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      
      <Card className="border-l-4 border-l-warning">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Late Check-in</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="text-2xl font-bold">{lateCount}</div>
            <Progress value={latePercentage} className="h-2 mt-2 bg-gray-200">
              <div className="h-full bg-warning" style={{ width: `${latePercentage}%` }} />
            </Progress>
            <div className="text-xs text-muted-foreground mt-1">{latePercentage}% of students</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceSummary;
