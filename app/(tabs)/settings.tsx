import { usePushNotifications } from '@/hooks/usePushNotifications';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const { expoPushToken, notification } = usePushNotifications();

    return (
        <SafeAreaView className="flex-1 bg-background justify-center items-center">
            <View className="items-center gap-4">
                <Ionicons name="settings-outline" size={80} color="rgba(255,255,255,0.1)" />
                <Text className="text-white text-2xl font-bold">Settings</Text>
                <Text className="text-white/40 text-sm text-center px-10">
                    Configure your notification preferences, theme, and account details.
                </Text>
                <Text className="text-white/40 text-sm text-center px-10">For testing</Text>
                <Text className="text-white/40 text-sm text-center px-10">
                    {expoPushToken?.data}
                </Text>
                <Button title="Copy" onPress={() => Clipboard.setStringAsync(expoPushToken?.data || '')} />
            </View>
        </SafeAreaView>
    );
}
