import React from 'react';
import { Webinar } from '@/types/Resources';
import { Calendar, Clock, Users, Video, Globe } from 'lucide-react';
import { format } from 'date-fns';

interface WebinarsProps {
  webinars: Webinar[];
  onRegister: (webinarId: string) => void;
  onJoin: (webinarId: string) => void;
  onViewRecording: (webinarId: string) => void;
}

export function Webinars({ webinars, onRegister, onJoin, onViewRecording }: WebinarsProps) {
  const upcomingWebinars = webinars.filter(w => new Date(w.startTime) > new Date());
  const liveWebinars = webinars.filter(w => w.isLive);
  const pastWebinars = webinars.filter(w => new Date(w.endTime) < new Date() && !w.isLive);

  const WebinarCard = ({ webinar }: { webinar: Webinar }) => {
    const isUpcoming = new Date(webinar.startTime) > new Date();
    const isPast = new Date(webinar.endTime) < new Date() && !webinar.isLive;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{webinar.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{webinar.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>{format(new Date(webinar.startTime), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>{format(new Date(webinar.startTime), 'h:mm a')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>{webinar.registeredUsers} registered</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>{webinar.language}</span>
          </div>
        </div>

        <div className="pt-4 border-t dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{webinar.expertName}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{webinar.expertCredentials}</p>
            </div>
            {webinar.isLive ? (
              <button
                onClick={() => onJoin(webinar.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                Join Live
              </button>
            ) : isUpcoming ? (
              <button
                onClick={() => onRegister(webinar.id)}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium"
              >
                Register Now
              </button>
            ) : isPast && webinar.recordingUrl ? (
              <button
                onClick={() => onViewRecording(webinar.id)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                Watch Recording
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {liveWebinars.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Live Now</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {liveWebinars.map(webinar => (
              <WebinarCard key={webinar.id} webinar={webinar} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">Upcoming Webinars</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {upcomingWebinars.map(webinar => (
            <WebinarCard key={webinar.id} webinar={webinar} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Past Webinars</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {pastWebinars.map(webinar => (
            <WebinarCard key={webinar.id} webinar={webinar} />
          ))}
        </div>
      </section>
    </div>
  );
}
