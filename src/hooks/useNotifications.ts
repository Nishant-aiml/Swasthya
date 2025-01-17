import { create } from 'zustand';
import { Notification } from '../types/notifications';

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

export const useNotifications = create<NotificationStore>((set) => ({
  notifications: [
    {
      id: '1',
      type: 'health_alert',
      title: 'COVID-19 Vaccination Drive',
      message: 'New vaccination center opened near you. Book your slot now.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: false
    },
    {
      id: '2',
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Reminder: Doctor appointment with Dr. Smith tomorrow at 10:00 AM',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      read: false
    },
    {
      id: '3',
      type: 'order',
      title: 'Medicine Order Update',
      message: 'Your order #12345 has been shipped and will arrive tomorrow.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      read: true
    }
  ],

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          read: false,
          ...notification
        },
        ...state.notifications
      ]
    })),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    })),

  clearAll: () => set({ notifications: [] })
}));