export type NotificationType = 'health_alert' | 'appointment' | 'order';

export interface INotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Export the interface as Notification
export type Notification = INotification;