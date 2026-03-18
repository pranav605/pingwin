import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';

export default function Index() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkState = async () => {
      try {
        const hasOnboarded = await AsyncStorage.getItem('hasCompletedOnboarding');
        if (hasOnboarded !== 'true') {
          router.replace('/onboarding' as any);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.replace('/(tabs)/dashboard' as any);
        } else {
          router.replace('/login' as any);
        }
      } catch (error) {
        console.error('Error checking state:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkState();
  }, []);

  if (isChecking) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return null;
}
