'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { FormattedLocation, getLocations } from '@/data/locations';

interface LocationsContextType {
  locations: FormattedLocation[];
  isLoading: boolean;
  error: Error | null;
}

const LocationsContext = createContext<LocationsContextType>({
  locations: [],
  isLoading: true,
  error: null,
});

export function LocationsProvider({ children }: { children: React.ReactNode }) {
  const [locations, setLocations] = useState<FormattedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocations();
  }, []);

  return (
    <LocationsContext.Provider value={{ locations, isLoading, error }}>
      {children}
    </LocationsContext.Provider>
  );
}

export function useLocations() {
  const context = useContext(LocationsContext);
  if (context === undefined) {
    throw new Error('useLocations must be used within a LocationsProvider');
  }
  return context;
} 