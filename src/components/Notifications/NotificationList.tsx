import React from 'react';
import { groupNotificationsByDate } from '../../utils/notificationHelpers';
import NotificationItem from './NotificationItem';
import { Notification } from '../../types/notifications';

export interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export default function NotificationList({ notifications, onMarkAsRead, onClearAll }: NotificationListProps) {
  const groupedNotifications = groupNotificationsByDate(notifications);

  return (
    <div className="divide-y divide-gray-100">
      {notifications.length > 0 && (
        <div className="px-4 py-2 flex justify-end">
          <button
            onClick={onClearAll}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear All
          </button>
        </div>
      )}
      {groupedNotifications.map(([date, notifications]) => (
        <div key={date}>
          <div className="px-4 py-2 bg-gray-50">
            <span className="text-sm font-medium text-gray-600">
              {new Date(date).toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
              />
            ))}
          </div>
        </div>
      ))}
      {notifications.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No notifications
        </div>
      )}
    </div>
  );
}