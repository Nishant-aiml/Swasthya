import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Timeline, TimelineItem } from '../../ui/Timeline';
import { Progress } from '../../ui/Progress';
import { Activity, Pill, Calendar, FileText, Target } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'appointment' | 'prescription' | 'treatment' | 'goal';
  icon: React.ReactNode;
}

export function HealthTimeline() {
  const events: TimelineEvent[] = [
    {
      date: '2025-01-15',
      title: 'Annual Check-up',
      description: 'Regular health check-up with Dr. Smith',
      type: 'appointment',
      icon: <Calendar className="w-4 h-4" />
    },
    {
      date: '2025-01-10',
      title: 'Prescription Renewal',
      description: 'Blood pressure medication renewed',
      type: 'prescription',
      icon: <Pill className="w-4 h-4" />
    },
    {
      date: '2025-01-05',
      title: 'Physical Therapy',
      description: 'Lower back rehabilitation session',
      type: 'treatment',
      icon: <Activity className="w-4 h-4" />
    }
  ];

  const healthGoals = [
    {
      name: 'Daily Steps',
      current: 8000,
      target: 10000,
      progress: 80
    },
    {
      name: 'Weight Goal',
      current: 75,
      target: 70,
      progress: 60
    },
    {
      name: 'Exercise Minutes',
      current: 45,
      target: 60,
      progress: 75
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Health Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <Timeline>
            {events.map((event, index) => (
              <TimelineItem
                key={index}
                date={event.date}
                title={event.title}
                description={event.description}
                icon={event.icon}
              />
            ))}
          </Timeline>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Health Goals Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-sm text-gray-500">
                    {goal.current} / {goal.target}
                  </span>
                </div>
                <Progress value={goal.progress} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Dr. Johnson</span>
                <span className="text-sm">Jan 20</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Dental Check-up</span>
                <span className="text-sm">Jan 25</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Amoxicillin</span>
                <span className="text-sm">500mg</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ibuprofen</span>
                <span className="text-sm">400mg</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
