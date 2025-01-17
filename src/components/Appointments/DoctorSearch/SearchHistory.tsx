import React from 'react';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Search, Clock, BookmarkPlus, Bookmark } from 'lucide-react';
import type { SearchHistory, SavedSearch } from '@/types/search';

interface SearchHistoryProps {
  recentSearches: SearchHistory[];
  savedSearches: SavedSearch[];
  onSelectSearch: (query: string, filters?: any) => void;
  onSaveSearch: (search: SearchHistory) => void;
  onRemoveSavedSearch: (id: string) => void;
}

export default function SearchHistoryComponent({
  recentSearches,
  savedSearches,
  onSelectSearch,
  onSaveSearch,
  onRemoveSavedSearch
}: SearchHistoryProps) {
  return (
    <div className="space-y-6">
      {/* Recent Searches */}
      <div>
        <h3 className="text-sm font-medium mb-2">Recent Searches</h3>
        <ScrollArea className="h-[200px]">
          <div className="space-y-2">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-sm"
                  onClick={() => onSelectSearch(search.query, search.filters)}
                >
                  <Clock className="h-4 w-4" />
                  <span>{search.query}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSaveSearch(search)}
                >
                  <BookmarkPlus className="h-4 w-4" />
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
            {savedSearches.map((saved) => (
              <div
                key={saved.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-sm"
                  onClick={() => onSelectSearch(saved.name, saved.filters)}
                >
                  <Bookmark className="h-4 w-4" />
                  <span>{saved.name}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveSavedSearch(saved.id)}
                >
                  <Bookmark className="h-4 w-4 text-blue-500" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
