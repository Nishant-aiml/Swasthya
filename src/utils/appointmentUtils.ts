import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AppointmentDetails {
  doctorName: string;
  specialization: string;
  hospitalName: string;
  address: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  appointmentId: string;
  acceptsAyushman: boolean;
  ayushmanCardNumber?: string;
  specialInstructions?: string;
}

export const generateAppointmentPDF = (appointment: AppointmentDetails) => {
  const doc = new jsPDF();

  // Add header with logo or hospital name
  doc.setFontSize(20);
  doc.setTextColor(0, 128, 128); // Teal color
  doc.text('Appointment Confirmation', 105, 20, { align: 'center' });

  // Add appointment ID and date
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128); // Gray color
  doc.text(`Booking ID: ${appointment.appointmentId}`, 20, 30);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 35);

  // Add main content
  const mainContent = [
    ['Doctor Details', ''],
    ['Name', appointment.doctorName],
    ['Specialization', appointment.specialization],
    ['', ''],
    ['Appointment Details', ''],
    ['Date', appointment.date],
    ['Time', appointment.time],
    ['Hospital', appointment.hospitalName],
    ['Address', appointment.address],
    ['', ''],
    ['Patient Details', ''],
    ['Name', appointment.patientName],
    ['Phone', appointment.patientPhone],
  ];

  if (appointment.acceptsAyushman && appointment.ayushmanCardNumber) {
    mainContent.push(['', '']);
    mainContent.push(['Ayushman Card', appointment.ayushmanCardNumber]);
  }

  autoTable(doc, {
    body: mainContent,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 40 },
      1: { cellWidth: 100 },
    },
    startY: 45,
  });

  if (appointment.specialInstructions) {
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Special Instructions:', 20, finalY + 10);
    doc.setFontSize(10);
    doc.text(appointment.specialInstructions, 20, finalY + 20);
  }

  // Add footer with QR code placeholder and notes
  const finalY = (doc as any).lastAutoTable.finalY || 180;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('Please arrive 15 minutes before your scheduled appointment time.', 20, finalY + 40);
  doc.text('For any queries, please contact our support at support@swasthya.com', 20, finalY + 45);

  // Save the PDF
  const fileName = `appointment-${appointment.appointmentId}.pdf`;
  doc.save(fileName);
};

export const formatAppointmentTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};
