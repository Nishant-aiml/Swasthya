import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, Building2, FileText, AlertCircle, CheckCircle, X, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { Textarea } from "@/components/ui/Textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";

interface Prescription {
  medicines: {
    name: string;
    dosage: string;
    duration: string;
    instructions: string;
  }[];
  tests: {
    name: string;
    instructions: string;
  }[];
  generalInstructions: string;
  nextVisit?: string;
}

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  hospitalName: string;
  date: string;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  queueNumber?: number;
  estimatedTime?: string;
  prescription?: Prescription;
  followUp?: {
    recommended: boolean;
    date?: string;
  };
  payment: {
    amount: number;
    status: 'pending' | 'completed' | 'refunded';
    ayushmanCard?: {
      used: boolean;
      coverageAmount: number;
    };
  };
  questionnaire?: {
    completed: boolean;
    questions: {
      question: string;
      answer: string;
    }[];
  };
  feedback?: {
    rating: number;
    comment: string;
    metrics: {
      punctuality: number;
      communication: number;
      effectiveness: number;
    };
  };
}

interface AppointmentManagementProps {
  appointments: Appointment[];
  onCancelAppointment: (appointmentId: string) => void;
  onRescheduleAppointment: (appointmentId: string, newDate: string, newTime: string) => void;
  onSubmitFeedback: (appointmentId: string, feedback: Appointment['feedback']) => void;
  onSubmitQuestionnaire: (appointmentId: string, answers: { question: string; answer: string; }[]) => void;
  showHistory?: boolean;
}

