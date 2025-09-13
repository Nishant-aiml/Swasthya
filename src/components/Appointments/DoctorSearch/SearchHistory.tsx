import React from 'react';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Search, Clock, BookmarkPlus, Bookmark } from 'lucide-react';
import type { SearchHistory, SavedSearch } from '@/types/search';

interface SearchHistoryProps {
  history?: string[];
  onSelect: (query: string) => void;
  onClear: () => void;
}

export default function SearchHistory({ history = [], onSelect, onClear }: SearchHistoryProps) {
  return (
    <div className="space-y-6">
      {/* Recent Searches */}
      <div>
        <h3 className="text-sm font-medium mb-2">Recent Searches</h3>
        <ScrollArea className="h-[200px]">
          <div className="space-y-2">
            {history.map((search, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-sm"
                  onClick={() => onSelect(search)}
                >
                  <Clock className="h-4 w-4" />
                  <span>{search}</span>
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Saved Searches */}
      <div>
        <h3 className="text-sm font-medium mb-2">Saved Searches</h3>
        <ScrollArea className="h-[200px]">
          <div className="space-y-2">
            {/* Removed savedSearches.map as it's not defined in the new props */}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
