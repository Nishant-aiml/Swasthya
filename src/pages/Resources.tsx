import React, { useState } from 'react';
import { VideoLibrary } from '@/components/Resources/VideoLibrary';
import { Webinars } from '@/components/Resources/Webinars';
import { Podcasts } from '@/components/Resources/Podcasts';
import { VirtualTours } from '@/components/Resources/VirtualTours';
import { Forums } from '@/components/Resources/Forums';
import { HealthGroups } from '@/components/Resources/HealthGroups';
import { ChatRooms } from '@/components/Resources/ChatRooms';
import { UserContentSharing } from '@/components/Resources/UserContent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Video, MessageCircle, Headphones, Box, Users, MessageSquare, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  mockVideos,
  mockWebinars,
  mockPodcasts,
  mockTours,
  mockPosts,
  mockGroups,
  mockChatRooms,
  mockUserContent
} from '@/mocks/resources';

export default function Resources() {
  const [activeTab, setActiveTab] = useState('videos');

  const handleVideoSelect = (video: any) => {
    toast.info(`Playing video: ${video.title}`);
  };

  const handleWebinarRegister = (id: string) => {
    toast.success('Successfully registered for the webinar!');
  };

  const handlePodcastPlay = (podcast: any) => {
    toast.info(`Playing podcast: ${podcast.title}`);
  };

  const handlePodcastDownload = (podcast: any) => {
    toast.success(`Downloading podcast: ${podcast.title}`);
  };

  const handleTourSelect = (tour: any) => {
    toast.info(`Loading ${tour.type} experience: ${tour.title}`);
  };

  const handleForumPost = (post: any) => {
    toast.info(`Opening post: ${post.title}`);
  };

  const handleJoinGroup = (id: string) => {
    toast.success('Successfully joined the group!');
  };

  const handleJoinRoom = (id: string) => {
    toast.success('Successfully joined the chat room!');
  };

  const handleContentInteraction = (id: string, type: string) => {
    toast.success(`${type} interaction recorded!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Health Resources & Community</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            <span>Videos</span>
          </TabsTrigger>
          <TabsTrigger value="webinars" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>Webinars</span>
          </TabsTrigger>
          <TabsTrigger value="podcasts" className="flex items-center gap-2">
            <Headphones className="w-4 h-4" />
            <span>Podcasts</span>
          </TabsTrigger>
          <TabsTrigger value="virtual-tours" className="flex items-center gap-2">
            <Box className="w-4 h-4" />
            <span>Virtual Tours</span>
          </TabsTrigger>
          <TabsTrigger value="forums" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>Forums</span>
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Groups</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span>Community</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="videos">
            <VideoLibrary
              videos={mockVideos}
              onVideoSelect={handleVideoSelect}
            />
          </TabsContent>

          <TabsContent value="webinars">
            <Webinars
              webinars={mockWebinars}
              onRegister={handleWebinarRegister}
              onJoin={handleWebinarRegister}
              onViewRecording={handleWebinarRegister}
            />
          </TabsContent>

          <TabsContent value="podcasts">
            <Podcasts
              podcasts={mockPodcasts}
              onPlay={handlePodcastPlay}
              onDownload={handlePodcastDownload}
            />
          </TabsContent>

          <TabsContent value="virtual-tours">
            <VirtualTours
              tours={mockTours}
              onTourSelect={handleTourSelect}
            />
          </TabsContent>

          <TabsContent value="forums">
            <Forums
              posts={mockPosts}
              onPostClick={handleForumPost}
              onUpvote={(id) => handleContentInteraction(id, 'upvote')}
              onDownvote={(id) => handleContentInteraction(id, 'downvote')}
            />
          </TabsContent>

          <TabsContent value="groups">
            <HealthGroups
              groups={mockGroups}
              onJoinGroup={handleJoinGroup}
              onViewActivity={(groupId, activityId) => {
                toast.info(`Opening activity in group ${groupId}`);
              }}
            />
          </TabsContent>

          <TabsContent value="content">
            <UserContentSharing
              contents={mockUserContent}
              onLike={(id) => handleContentInteraction(id, 'like')}
              onComment={(id) => handleContentInteraction(id, 'comment')}
              onShare={(id) => handleContentInteraction(id, 'share')}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
