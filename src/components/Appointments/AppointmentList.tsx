import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { ScrollArea } from "@/components/ui/ScrollArea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Textarea } from "@/components/ui/Textarea";
import { Star, Video, Phone, User, Clock, MapPin, AlertTriangle } from 'lucide-react';
import type { Appointment } from '@/types/doctor';
import { mockAppointments } from '@/data/mockData';

interface AppointmentListProps {
  appointments?: Appointment[];
  onCancelAppointment?: (id: string) => void;
  onRescheduleAppointment?: (id: string, date: string, time: string) => void;
  onSubmitFeedback?: (id: string, feedback: any) => void;
}

export default function AppointmentList({
  appointments = mockAppointments,
  onCancelAppointment,
  onRescheduleAppointment,
  onSubmitFeedback
}: AppointmentListProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackMetrics, setFeedbackMetrics] = useState({
    punctuality: 0,
    communication: 0,
    effectiveness: 0
  });
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingAppointments = appointments.filter(
    apt => apt.status === 'confirmed'
  );

  const pastAppointments = appointments.filter(
    apt => apt.status === 'completed' || apt.status === 'cancelled'
  );

  const handleSubmitFeedback = () => {
    if (!selectedAppointment) return;
    onSubmitFeedback?.(selectedAppointment.id, {
      rating: feedbackRating,
      comment: feedbackComment,
      metrics: feedbackMetrics,
      submitted: new Date().toISOString()
    });
    setSelectedAppointment(null);
    setFeedbackRating(0);
    setFeedbackComment('');
    setFeedbackMetrics({
      punctuality: 0,
      communication: 0,
      effectiveness: 0
    });
  };

  const renderAppointmentCard = (appointment: Appointment) => (
    <Card key={appointment.id} className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={
                  appointment.status === 'confirmed'
                    ? 'default'
                    : appointment.status === 'completed'
                    ? 'success'
                    : 'destructive'
                }
              >
                {appointment.status}
              </Badge>
            </div>
            <h4 className="font-medium">{appointment.patientName}</h4>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{appointment.date} at {appointment.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{appointment.patientPhone}</span>
              </div>
              {appointment.ayushmanCard && (
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">
                    Ayushman Card: {appointment.ayushmanCard}
                  </Badge>
                </div>
              )}
              {appointment.specialInstructions && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Special Instructions:</p>
                  <p className="text-sm text-gray-600">{appointment.specialInstructions}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {appointment.status === 'confirmed' && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRescheduleAppointment?.(appointment.id, appointment.date, appointment.time)}
                >
                  Reschedule
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onCancelAppointment?.(appointment.id)}
                >
                  Cancel
                </Button>
              </>
            )}
            {appointment.status === 'completed' && !appointment.feedback && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    Give Feedback
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rate your experience</DialogTitle>
                    <DialogDescription>
                      Your feedback helps us improve our service
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="text-sm font-medium">Overall Rating</label>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Star
                            key={rating}
                            className={`h-6 w-6 cursor-pointer ${
                              rating <= feedbackRating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                            onClick={() => setFeedbackRating(rating)}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Comment</label>
                      <Textarea
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        placeholder="Share your experience..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastAppointments.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-4">
            <ScrollArea className="h-[400px]">
              {upcomingAppointments.map(renderAppointmentCard)}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="past" className="mt-4">
            <ScrollArea className="h-[400px]">
              {pastAppointments.map(renderAppointmentCard)}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
