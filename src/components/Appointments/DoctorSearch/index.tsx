import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import { useToast } from '@/components/ui/use-toast';
import { Search, Sliders } from 'lucide-react';
import VoiceSearch from './VoiceSearch';
import SearchFilters from './SearchFilters';
import SearchHistory from './SearchHistory';
import DoctorCard from './DoctorCard';
import type { SearchFilters as SearchFiltersType, SearchHistory as SearchHistoryType, SavedSearch, DoctorSearchResult } from '@/types/search';

export default function DoctorSearch() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [recentSearches, setRecentSearches] = useState<SearchHistoryType[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [searchResults, setSearchResults] = useState<DoctorSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load search history from localStorage on mount
  useEffect(() => {
    const loadedRecent = localStorage.getItem('recentSearches');
    const loadedSaved = localStorage.getItem('savedSearches');

    if (loadedRecent) {
      setRecentSearches(JSON.parse(loadedRecent));
    }
    if (loadedSaved) {
      setSavedSearches(JSON.parse(loadedSaved));
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
  }, [savedSearches]);

  const handleSearch = async () => {
    if (!searchQuery.trim() && Object.keys(filters).length === 0) {
      toast({
        title: "Search Query Required",
        description: "Please enter a search term or apply filters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Add to recent searches
      if (searchQuery.trim()) {
        const newSearch: SearchHistoryType = {
          query: searchQuery,
          timestamp: new Date().toISOString(),
          filters: Object.keys(filters).length > 0 ? filters : undefined
        };

        setRecentSearches(prev => {
          const filtered = prev.filter(s => s.query !== searchQuery);
          return [newSearch, ...filtered].slice(0, 10);
        });
      }

      // TODO: Implement actual API call here
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock results
      setSearchResults([
        // Add mock results here
      ]);
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Failed to fetch search results. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceSearchResult = (transcript: string) => {
    setSearchQuery(transcript);
    handleSearch();
  };

  const handleVoiceSearchError = (error: string) => {
    toast({
      title: "Voice Search Error",
      description: error,
      variant: "destructive",
    });
  };

  const handleSaveFilters = () => {
    const name = searchQuery || 'Saved Search ' + (savedSearches.length + 1);
    const newSavedSearch: SavedSearch = {
      id: Date.now().toString(),
      name,
      timestamp: new Date().toISOString(),
      filters
    };

    setSavedSearches(prev => [...prev, newSavedSearch]);
    toast({
      title: "Filters Saved",
      description: "Your search filters have been saved for future use.",
    });
  };

  const handleRemoveSavedSearch = (id: string) => {
    setSavedSearches(prev => prev.filter(s => s.id !== id));
    toast({
      title: "Search Removed",
      description: "The saved search has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctors by name, specialization, or hospital..."
            className="pl-10 pr-4"
          />
        </div>
        <VoiceSearch
          onResult={handleVoiceSearchResult}
          onError={handleVoiceSearchError}
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Sliders className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SearchFilters
              filters={filters}
              onFilterChange={setFilters}
              onSaveFilters={handleSaveFilters}
            />
          </SheetContent>
        </Sheet>
        <Button onClick={handleSearch} disabled={isLoading}>
          Search
        </Button>
      </div>

      {/* Search History */}
      {(recentSearches.length > 0 || savedSearches.length > 0) && !searchResults.length && (
        <SearchHistory
          recentSearches={recentSearches}
          savedSearches={savedSearches}
          onSelectSearch={(query, searchFilters) => {
            setSearchQuery(query);
            if (searchFilters) {
              setFilters(searchFilters);
            }
            handleSearch();
          }}
          onSaveSearch={(search) => {
            const newSavedSearch: SavedSearch = {
              id: Date.now().toString(),
              name: search.query,
              timestamp: new Date().toISOString(),
              filters: search.filters || {}
            };
            setSavedSearches(prev => [...prev, newSavedSearch]);
          }}
          onRemoveSavedSearch={handleRemoveSavedSearch}
        />
      )}

      {/* Search Results */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
          <p className="mt-2 text-sm text-gray-600">Searching for doctors...</p>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
