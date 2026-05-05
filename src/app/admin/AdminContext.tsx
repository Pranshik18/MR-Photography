'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AdminProfile {
  name: string;
  email: string;
  bio: string;
  location: string;
  avatar: string;
}

interface AdminContextType {
  profile: AdminProfile;
  setProfile: (profile: AdminProfile) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const defaultProfile: AdminProfile = {
  name: 'Julian Vane',
  email: 'julian@nocturnalgallery.com',
  bio: 'Architect of shadow and light. Documenting the intersection of brutalism and human fragility.',
  location: 'Berlin, Germany',
  avatar: 'https://picsum.photos/seed/curator-large/400/400'
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<AdminProfile>(defaultProfile);

  useEffect(() => {
    const stored = localStorage.getItem('adminProfile');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) {
          setProfileState({ ...defaultProfile, ...parsed });
        }
      } catch (e) {
        console.error('Failed to parse adminProfile from localStorage:', e);
      }
    }

    const fetchFreshProfile = async () => {
      try {
        const response = await fetch('/api/admin/user');
        const result = await response.json();
        if (result.success) {
          setProfile(result.data);
        }
      } catch (error) {
        console.error('Error fetching fresh profile:', error);
      }
    };

    fetchFreshProfile();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const setProfile = useCallback((newProfile: AdminProfile) => {
    setProfileState(newProfile);
    localStorage.setItem('adminProfile', JSON.stringify(newProfile));
  }, []);

  return (
    <AdminContext.Provider value={{ profile, setProfile, searchQuery, setSearchQuery }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
