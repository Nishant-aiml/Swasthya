import React from 'react';
import { Bot, User } from 'lucide-react';

interface Message {
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  aiResponse?: {
    recommendations?: string[];
  };
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start space-x-3`}>
      {isBot && (
        <div className="bg-gradient-to-br from-emerald-100 to-blue-100 p-2 rounded-full">
          <Bot className="h-5 w-5 text-emerald-600" />
        </div>
      )}
      
      <div className={`flex flex-col space-y-2 max-w-[80%]`}>
        <div
          className={`p-4 rounded-2xl ${
            isBot
              ? 'bg-white shadow-sm'
              : 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
          }`}
        >
          <p className={isBot ? 'text-gray-800' : 'text-white'}>{message.content}</p>
          
          {isBot && message.aiResponse?.recommendations && (
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-emerald-600">Recommendations:</h4>
              <ul className="space-y-2">
                {message.aiResponse.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="inline-block w-5 h-5 bg-emerald-100 rounded-full text-emerald-600 flex-shrink-0 text-sm flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-gray-600">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <span className="text-xs text-gray-400 px-2">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {!isBot && (
        <div className="bg-gradient-to-br from-emerald-500 to-blue-500 p-2 rounded-full">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
}