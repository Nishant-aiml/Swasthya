import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Calendar, Package, X, Filter, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'health-alert' | 'appointment' | 'order';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  action?: {
    label: string;
    handler: () => void;
  };
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'health-alert',
      title: 'COVID-19 Vaccination Drive',
      message: 'New vaccination center opened in your area. Book your slot now.',
      timestamp: new Date(),
      isRead: false,
      priority: 'high',
      action: {
        label: 'Book Slot',
        handler: () => console.log('Booking slot...')
      }
    },
    {
      id: '2',
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Dr. Sarah Johnson - General Checkup tomorrow at 10:00 AM',
      timestamp: new Date(),
      isRead: false,
      priority: 'medium',
      action: {
        label: 'View Details',
        handler: () => console.log('Viewing appointment...')
      }
    },
    {
      id: '3',
      type: 'order',
      title: 'Order Delivered',
      message: 'Your medicine order #12345 has been delivered',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'health-alert' | 'appointment' | 'order'>('all');
  const [isOpen, setIsOpen] = useState(false);

  // Close notification center when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.notification-center')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Close notification center when clicking on a link or scrolling
  useEffect(() => {
    const handleAutoClose = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleAutoClose);
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', handleAutoClose);
    });

    return () => {
      window.removeEventListener('scroll', handleAutoClose);
      document.querySelectorAll('a').forEach(link => {
        link.removeEventListener('click', handleAutoClose);
      });
    };
  }, [isOpen]);

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'health-alert':
        return AlertTriangle;
      case 'appointment':
        return Calendar;
      case 'order':
        return Package;
      default:
        return Bell;
    }
  };

  const getTypeBadgeColor = (type: Notification['type']) => {
    switch (type) {
      case 'health-alert':
        return 'bg-red-100 text-red-800';
      case 'appointment':
        return 'bg-blue-100 text-blue-800';
      case 'order':
        return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-red-500';
      case 'medium':
        return 'border-yellow-500';
      case 'low':
        return 'border-gray-300';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  return (
    <div className="relative notification-center">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="relative p-2 rounded-lg text-gray-600 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[320px] max-h-[480px] bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-3 z-10">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-thin">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                  filter === 'all'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                  filter === 'unread'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter('health-alert')}
                className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                  filter === 'health-alert'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Health Alerts
              </button>
              <button
                onClick={() => setFilter('appointment')}
                className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                  filter === 'appointment'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Appointments
              </button>
              <button
                onClick={() => setFilter('order')}
                className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                  filter === 'order'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Orders
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[320px]">
            {filteredNotifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => {
                  const Icon = getTypeIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-3 hover:bg-gray-50 transition-colors ${
                        !notification.isRead ? 'bg-blue-50/30' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className={`flex-shrink-0 rounded-full p-1.5 ${getTypeBadgeColor(notification.type)}`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{notification.title}</p>
                            <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                              {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-gray-600 line-clamp-2">{notification.message}</p>
                          {notification.action && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                notification.action?.handler();
                                markAsRead(notification.id);
                              }}
                              className="mt-1.5 text-xs font-medium text-purple-600 hover:text-purple-700"
                            >
                              {notification.action.label}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {notifications.some(n => !n.isRead) && (
            <div className="sticky bottom-0 p-2 bg-white border-t border-gray-200">
              <button
                onClick={markAllAsRead}
                className="w-full px-3 py-1.5 text-xs font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}