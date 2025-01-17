import type { NotificationType, Notification } from '../types/notifications';

export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'health_alert':
      return 'AlertCircle';
    case 'appointment':
      return 'Calendar';
    case 'order':
      return 'Package';
    default:
      return 'Bell';
  }
};

export const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case 'health_alert':
      return 'red';
    case 'appointment':
      return 'blue';
    case 'order':
      return 'emerald';
    default:
      return 'gray';
  }
};

export const formatTimeAgo = (date: string): string => {
  const now = new Date();
  const notificationDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - notificationDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return notificationDate.toLocaleDateString();
};

export const groupNotificationsByDate = (notifications: Notification[]) => {
  const groups = notifications.reduce((acc, notification) => {
    const date = new Date(notification.timestamp).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notification);
    return acc;
  }, {} as Record<string, Notification[]>);

  return Object.entries(groups).sort((a, b) => 
    new Date(b[0]).getTime() - new Date(a[0]).getTime()
  );
};

export const getPushNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showPushNotification = async (notification: Notification) => {
  if (await getPushNotificationPermission()) {
    const icon = `/icons/${getNotificationIcon(notification.type).toLowerCase()}.png`;
    
    new Notification(notification.title, {
      body: notification.message,
      icon,
      badge: icon,
      tag: notification.id,
    });
  }
};