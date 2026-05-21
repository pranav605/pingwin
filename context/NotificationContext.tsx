// context/ProjectsContext.tsx
import { supabase } from '@/lib/supabase';
import Constants from 'expo-constants';
import React, { createContext, useContext, useEffect, useState } from 'react';

type NotificationContextType = {
  notifications: any[]; // replace with your Notification type later
  loading: boolean;
  refresh: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }:any) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = Constants.expoConfig?.extra?.backendUrl;

  const fetchNotifications = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const res = await fetch(`${backendUrl}/api/notifications/all`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await res.json();
      
      const mappedNotifications = data.map((n: any) => ({
                id: n.id,
                title: n.title,
                message: n.body,
                status: n.status,
                timestamp: Date.now() - new Date(n.created_at).getTime() < 86400000 ? Date.now() - new Date(n.created_at).getTime() < 60000 ? 'just now' : 'today' : 'older',
                projectName: n.project?.name || 'General',
                projectIcon: 'person',
                severity: 'info'
     }));
      setNotifications(mappedNotifications);
    } catch (err) {
      console.error('Fetch notifications error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, loading, refresh: fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};