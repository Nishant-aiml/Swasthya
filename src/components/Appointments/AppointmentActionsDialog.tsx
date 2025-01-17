import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/Select';
import { DayPicker } from 'react-day-picker';
import { Clock, Calendar as CalendarIcon, X } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  date: Date;
  time: string;
  doctorType: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface AppointmentActionsDialogProps {
  open: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onUpdateAppointment: (
    appointmentId: string,
    updates: Partial<Appointment>,
    reason: string
  ) => void;
  onCancelAppointment: (appointmentId: string, reason: string) => void;
  timeSlots: readonly string[];
  doctorTypes: readonly string[];
}

const cancellationReasons = [
  'Schedule Conflict',
  'Personal Emergency',
  'Found Another Doctor',
  'Health Issue Resolved',
  'Transportation Issues',
  'Other',
] as const;

export default function AppointmentActionsDialog({
  open,
  onClose,
  appointment,
  timeSlots,
  doctorTypes,
  onUpdateAppointment,
  onCancelAppointment,
}: AppointmentActionsDialogProps) {
  const [date, setDate] = useState<Date | undefined>(
    appointment ? new Date(appointment.date) : undefined
  );
  const [time, setTime] = useState(appointment?.time || '');
  const [doctorType, setDoctorType] = useState(appointment?.doctorType || '');
  const [cancellationReason, setCancellationReason] = useState('');
  const [showCancellation, setShowCancellation] = useState(false);

  useEffect(() => {
    if (appointment) {
      setDate(new Date(appointment.date));
      setTime(appointment.time);
      setDoctorType(appointment.doctorType);
    }
  }, [appointment]);

  const handleUpdate = () => {
    if (!appointment || !date) return;

    onUpdateAppointment(
      appointment.id,
      {
        date,
        time,
        doctorType,
      },
      'Appointment details updated'
    );
    onClose();
  };

  const handleCancel = () => {
    if (!appointment || !cancellationReason) return;
    onCancelAppointment(appointment.id, cancellationReason);
    onClose();
  };

  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[95vw] max-w-[450px] max-h-[85vh] overflow-y-auto bg-white rounded-xl shadow-xl border border-purple-100 p-0">
        <DialogHeader className="sticky top-0 z-10 bg-white border-b border-purple-100">
          <div className="px-6 pt-6 pb-4 bg-gradient-to-r from-purple-50 to-blue-50">
            <DialogTitle className="text-xl font-semibold text-purple-900 flex items-center gap-2">
              <span className="text-purple-600">✨</span>
              Edit Appointment
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-1">
              Update your appointment details
            </DialogDescription>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-purple-100/50 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-4 sm:p-6 space-y-4">
          {!showCancellation ? (
            <>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Select New Date
                  </Label>
                  <div className="border rounded-lg p-2 bg-white">
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="!w-full [&_.rdp-month]:!w-full [&_.rdp-table]:!w-full [&_.rdp]:!w-full [&_.rdp-caption]:text-sm [&_.rdp-head_cell]:text-xs [&_.rdp-cell]:p-0"
                      classNames={{
                        day_selected: "bg-purple-600 text-white hover:bg-purple-700",
                        day_today: "bg-purple-100 text-purple-900",
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

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Select New Time
                  </Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="h-10 bg-white border rounded-lg">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent
                      className="bg-white border rounded-lg shadow-lg"
                      position="popper"
                      align="start"
                      sideOffset={4}
                    >
                      <SelectGroup className="max-h-[160px] overflow-y-auto py-1">
                        {timeSlots.map((slot) => (
                          <SelectItem
                            key={slot}
                            value={slot}
                            className="hover:bg-purple-50 data-[state=checked]:bg-purple-100"
                          >
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Select New Doctor Type
                  </Label>
                  <Select value={doctorType} onValueChange={setDoctorType}>
                    <SelectTrigger className="h-10 bg-white border rounded-lg">
                      <SelectValue placeholder="Select doctor type" />
                    </SelectTrigger>
                    <SelectContent
                      className="bg-white border rounded-lg shadow-lg"
                      position="popper"
                      align="start"
                      sideOffset={4}
                    >
                      <SelectGroup className="max-h-[160px] overflow-y-auto py-1">
                        {doctorTypes.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="hover:bg-purple-50 data-[state=checked]:bg-purple-100"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter className="flex justify-between gap-3 pt-4 border-t mt-4">
                <div className="flex gap-3 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCancellation(true)}
                    className="flex-1 bg-white hover:bg-red-50 text-red-600 border-red-200 hover:border-red-300"
                  >
                    Cancel Appointment
                  </Button>
                  <Button
                    type="button"
                    onClick={handleUpdate}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  >
                    Save Changes
                  </Button>
                </div>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700 block">
                  Select Cancellation Reason
                </Label>
                <Select value={cancellationReason} onValueChange={setCancellationReason}>
                  <SelectTrigger className="h-10 bg-white border rounded-lg">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent
                    className="bg-white border rounded-lg shadow-lg"
                    position="popper"
                    align="start"
                    sideOffset={4}
                  >
                    <SelectGroup className="max-h-[160px] overflow-y-auto py-1">
                      {cancellationReasons.map((reason) => (
                        <SelectItem
                          key={reason}
                          value={reason}
                          className="hover:bg-red-50 data-[state=checked]:bg-red-100"
                        >
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="flex justify-between gap-3 pt-4 border-t mt-4">
                <div className="flex gap-3 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCancellation(false)}
                    className="flex-1 bg-white"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600"
                    disabled={!cancellationReason}
                  >
                    Confirm Cancellation
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
