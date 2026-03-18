import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css";

import { useColorScheme } from '@/hooks/use-color-scheme';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: 'dashboard',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { expoPushToken } = usePushNotifications();

  useEffect(() => {
    if (expoPushToken) {
      console.log("RootLayout registered push token:", expoPushToken.data);
    }
  }, [expoPushToken]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="create-project" options={{ presentation: 'modal' }} />
        <Stack.Screen name="project-integration" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
