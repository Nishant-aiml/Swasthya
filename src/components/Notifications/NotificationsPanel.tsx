import React, { useState, useEffect, useCallback } from 'react';
import { Bell, X, Settings } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { notificationService } from '../../services/notificationService';
import { useNotificationSound } from '../../hooks/useNotificationSound';
import NotificationList from './NotificationList';
import NotificationPreferences from './NotificationPreferences';
import { showPushNotification } from '../../utils/notificationHelpers';

export default function NotificationsPanel() {
  // Move all useState declarations to the top
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Custom hooks after useState
  const { notifications, markAsRead, clearAll } = useNotifications();
  const { playSound } = useNotificationSound();
  
  // Derived state
  const unreadCount = notifications.filter(n => !n.read).length;

  // Event handlers using useCallback
  const handleMarkAsRead = useCallback(async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      markAsRead(id);
      playSound('success');
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }, [markAsRead, playSound]);

  const handleClearAll = useCallback(async () => {
    try {
      await notificationService.clearAllNotifications();
      clearAll();
    } catch (error) {
      console.error('Failed to clear notifications:', error);
    }
  }, [clearAll]);

  // Side effects
  useEffect(() => {
    const unsubscribe = notificationService.subscribeToNotifications((notification) => {
      playSound('new');
      showPushNotification(notification);
    });

    return () => unsubscribe();
  }, [playSound]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-gray-500 hover:text-gray-700"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-medium">Notifications</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowPreferences(true)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {showPreferences ? (
            <NotificationPreferences onClose={() => setShowPreferences(false)} />
          ) : (
            <NotificationList
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onClearAll={handleClearAll}
            />
          )}
        </div>
      )}
    </div>
  );
}