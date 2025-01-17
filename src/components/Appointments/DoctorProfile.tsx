import React, { useState } from 'react';
import { Star, MapPin, Clock, Languages, CreditCard, Video, GraduationCap, Award, FileText, BookOpen, MessageSquare, ThumbsUp, Building2, CheckCircle2, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import dynamic from "next/dynamic";
import Map from "@/components/Map";

// Dynamically import the map component to avoid SSR issues

interface Publication {
  title: string;
  journal: string;
  year: string;
  url: string;
}

interface Certification {
  name: string;
  issuedBy: string;
  year: string;
  isVerified: boolean;
}

interface CaseStudy {
  title: string;
  description: string;
  beforeImage?: string;
  afterImage?: string;
  outcome: string;
}

interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  metrics: {
    punctuality: number;
    communication: number;
    effectiveness: number;
  };
  isVerified: boolean;
}

interface Doctor {
  id: string;
  name: string;
  image: string;
  specialization: string;
  subSpecialization?: string;
  qualifications: {
    degree: string;
    institution: string;
    year: string;
    isVerified: boolean;
  }[];
  experience: number;
  languages: string[];
  consultationFee: number;
  location: {
    clinic: string;
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  rating: number;
  reviewCount: number;
  reviews: Review[];
  acceptsAyushman: boolean;
  availableSlots: {
    date: string;
    slots: string[];
  }[];
  publications: Publication[];
  certifications: Certification[];
  memberships: string[];
  caseStudies: CaseStudy[];
  responseRate: number;
  responseTime: string;
  isVerified: boolean;
}

interface DoctorProfileProps {
  doctor: Doctor;
  onBookAppointment: (doctorId: string, slot: { date: string; time: string; type: 'in-person' | 'video' | 'phone' }) => void;
}

export default function DoctorProfile({ doctor, onBookAppointment }: DoctorProfileProps) {
  const [selectedDate, setSelectedDate] = React.useState<string>('');
  const [consultationType, setConsultationType] = React.useState<'in-person' | 'video' | 'phone'>('in-person');
  const [activeTab, setActiveTab] = React.useState('overview');

  const averageRating = {
    punctuality: doctor.reviews.reduce((acc, r) => acc + r.metrics.punctuality, 0) / doctor.reviews.length,
    communication: doctor.reviews.reduce((acc, r) => acc + r.metrics.communication, 0) / doctor.reviews.length,
    effectiveness: doctor.reviews.reduce((acc, r) => acc + r.metrics.effectiveness, 0) / doctor.reviews.length,
  };

  return (
    <Card className="p-6 space-y-6">
      {/* Doctor Header */}
      <div className="flex items-start gap-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">{doctor.name}</h3>
                {doctor.isVerified && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-gray-600">{doctor.specialization}</p>
              {doctor.subSpecialization && (
                <p className="text-sm text-gray-500">{doctor.subSpecialization}</p>
              )}
            </div>
            {doctor.acceptsAyushman && (
              <Badge variant="outline" className="flex items-center gap-1">
                <CreditCard className="h-3 w-3" />
                Ayushman Card Accepted
              </Badge>
            )}
          </div>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{doctor.rating}</span>
              <span className="text-gray-500">({doctor.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{doctor.experience} years exp</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <span>{doctor.responseRate}% response rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="caseStudies">Case Studies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Languages and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((lang) => (
                  <Badge key={lang} variant="outline">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Location</h4>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                <div>
                  <p className="font-medium">{doctor.location.clinic}</p>
                  <p className="text-gray-600">{doctor.location.address}</p>
                  <p className="text-gray-600">{doctor.location.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-48 rounded-lg overflow-hidden">
            <Map
              center={doctor.location.coordinates}
              zoom={15}
              markers={[{
                position: doctor.location.coordinates,
                title: doctor.location.clinic
              }]}
            />
          </div>

          {/* Professional Memberships */}
          <div>
            <h4 className="font-medium mb-2">Professional Memberships</h4>
            <div className="flex flex-wrap gap-2">
              {doctor.memberships.map((membership, index) => (
                <Badge key={index} variant="outline">
                  {membership}
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="qualifications" className="space-y-6">
          {/* Education */}
          <div>
            <h4 className="font-medium mb-4">Education</h4>
            <div className="space-y-4">
              {doctor.qualifications.map((qual, index) => (
                <div key={index} className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{qual.degree}</span>
                      {qual.isVerified && (
                        <Badge variant="outline" className="text-xs">Verified</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{qual.institution}</p>
                    <p className="text-sm text-gray-500">{qual.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-medium mb-4">Certifications</h4>
            <div className="space-y-4">
              {doctor.certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{cert.name}</span>
                      {cert.isVerified && (
                        <Badge variant="outline" className="text-xs">Verified</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{cert.issuedBy}</p>
                    <p className="text-sm text-gray-500">{cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div>
            <h4 className="font-medium mb-4">Research Publications</h4>
            <div className="space-y-4">
              {doctor.publications.map((pub, index) => (
                <div key={index} className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-purple-500 mt-1" />
                  <div>
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-blue-600"
                    >
                      {pub.title}
                    </a>
                    <p className="text-sm text-gray-600">{pub.journal}</p>
                    <p className="text-sm text-gray-500">{pub.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          {/* Rating Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Punctuality</label>
              <Progress value={averageRating.punctuality * 20} className="mt-2" />
              <p className="text-sm text-gray-500 mt-1">{averageRating.punctuality.toFixed(1)}/5</p>
            </div>
            <div>
              <label className="text-sm font-medium">Communication</label>
              <Progress value={averageRating.communication * 20} className="mt-2" />
              <p className="text-sm text-gray-500 mt-1">{averageRating.communication.toFixed(1)}/5</p>
            </div>
            <div>
              <label className="text-sm font-medium">Treatment Effectiveness</label>
              <Progress value={averageRating.effectiveness * 20} className="mt-2" />
              <p className="text-sm text-gray-500 mt-1">{averageRating.effectiveness.toFixed(1)}/5</p>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {doctor.reviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.patientName}</span>
                    {review.isVerified && (
                      <Badge variant="outline" className="text-xs">Verified Patient</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>Punctuality: {review.metrics.punctuality}/5</span>
                    <span>Communication: {review.metrics.communication}/5</span>
                    <span>Effectiveness: {review.metrics.effectiveness}/5</span>
                  </div>
                  <p className="mt-1">{review.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="caseStudies" className="space-y-6">
          {doctor.caseStudies.map((study, index) => (
            <Card key={index} className="p-4">
              <h4 className="font-medium mb-2">{study.title}</h4>
              <p className="text-gray-600 mb-4">{study.description}</p>
              {(study.beforeImage || study.afterImage) && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {study.beforeImage && (
                    <div>
                      <p className="text-sm font-medium mb-2">Before</p>
                      <img
                        src={study.beforeImage}
                        alt="Before treatment"
                        className="rounded-lg"
                      />
                    </div>
                  )}
                  {study.afterImage && (
                    <div>
                      <p className="text-sm font-medium mb-2">After</p>
                      <img
                        src={study.afterImage}
                        alt="After treatment"
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-green-500" />
                <span className="text-gray-700">{study.outcome}</span>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Consultation Fee and Booking */}
      <div className="border-t pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Consultation Fee</h4>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-semibold">₹{doctor.consultationFee}</p>
              {doctor.acceptsAyushman && (
                <Badge variant="outline">Ayushman Card Accepted</Badge>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Consultation Type</h4>
            <div className="flex gap-2">
              <Button
                variant={consultationType === 'in-person' ? 'default' : 'outline'}
                onClick={() => setConsultationType('in-person')}
                className="flex-1 bg-green-500 text-white hover:bg-green-600"
              >
                <Building2 className="h-4 w-4 mr-2" />
                In-Person
              </Button>
              <Button
                variant={consultationType === 'video' ? 'default' : 'outline'}
                onClick={() => setConsultationType('video')}
                className="flex-1 bg-green-500 text-white hover:bg-green-600"
              >
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
              <Button
                variant={consultationType === 'phone' ? 'default' : 'outline'}
                onClick={() => setConsultationType('phone')}
                className="flex-1 bg-green-500 text-white hover:bg-green-600"
              >
                <Phone className="h-4 w-4 mr-2" />
                Phone
              </Button>
            </div>
          </div>
        </div>

        {/* Available Slots */}
        <div className="mt-6">
          <h4 className="font-medium mb-4">Available Slots</h4>
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {doctor.availableSlots.map((dateSlot) => (
                <Button
                  key={dateSlot.date}
                  variant={selectedDate === dateSlot.date ? 'default' : 'outline'}
                  onClick={() => setSelectedDate(dateSlot.date)}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  {new Date(dateSlot.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </Button>
              ))}
            </div>
            {selectedDate && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {doctor.availableSlots
                  .find((ds) => ds.date === selectedDate)
                  ?.slots.map((slot) => (
                    <Button
                      key={slot}
                      variant="outline"
                      onClick={() => onBookAppointment(doctor.id, {
                        date: selectedDate,
                        time: slot,
                        type: consultationType
                      })}
                      className="bg-green-500 text-white hover:bg-green-600"
                    >
                      {slot}
                    </Button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
