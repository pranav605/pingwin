// context/ProjectsContext.tsx
import { supabase } from '@/lib/supabase';
import Constants from 'expo-constants';
import React, { createContext, useContext, useEffect, useState } from 'react';

type ProjectsContextType = {
  projects: any[]; // replace with your Project type later
  loading: boolean;
  refresh: () => Promise<void>;
};

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return context;
};

export const ProjectsProvider = ({ children }:any) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = Constants.expoConfig?.extra?.backendUrl;

  const fetchProjects = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const res = await fetch(`${backendUrl}/api/projects`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await res.json();
      const mappedProjects = data.map((p: any) => ({
                id: p.id,
                name: p.name,
                description: p.description,
                status: p.is_active ? 'active' : 'inactive',
                icon: 'cube-outline', // default icon
                alertsToday: '0',     // default
                apiKey: '',
     }));
      setProjects(mappedProjects);
    } catch (err) {
      console.error('Fetch projects error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, loading, refresh: fetchProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};