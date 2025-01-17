import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Activity,
  Calendar,
  Leaf,
  Clock,
  TrendingUp,
  Video,
  Car,
} from 'lucide-react';

export default function AppointmentStats() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Appointments</p>
                <h3 className="text-2xl font-bold">24</h3>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
            <Progress value={75} className="mt-4" />
            <p className="text-sm text-gray-500 mt-2">
              75% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Virtual Consultations</p>
                <h3 className="text-2xl font-bold">18</h3>
              </div>
              <Video className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="success">+12%</Badge>
              <span className="text-sm text-gray-500">vs. last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Carbon Saved</p>
                <h3 className="text-2xl font-bold">156 kg</h3>
              </div>
              <Leaf className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Equivalent to:</span>
                <span className="font-medium">12 trees</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Car className="h-4 w-4" />
                <span>Saved 650 km of car travel</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Wait Time</p>
                <h3 className="text-2xl font-bold">12 min</h3>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="success">-25%</Badge>
              <span className="text-sm text-gray-500">vs. last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Appointment Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="inPerson" name="In-Person" fill="#3b82f6" />
                <Bar dataKey="virtual" name="Virtual" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Health Check-ups Due
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthCheckups.map((checkup) => (
                <div
                  key={checkup.name}
                  className="flex items-center justify-between p-2 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{checkup.name}</p>
                    <p className="text-sm text-gray-500">Due in {checkup.dueIn} days</p>
                  </div>
                  <Button variant="outline">Schedule</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Doctor Visit Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {doctorVisits.map((visit) => (
                <div key={visit.doctor} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{visit.doctor}</p>
                    <Badge>{visit.visits} visits</Badge>
                  </div>
                  <Progress value={visit.progress} />
                  <p className="text-sm text-gray-500">
                    Last visit: {visit.lastVisit}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const appointmentTrends = [
  { month: 'Jan', inPerson: 12, virtual: 18 },
  { month: 'Feb', inPerson: 15, virtual: 20 },
  { month: 'Mar', inPerson: 10, virtual: 22 },
  { month: 'Apr', inPerson: 8, virtual: 25 },
  { month: 'May', inPerson: 5, virtual: 28 },
  { month: 'Jun', inPerson: 4, virtual: 30 },
];

const healthCheckups = [
  { name: 'Annual Physical', dueIn: 15 },
  { name: 'Eye Examination', dueIn: 30 },
  { name: 'Dental Check-up', dueIn: 45 },
  { name: 'Blood Work', dueIn: 60 },
];

const doctorVisits = [
  {
    doctor: 'Dr. John Doe (Cardiologist)',
    visits: 5,
    progress: 80,
    lastVisit: '2 weeks ago',
  },
  {
    doctor: 'Dr. Jane Smith (Dermatologist)',
    visits: 3,
    progress: 60,
    lastVisit: '1 month ago',
  },
  {
    doctor: 'Dr. Mike Johnson (General Physician)',
    visits: 8,
    progress: 90,
    lastVisit: '1 week ago',
  },
];
