import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css";

import { useColorScheme } from '@/hooks/use-color-scheme';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { expoPushToken } = usePushNotifications();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (expoPushToken) {
      console.log("RootLayout registered push token:", expoPushToken.data);
    }
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
