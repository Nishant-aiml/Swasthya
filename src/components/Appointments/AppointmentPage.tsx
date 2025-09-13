import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Slider } from '@/components/ui/Slider';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { toast } from 'sonner';
import { 
  CalendarCheck, 
  Clock, 
  User, 
  Phone, 
  Stethoscope, 
  Calendar as CalendarIcon, 
  MoreVertical,
  Search,
  Star,
  MapPin,
  Video
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import AppointmentActionsDialog from './AppointmentActionsDialog';

type TimeSlot = string;
type DoctorType = string;

interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  date: Date;
  time: TimeSlot;
  doctorType: DoctorType;
  status: 'upcoming' | 'completed' | 'cancelled';
  cancellationReason?: string;
}

interface FormData {
  patientName: string;
  phone: string;
  time: TimeSlot | '';
  doctorType: DoctorType | '';
}

const timeSlots: TimeSlot[] = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

const doctorTypes: DoctorType[] = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedist',
  'Neurologist',
  'Psychiatrist',
  'Dentist'
];

const doctors = [
  {
    id: '1',
    name: 'Dr. John Doe',
    specialization: 'Cardiologist',
    image: 'https://picsum.photos/200/300',
    hospital: 'Apollo Hospital',
    location: 'Mumbai',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Dr. Jane Smith',
    specialization: 'Dermatologist',
    image: 'https://picsum.photos/200/301',
    hospital: 'Fortis Hospital',
    location: 'Delhi',
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Dr. Bob Johnson',
    specialization: 'Neurologist',
    image: 'https://picsum.photos/200/302',
    hospital: 'Max Hospital',
    location: 'Bangalore',
    rating: 4.8,
  },
];

