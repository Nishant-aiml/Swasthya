import React, { useState } from 'react';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Calendar } from "@/components/ui/Calendar";
import { useNavigate } from 'react-router-dom';
import { Doctor, DoctorReview } from '@/types/doctor';

interface DoctorProfileProps {
  doctor: Doctor;
  onClose: () => void;
}

export function DoctorProfile({ doctor, onClose }: DoctorProfileProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("about");
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate(`/book-appointment/${doctor.id}`, {
      state: {
        doctor,
        selectedDate,
      },
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-start gap-4">
          <Avatar
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-24 h-24"
          />
          <div>
            <h2 className="text-2xl font-bold">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialization}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{doctor.experience} years exp.</Badge>
              <Badge variant="secondary">⭐ {doctor.rating}</Badge>
              <Badge variant="secondary">{doctor.reviewCount} reviews</Badge>
            </div>
          </div>
        </div>
        <Button onClick={onClose} variant="outline">
          Close
        </Button>
      </div>

      <Tabs 
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-6"
      >
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-600">{doctor.about}</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              <ul className="list-disc list-inside text-gray-600">
                {doctor.education?.map((edu, index) => (
                  <li key={index}>
                    {edu.degree} - {edu.institution} ({edu.year})
                  </li>
                ))}
              </ul>
            </section>

            {doctor.languages && (
              <section>
                <h3 className="text-lg font-semibold mb-2">Languages</h3>
                <div className="flex gap-2">
                  {doctor.languages.map((lang, index) => (
                    <Badge key={index} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h3 className="text-lg font-semibold mb-2">Subspecialties</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.subspecialties?.map((service, index) => (
                  <Badge key={index} variant="outline">
                    {service}
                  </Badge>
                ))}
              </div>
            </section>

            {doctor.expertise && (
              <section>
                <h3 className="text-lg font-semibold mb-2">Expertise</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {doctor.expertise.map((exp, index) => (
                    <li key={index}>{exp}</li>
                  ))}
                </ul>
              </section>
            )}

            {doctor.awards && (
              <section>
                <h3 className="text-lg font-semibold mb-2">Awards</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {doctor.awards.map((award, index) => (
                    <li key={index}>
                      {award.title} - {award.organization} ({award.year})
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </TabsContent>

        <TabsContent value="availability">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-4">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Available Slots</h3>
              {doctor.availableSlots?.map((slot, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium">
                    {new Date(slot.date).toLocaleDateString()}
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {slot.slots.map((time, idx) => (
                      <Badge key={idx} variant="outline">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Fees</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Consultation: ₹{doctor.consultationFee}
                </p>
                {doctor.acceptsAyushman && (
                  <Badge variant="success">Accepts Ayushman Card</Badge>
                )}
              </div>
            </section>

            <Button
              onClick={handleBookAppointment}
              className="w-full mt-4"
              size="lg"
            >
              Book Appointment
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-6">
            {doctor.reviews?.map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.patientName}</span>
                    {review.verified && (
                      <Badge variant="secondary">Verified Patient</Badge>
                    )}
                  </div>
                  <Badge variant="outline">⭐ {review.rating}</Badge>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <span>Punctuality: {review.metrics.punctuality}/5</span>
                  <span>Communication: {review.metrics.communication}/5</span>
                  <span>Treatment: {review.metrics.treatment}/5</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{review.date}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
