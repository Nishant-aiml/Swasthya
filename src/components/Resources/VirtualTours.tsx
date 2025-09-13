import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Eye, Video, Play, Pause, RotateCw } from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: number;
}

export default function VirtualTours() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const tours: Tour[] = [
    {
      id: '1',
      title: 'Emergency Department Tour',
      description: 'Get familiar with our state-of-the-art emergency facilities',
      thumbnail: '/images/tours/emergency.jpg',
      videoUrl: '/videos/emergency-tour.mp4',
      duration: '5:30',
      views: 1234
    },
    {
      id: '2',
      title: 'Maternity Ward Tour',
      description: 'Explore our comfortable maternity facilities',
      thumbnail: '/images/tours/maternity.jpg',
      videoUrl: '/videos/maternity-tour.mp4',
      duration: '4:45',
      views: 987
    },
    {
      id: '3',
      title: 'Pediatric Center Tour',
      description: 'See our child-friendly pediatric facilities',
      thumbnail: '/images/tours/pediatric.jpg',
      videoUrl: '/videos/pediatric-tour.mp4',
      duration: '6:15',
      views: 756
    }
  ];

  const handleTourSelect = (tour: Tour) => {
    setSelectedTour(tour);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Virtual Hospital Tours</h2>
        <p className="text-gray-600">
          Take a virtual walk through our facilities
        </p>
      </div>

      {selectedTour ? (
        <div className="space-y-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              src={selectedTour.videoUrl}
              poster={selectedTour.thumbnail}
              className="w-full h-full object-cover"
              autoPlay={isPlaying}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="font-medium">{selectedTour.title}</h3>
                  <p className="text-sm opacity-80">{selectedTour.duration}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-white/80"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedTour(null)}
                    className="text-white hover:text-white/80"
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-600">{selectedTour.description}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <Card
              key={tour.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleTourSelect(tour)}
            >
              <div className="relative aspect-video">
                <img
                  src={tour.thumbnail}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Video className="h-12 w-12 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                  {tour.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{tour.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{tour.description}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span>{tour.views.toLocaleString()} views</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
