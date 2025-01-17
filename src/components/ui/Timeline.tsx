import React from 'react';

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative space-y-4">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
      {children}
    </div>
  );
}

export function TimelineItem({ date, title, description, icon }: TimelineItemProps) {
  return (
    <div className="relative pl-10 pb-4">
      <div className="absolute left-2 -translate-x-1/2 bg-white p-1 rounded-full border border-gray-200">
        {icon}
      </div>
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-sm text-gray-500">{date}</div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );
}
