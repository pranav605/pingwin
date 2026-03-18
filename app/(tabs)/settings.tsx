import { usePushNotifications } from '@/hooks/usePushNotifications';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const { expoPushToken, notification } = usePushNotifications();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            router.replace('/login' as any);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

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

                <Pressable
                    onPress={handleSignOut}
                    className="mt-8 bg-red-500/10 px-8 py-4 rounded-full border border-red-500/30 flex-row items-center active:bg-red-500/20"
                >
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" className="mr-2" />
                    <Text className="text-red-500 font-semibold text-lg ml-2">Sign Out</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
