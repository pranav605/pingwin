import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css";

import { useColorScheme } from '@/hooks/use-color-scheme';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { supabase } from '@/lib/supabase';
import { getDeviceId } from '@/utils/registerDevice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: 'index',
};
const backendUrl = Constants.expoConfig?.extra?.backendUrl as string;

const syncPushToken = async (token: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) return;

    const deviceId = await getDeviceId();

    await fetch(`${backendUrl}/api/tokens/upsert`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        device_id: deviceId,
      }),
    });
  } catch (err) {
    console.error('Push token sync failed:', err);
  }
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { expoPushToken } = usePushNotifications();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session && expoPushToken?.data) {
        await syncPushToken(expoPushToken.data);
      }
    };

    init();
  }, []);
  
  useEffect(() => {
    if (expoPushToken?.data) {
      syncPushToken(expoPushToken.data);
    }
  }, [expoPushToken]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && expoPushToken?.data) {
          await syncPushToken(expoPushToken.data);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [expoPushToken]);

  useEffect(() => {
    const checkState = async () => {
      try {
        const hasOnboarded = await AsyncStorage.getItem('hasCompletedOnboarding');
        const { data: { session } } = await supabase.auth.getSession();

        if (hasOnboarded !== 'true') {
          router.replace('/onboarding' as any);
        } else if (session) {
          router.replace('/(tabs)' as any);
        } else {
          router.replace('/login' as any);
        }
      } catch (error) {
        console.error('Error checking state:', error);
      } finally {
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 100);
      }
    };

    checkState();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
        <Stack.Screen name="signup/index" options={{ headerShown: false }} />
        <Stack.Screen name="create-project" options={{ presentation: 'modal' }} />
        <Stack.Screen name="project-integration" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
