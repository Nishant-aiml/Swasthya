import React from 'react';
import {
  Activity,
  Heart,
  Calendar,
  Pill,
  AlertCircle,
  FileText,
  Droplet,
  Shield,
  Crosshair
} from 'lucide-react';
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface HealthMetric {
  label: string;
  value: string;
  unit: string;
  icon: React.ElementType;
  color: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
}

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  timeLeft: string;
  nextDose: string;
}

const healthMetrics: HealthMetric[] = [
  {
    label: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    icon: Heart,
    color: 'text-red-500',
    change: { value: 5, type: 'decrease' }
  },
  {
    label: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    icon: Activity,
    color: 'text-blue-500'
  },
  {
    label: 'Blood Sugar',
    value: '95',
    unit: 'mg/dL',
    icon: Droplet,
    color: 'text-purple-500',
    change: { value: 3, type: 'increase' }
  }
];

const upcomingAppointments: Appointment[] = [
  {
    id: '1',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: '2024-03-15',
    time: '10:00 AM',
    status: 'upcoming'
  },
  {
    id: '2',
    doctor: 'Dr. Michael Chen',
    specialty: 'General Physician',
    date: '2024-03-18',
    time: '2:30 PM',
    status: 'upcoming'
  }
];

const medications: Medication[] = [
  {
    name: 'Aspirin',
    dosage: '81mg',
    frequency: 'Once daily',
    timeLeft: '15 days',
    nextDose: 'Today 8:00 PM'
  },
  {
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    timeLeft: '7 days',
    nextDose: 'Today 9:00 PM'
  }
];

export default function Dashboard() {
  return (
    <div>
      {/* Header Navigation */}
      <nav className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="text-blue-600 font-semibold text-xl">
              Healthcare
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="hospital">Hospitals</SelectItem>
                <SelectItem value="clinic">Clinics</SelectItem>
                <SelectItem value="doctors">Doctors</SelectItem>
                <SelectItem value="pharmacy">Pharmacies</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center gap-2">
              <Crosshair className="h-4 w-4" />
              Find Nearby
            </Button>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" onClick={() => window.location.href = '/emergency'}>
              Emergency
            </Button>
            <Button variant="ghost" onClick={() => window.location.href = '/pharmacy'}>
              Pharmacy
            </Button>
            <Button variant="ghost" onClick={() => window.location.href = '/medicines'}>
              Medicines
            </Button>
            <Button variant="ghost" onClick={() => window.location.href = '/health-ai'}>
              Health AI
            </Button>
            <Button variant="ghost" onClick={() => window.location.href = '/appointments'}>
              Appointments
            </Button>
            <Button variant="ghost" onClick={() => window.location.href = '/profile'}>
              Profile
            </Button>
            <Button variant="default" onClick={() => window.location.href = '/logout'}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Health Dashboard</h1>

        {/* Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {healthMetrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{metric.label}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                    <p className="ml-2 text-sm text-gray-500">{metric.unit}</p>
                  </div>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
              {metric.change && (
                <div className={`mt-2 flex items-center text-sm ${
                  metric.change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span>{metric.change.type === 'increase' ? '↑' : '↓'}</span>
                  <span className="ml-1">{metric.change.value}% from last week</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">{appointment.doctor}</p>
                      <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      <div className="mt-1 text-sm text-gray-500">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Schedule Appointment
              </button>
            </div>
          </div>

          {/* Medications */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h2>
              <div className="space-y-4">
                {medications.map((medication) => (
                  <div key={medication.name} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Pill className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">{medication.name}</p>
                      <p className="text-sm text-gray-500">{medication.dosage} - {medication.frequency}</p>
                      <div className="mt-1 flex items-center space-x-4 text-sm">
                        <span className="text-orange-500">{medication.timeLeft} left</span>
                        <span className="text-blue-500">Next: {medication.nextDose}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Refill Medications
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <span className="mt-2 text-sm font-medium text-gray-900">Emergency Services</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100">
            <FileText className="h-6 w-6 text-blue-500" />
            <span className="mt-2 text-sm font-medium text-gray-900">Health Records</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100">
            <Droplet className="h-6 w-6 text-purple-500" />
            <span className="mt-2 text-sm font-medium text-gray-900">Blood Tests</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100">
            <Shield className="h-6 w-6 text-green-500" />
            <span className="mt-2 text-sm font-medium text-gray-900">Insurance</span>
          </button>
        </div>
      </div>
    </div>
  );
}