import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Progress } from '@/components/ui/Progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Calendar,
  Clock,
  Activity,
  Pill,
  Target,
  TrendingUp,
  Plus,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export default function HealthTimeline() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedView, setSelectedView] = useState('all');

  return (
    <div className="space-y-6">
      {/* Timeline Controls */}
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Timeline Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline View</CardTitle>
          <CardDescription>
            Filter your health timeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            {['all', 'appointments', 'treatments', 'medications', 'goals'].map((view) => (
              <Button
                key={view}
                variant={selectedView === view ? 'default' : 'outline'}
                onClick={() => setSelectedView(view)}
                className="capitalize"
              >
                {view}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline Events */}
      <div className="space-y-4">
        {/* Today */}
        <div className="relative pl-8 before:absolute before:left-3 before:top-0 before:h-full before:w-0.5 before:bg-border">
          <div className="font-semibold mb-4">Today</div>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Doctor's Appointment</h4>
                    <p className="text-sm text-muted-foreground">
                      General checkup with Dr. Smith
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">2:30 PM</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Pill className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Medication Reminder</h4>
                    <p className="text-sm text-muted-foreground">
                      Take blood pressure medication
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">4:00 PM</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Yesterday */}
        <div className="relative pl-8 before:absolute before:left-3 before:top-0 before:h-full before:w-0.5 before:bg-border">
          <div className="font-semibold mb-4">Yesterday</div>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Activity className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Health Goal Progress</h4>
                    <p className="text-sm text-muted-foreground">
                      Completed 30 minutes of exercise
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">10:00 AM</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Treatment Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Treatment Progress</CardTitle>
          <CardDescription>
            Track your ongoing treatments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Physical Therapy', progress: 70 },
              { name: 'Medication Course', progress: 45 },
            ].map((treatment) => (
              <div key={treatment.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{treatment.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {treatment.progress}%
                  </span>
                </div>
                <Progress value={treatment.progress} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prescription Log */}
      <Card>
        <CardHeader>
          <CardTitle>Prescription Log</CardTitle>
          <CardDescription>
            Track your medications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((med) => (
              <div
                key={med}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Pill className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Medication Name</h4>
                    <p className="text-sm text-muted-foreground">
                      2 times daily • Remaining: 15 days
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Refill
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Health Goals</CardTitle>
          <CardDescription>
            Track your health and fitness goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Daily Exercise', target: '30 mins', current: '20 mins', progress: 66 },
              { name: 'Weight Goal', target: '70 kg', current: '75 kg', progress: 80 },
              { name: 'Blood Pressure', target: '120/80', current: '128/85', progress: 90 },
            ].map((goal) => (
              <div key={goal.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{goal.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      Target: {goal.target} • Current: {goal.current}
                    </div>
                  </div>
                  <Target className="w-5 h-5 text-muted-foreground" />
                </div>
                <Progress value={goal.progress} />
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add New Goal
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Health Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Health Trends</CardTitle>
          <CardDescription>
            Visualize your health progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center border rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Health trends visualization will be displayed here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