export default function AppointmentPage() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [minimumRating, setMinimumRating] = useState(0);
  const [acceptsAyushman, setAcceptsAyushman] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showActionsDialog, setShowActionsDialog] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'John Doe',
      phone: '1234567890',
      date: new Date(),
      time: '10:00 AM',
      doctorType: 'General Physician',
      status: 'upcoming',
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      phone: '9876543210',
      date: new Date(Date.now() - 86400000),
      time: '02:30 PM',
      doctorType: 'Cardiologist',
      status: 'completed',
    },
  ]);

  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    phone: '',
    time: '',
    doctorType: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date) {
      toast.error('Please select a date');
      return;
    }
    if (!formData.time) {
      toast.error('Please select a time slot');
      return;
    }
    if (!formData.doctorType) {
      toast.error('Please select a doctor type');
      return;
    }

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      patientName: formData.patientName,
      phone: formData.phone,
      date: date,
      time: formData.time,
      doctorType: formData.doctorType,
      status: 'upcoming',
    };

    setAppointments([newAppointment, ...appointments]);
    toast.success('Appointment booked successfully!', {
      description: `Your appointment is scheduled for ${date.toLocaleDateString()} at ${formData.time}`,
    });

    // Reset form
    setFormData({
      patientName: '',
      phone: '',
      time: '',
      doctorType: '',
    });
  };

  const handleUpdateAppointment = (
    appointmentId: string,
    updates: Partial<Appointment>,
    reason: string
  ) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, ...updates } : apt
      )
    );
    toast.success('Appointment updated successfully!', {
      description: `Your appointment has been updated. Reason: ${reason}`,
    });
    setShowActionsDialog(false);
  };

  const handleCancelAppointment = (appointmentId: string, reason: string) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((apt) =>
        apt.id === appointmentId
          ? { ...apt, status: 'cancelled', cancellationReason: reason }
          : apt
      )
    );
    toast.success('Appointment cancelled successfully!', {
      description: `Your appointment has been cancelled. Reason: ${reason}`,
    });
    setShowActionsDialog(false);
  };

  const handleBookAppointment = (doctor: any) => {
    // Handle book appointment logic
    toast.info('Booking appointment...', {
      description: `Booking appointment with Dr. ${doctor.name}`,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Doctors & Appointments</h1>
      
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="search">Find Doctors</TabsTrigger>
          <TabsTrigger value="appointments">My Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          {/* Search and Filters */}
          <Card className="p-4">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Input
                  placeholder="Search doctors by name or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label>Specialty</Label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Specialties</SelectItem>
                      <SelectItem value="cardiologist">Cardiologist</SelectItem>
                      <SelectItem value="dermatologist">Dermatologist</SelectItem>
                      <SelectItem value="neurologist">Neurologist</SelectItem>
                      <SelectItem value="orthopedic">Orthopedic</SelectItem>
                      <SelectItem value="pediatrician">Pediatrician</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Locations</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Minimum Rating: {minimumRating}</Label>
                  <Slider
                    value={[minimumRating]}
                    onValueChange={(value) => setMinimumRating(value[0])}
                    min={0}
                    max={5}
                    step={0.1}
                    className="py-4"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="ayushman"
                    checked={acceptsAyushman}
                    onCheckedChange={(checked) => setAcceptsAyushman(checked as boolean)}
                  />
                  <Label htmlFor="ayushman">
                    Accepts Ayushman Card
                  </Label>
                </div>
              </div>
            </div>
          </Card>

          {/* Doctor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialization}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{doctor.hospital}, {doctor.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Next Available: Today, 2:00 PM</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full">
                      <Video className="h-4 w-4 mr-2" />
                      Video Consult
                    </Button>
                    <Button className="w-full" onClick={() => handleBookAppointment(doctor)}>
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="appointments">
          {/* Book Appointment Form */}
          <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-sm sm:text-base font-semibold text-purple-700 flex items-center gap-2">
                    <User className="h-4 w-4" /> Patient Name
                  </Label>
                  <Input
                    required
                    value={formData.patientName}
                    onChange={(e) =>
                      setFormData({ ...formData, patientName: e.target.value })
                    }
                    className="h-9 sm:h-10 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
                    placeholder="Enter patient name"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-sm sm:text-base font-semibold text-purple-700 flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Phone Number
                  </Label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="h-9 sm:h-10 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
                    placeholder="Enter phone number"
                    type="tel"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-sm sm:text-base font-semibold text-purple-700 flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" /> Select Date
                  </Label>
                  <div className="border-2 border-purple-200 rounded-xl p-2 bg-white overflow-hidden">
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(day: Date) => day < new Date()}
                      className="!w-full [&_.rdp-month]:!w-full [&_.rdp-table]:!w-full [&_.rdp]:!w-full [&_.rdp-caption]:text-sm [&_.rdp-head_cell]:text-xs [&_.rdp-cell]:p-0"
                      classNames={{
                        day_selected: "bg-purple-500 text-white hover:bg-purple-600",
                        day_today: "text-pink-500 font-bold",
                        button: "hover:bg-purple-50 transition-colors",
                        head_cell: "text-purple-600 font-medium",
                        cell: "text-sm",
                        day: "h-7 w-7 text-sm p-0 aria-selected:bg-purple-500",
                        nav_button: "h-7 w-7 bg-purple-50 hover:bg-purple-100 rounded-md",
                        caption: "flex justify-center items-center gap-1 py-2"
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-sm sm:text-base font-semibold text-purple-700 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Select Time
                  </Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) =>
                      setFormData({ ...formData, time: value as TimeSlot })
                    }
                  >
                    <SelectTrigger className="h-9 sm:h-10 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent
                      className="bg-white border rounded-lg shadow-lg"
                      position="popper"
                      align="start"
                      sideOffset={4}
                    >
                      {timeSlots.map((slot) => (
                        <SelectItem
                          key={slot}
                          value={slot}
                          className="py-1.5 px-3 text-sm cursor-pointer hover:bg-purple-50"
                        >
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-sm sm:text-base font-semibold text-purple-700 flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" /> Doctor Type
                  </Label>
                  <Select
                    value={formData.doctorType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, doctorType: value as DoctorType })
                    }
                  >
                    <SelectTrigger className="h-9 sm:h-10 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400">
                      <SelectValue placeholder="Select doctor type" />
                    </SelectTrigger>
                    <SelectContent
                      className="bg-white border rounded-lg shadow-lg"
                      position="popper"
                      align="start"
                      sideOffset={4}
                    >
                      {doctorTypes.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="py-1.5 px-3 text-sm cursor-pointer hover:bg-purple-50"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-10 sm:h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-sm transition-all hover:shadow"
              >
                Book Appointment
              </Button>
            </form>
          </Card>

          {/* Appointments List */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-800">Your Appointments</h2>
            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="p-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-900">
                        <User className="h-4 w-4 text-purple-500" />
                        {appointment.patientName}
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <CalendarCheck className="h-4 w-4 text-blue-500" />
                          {appointment.date.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-green-500" />
                          {appointment.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Stethoscope className="h-4 w-4 text-indigo-500" />
                          {appointment.doctorType}
                        </div>
                      </div>
                      {appointment.status === 'cancelled' && appointment.cancellationReason && (
                        <div className="text-sm text-red-600">
                          Cancelled: {appointment.cancellationReason}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <div
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          appointment.status === 'upcoming'
                            ? 'bg-blue-100 text-blue-700'
                            : appointment.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </div>
                      {appointment.status !== 'cancelled' && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-48 bg-white border rounded-lg shadow-lg"
                          >
                            {appointment.status === 'upcoming' && (
                              <>
                                <DropdownMenuItem
                                  className="py-2 px-3 text-sm cursor-pointer hover:bg-purple-50 text-purple-600 font-medium"
                                  onClick={() => {
                                    setSelectedAppointment(appointment);
                                    setShowActionsDialog(true);
                                  }}
                                >
                                  Reschedule
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="py-2 px-3 text-sm cursor-pointer hover:bg-red-50 text-red-600 font-medium"
                                  onClick={() => {
                                    setSelectedAppointment(appointment);
                                    setShowActionsDialog(true);
                                  }}
                                >
                                  Cancel
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem
                              className="py-2 px-3 text-sm cursor-pointer hover:bg-blue-50 text-blue-600 font-medium"
                              onClick={() => {
                                // Handle view details
                                toast.info('Viewing appointment details...', {
                                  description: `Appointment details for ${appointment.patientName}`,
                                });
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {selectedAppointment && (
        <AppointmentActionsDialog
          open={showActionsDialog}
          onClose={() => setShowActionsDialog(false)}
          appointment={selectedAppointment}
          onUpdateAppointment={handleUpdateAppointment}
          onCancelAppointment={handleCancelAppointment}
          timeSlots={timeSlots}
          doctorTypes={doctorTypes}
        />
      )}
    </div>
  );
}