export default function AppointmentManagement({
  appointments,
  onCancelAppointment,
  onRescheduleAppointment,
  onSubmitFeedback,
  onSubmitQuestionnaire,
  showHistory
}: AppointmentManagementProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedback, setFeedback] = useState<{
    rating: number;
    comment: string;
    metrics: {
      punctuality: number;
      communication: number;
      effectiveness: number;
    };
  }>({
    rating: 0,
    comment: '',
    metrics: {
      punctuality: 0,
      communication: 0,
      effectiveness: 0
    }
  });

  const getAppointmentTypeIcon = (type: Appointment['type']) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="default">Upcoming</Badge>;
      case 'ongoing':
        return <Badge variant="outline" className="bg-green-500 text-white">In Progress</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Appointments */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
        <div className="space-y-4">
          {appointments
            .filter(apt => apt.status === 'upcoming')
            .map((appointment) => (
              <Card key={appointment.id} className="p-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* Appointment Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{appointment.doctorName}</h4>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <p className="text-gray-600">{appointment.doctorSpecialization}</p>
                    <p className="text-gray-600">{appointment.hospitalName}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        {appointment.time}
                      </div>
                      <div className="flex items-center gap-1">
                        {getAppointmentTypeIcon(appointment.type)}
                        <span className="capitalize">{appointment.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Queue Status */}
                  {appointment.queueNumber && (
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Queue Number</p>
                      <p className="text-2xl font-bold">{appointment.queueNumber}</p>
                      {appointment.estimatedTime && (
                        <p className="text-sm text-gray-500">
                          Est. wait: {appointment.estimatedTime}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {!appointment.questionnaire?.completed && (
                      <Button
                        variant="outline"
                        onClick={() => setSelectedAppointment(appointment)}
                      >
                        Fill Pre-appointment Form
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => onCancelAppointment(appointment.id)}
                    >
                      Cancel Appointment
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>

      {/* Past Appointments */}
      {showHistory && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Past Appointments</h3>
          <Accordion type="single" collapsible>
            {appointments
              .filter(apt => apt.status === 'completed')
              .map((appointment) => (
                <AccordionItem key={appointment.id} value={appointment.id}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
                      <span className="font-medium">{appointment.doctorName}</span>
                      <span className="text-gray-600">{appointment.doctorSpecialization}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      {/* Prescription */}
                      {appointment.prescription && (
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Prescription
                          </h4>
                          <div className="space-y-4">
                            {/* Medicines */}
                            {appointment.prescription.medicines.length > 0 && (
                              <div>
                                <h5 className="text-sm font-medium mb-2">Medicines</h5>
                                <div className="space-y-2">
                                  {appointment.prescription.medicines.map((medicine, index) => (
                                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                      <p className="font-medium">{medicine.name}</p>
                                      <p className="text-sm text-gray-600">
                                        {medicine.dosage} - {medicine.duration}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {medicine.instructions}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Tests */}
                            {appointment.prescription.tests.length > 0 && (
                              <div>
                                <h5 className="text-sm font-medium mb-2">Tests</h5>
                                <div className="space-y-2">
                                  {appointment.prescription.tests.map((test, index) => (
                                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                      <p className="font-medium">{test.name}</p>
                                      <p className="text-sm text-gray-600">
                                        {test.instructions}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* General Instructions */}
                            {appointment.prescription.generalInstructions && (
                              <div>
                                <h5 className="text-sm font-medium mb-2">General Instructions</h5>
                                <p className="text-gray-600">
                                  {appointment.prescription.generalInstructions}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Follow-up */}
                      {appointment.followUp?.recommended && (
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-blue-500" />
                          <span>
                            Follow-up recommended
                            {appointment.followUp.date && ` on ${new Date(appointment.followUp.date).toLocaleDateString()}`}
                          </span>
                          <Button variant="outline" size="sm">
                            Book Follow-up
                          </Button>
                        </div>
                      )}

                      {/* Feedback */}
                      {!appointment.feedback ? (
                        <Button
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowFeedbackDialog(true);
                          }}
                        >
                          Provide Feedback
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <h4 className="font-medium">Your Feedback</h4>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < appointment.feedback!.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">{appointment.feedback.comment}</p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      )}

      {/* Pre-appointment Questionnaire Dialog */}
      <Dialog
        open={selectedAppointment !== null && !showFeedbackDialog}
        onOpenChange={() => setSelectedAppointment(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pre-appointment Questionnaire</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedAppointment?.questionnaire?.questions.map((q, index) => (
              <div key={index}>
                <label className="text-sm font-medium">{q.question}</label>
                <Textarea
                  value={q.answer}
                  onChange={(e) => {
                    if (!selectedAppointment) return;
                    const newQuestions = [...selectedAppointment.questionnaire!.questions];
                    newQuestions[index] = {
                      ...newQuestions[index],
                      answer: e.target.value
                    };
                    onSubmitQuestionnaire(selectedAppointment.id, newQuestions);
                  }}
                  placeholder="Your answer..."
                  className="mt-1"
                />
              </div>
            ))}
            <Button
              onClick={() => {
                if (!selectedAppointment) return;
                onSubmitQuestionnaire(
                  selectedAppointment.id,
                  selectedAppointment.questionnaire!.questions
                );
                setSelectedAppointment(null);
              }}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog
        open={showFeedbackDialog}
        onOpenChange={(open) => {
          setShowFeedbackDialog(open);
          if (!open) {
            setSelectedAppointment(null);
            setFeedback({
              rating: 0,
              comment: '',
              metrics: {
                punctuality: 0,
                communication: 0,
                effectiveness: 0
              }
            });
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Overall Rating</label>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 cursor-pointer ${
                      i < feedback.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    onClick={() => setFeedback({ ...feedback, rating: i + 1 })}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Punctuality</label>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 cursor-pointer ${
                      i < feedback.metrics.punctuality
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    onClick={() =>
                      setFeedback({
                        ...feedback,
                        metrics: { ...feedback.metrics, punctuality: i + 1 }
                      })
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Communication</label>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 cursor-pointer ${
                      i < feedback.metrics.communication
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    onClick={() =>
                      setFeedback({
                        ...feedback,
                        metrics: { ...feedback.metrics, communication: i + 1 }
                      })
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Treatment Effectiveness</label>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 cursor-pointer ${
                      i < feedback.metrics.effectiveness
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    onClick={() =>
                      setFeedback({
                        ...feedback,
                        metrics: { ...feedback.metrics, effectiveness: i + 1 }
                      })
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Comments</label>
              <Textarea
                value={feedback.comment}
                onChange={(e) =>
                  setFeedback({ ...feedback, comment: e.target.value })
                }
                placeholder="Share your experience..."
                className="mt-1"
              />
            </div>

            <Button
              variant="outline"
              className="bg-green-500 text-white hover:bg-green-600"
              onClick={() => {
                if (!selectedAppointment) return;
                onSubmitFeedback(selectedAppointment.id, feedback);
                setShowFeedbackDialog(false);
                setSelectedAppointment(null);
              }}
            >
              Submit Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
