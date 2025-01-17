import { NotificationType, Notification } from '../types/notifications';

// Service for handling notification operations
class NotificationService {
  private static instance: NotificationService;
  private webSocket: WebSocket | null = null;
  private notificationCallbacks: ((notification: Notification) => void)[] = [];
  private maxReconnectAttempts = 3;
  private reconnectAttempts = 0;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  private constructor() {
    this.initializeWebSocket();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private initializeWebSocket() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnection attempts reached. WebSocket notifications will be disabled.');
      return;
    }

    // In production, use secure WebSocket with your actual backend URL
    const WS_URL = import.meta.env.PROD 
      ? 'wss://api.swasthyacare.com/notifications'
      : 'ws://localhost:8080/notifications';

    try {
      this.webSocket = new WebSocket(WS_URL);
      
      this.webSocket.onopen = () => {
        console.log('WebSocket connection established');
        this.reconnectAttempts = 0; // Reset attempts on successful connection
      };

      this.webSocket.onmessage = (event) => {
        const notification = JSON.parse(event.data);
        this.notificationCallbacks.forEach(callback => callback(notification));
      };

      this.webSocket.onerror = (error) => {
        console.warn('WebSocket error - notifications may be unavailable');
        this.reconnectAttempts++;
      };

      this.webSocket.onclose = () => {
        console.log('WebSocket connection closed');
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectTimeout = setTimeout(() => this.initializeWebSocket(), 5000);
        }
      };
    } catch (error) {
      console.warn('WebSocket initialization failed - notifications may be unavailable');
      this.reconnectAttempts++;
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectTimeout = setTimeout(() => this.initializeWebSocket(), 5000);
      }
    }
  }

  public disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.webSocket) {
      this.webSocket.close();
      this.webSocket = null;
    }
    this.reconnectAttempts = this.maxReconnectAttempts; // Prevent further reconnection attempts
  }

  subscribeToNotifications(callback: (notification: Notification) => void) {
    this.notificationCallbacks.push(callback);
    return () => {
      this.notificationCallbacks = this.notificationCallbacks.filter(cb => cb !== callback);
    };
  }

  async markAsRead(notificationId: string): Promise<void> {
    try {
      const response = await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationId }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  async clearAllNotifications(): Promise<void> {
    try {
      const response = await fetch('/api/notifications/clear-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear notifications');
      }
    } catch (error) {
      console.error('Error clearing notifications:', error);
      throw error;
    }
  }

  async getNotificationPreferences(): Promise<Record<NotificationType, boolean>> {
    try {
      const response = await fetch('/api/notifications/preferences');
      if (!response.ok) {
        throw new Error('Failed to fetch notification preferences');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
      throw error;
    }
  }

  async updateNotificationPreferences(
    preferences: Record<NotificationType, boolean>
  ): Promise<void> {
    try {
      const response = await fetch('/api/notifications/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error('Failed to update notification preferences');
      }
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      throw error;
    }
  }
}

export const notificationService = NotificationService.getInstance();