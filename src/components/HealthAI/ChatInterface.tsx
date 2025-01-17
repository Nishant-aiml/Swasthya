import React, { useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ScrollArea } from '../ui/ScrollArea';
import { Send, Loader2 } from 'lucide-react';

export interface Message {
  type: 'bot' | 'user';
  content: string;
  options?: string[];
}

interface ChatInterfaceProps {
  messages: Message[];
  userInput: string;
  loading: boolean;
  onUserInput: (input: string) => void;
  onSendMessage: () => void;
  onOptionClick?: (option: string) => void;
  placeholder?: string;
}

export default function ChatInterface({
  messages,
  userInput,
  loading,
  onUserInput,
  onSendMessage,
  onOptionClick,
  placeholder = "Type your message..."
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md h-[600px] overflow-hidden">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                {message.options && onOptionClick && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.options.map((option) => (
                      <Button
                        key={option}
                        variant="secondary"
                        size="sm"
                        onClick={() => onOptionClick(option)}
                        className="text-xs py-1 px-2 h-auto min-h-[24px]"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-gray-50">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={userInput}
            onChange={(e) => onUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={loading}
            className="flex-1"
          />
          <Button
            onClick={onSendMessage}
            disabled={loading || !userInput.trim()}
            className="px-3"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
