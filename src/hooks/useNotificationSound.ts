import { useRef, useCallback, useEffect, useState } from 'react';

export function useNotificationSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [canPlaySound, setCanPlaySound] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Initialize audio elements
  useEffect(() => {
    const notificationAudio = new Audio('/sounds/notification.mp3');
    const successAudio = new Audio('/sounds/success.mp3');
    
    // Pre-load both sounds
    notificationAudio.load();
    successAudio.load();
    
    setAudio(notificationAudio);
    audioRef.current = notificationAudio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle user interaction
  useEffect(() => {
    const handleInteraction = () => {
      setCanPlaySound(true);
    };

    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => document.addEventListener(event, handleInteraction, { once: true }));

    return () => {
      events.forEach(event => document.removeEventListener(event, handleInteraction));
    };
  }, []);

  const playSound = useCallback((type: 'new' | 'success' = 'new') => {
    if (!canPlaySound || !audio) {
      console.log('Sound will play after user interaction');
      return;
    }

    try {
      const source = type === 'new' ? '/sounds/notification.mp3' : '/sounds/success.mp3';
      
      if (audio.src !== source) {
        audio.src = source;
      }

      audio.currentTime = 0;
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Failed to play notification sound:', error);
        });
      }
    } catch (error) {
      console.warn('Error playing notification sound:', error);
    }
  }, [canPlaySound, audio]);

  return { playSound };
}