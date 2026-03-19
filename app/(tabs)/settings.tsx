import { usePushNotifications } from '@/hooks/usePushNotifications';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';

export default function SettingsScreen() {
    const { expoPushToken, notification } = usePushNotifications();
    const router = useRouter();
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const [copied, setCopied] = useState(false);

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            router.replace('/login' as any);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const copyToken = async () => {
        if (expoPushToken?.data) {
            await Clipboard.setStringAsync(expoPushToken.data);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-[#09090b]">
            <View className="px-6 pt-10 pb-4">
                <Text className="text-black dark:text-white text-[28px] font-bold tracking-tight">Settings</Text>
            </View>

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                
                {/* Preferences Section */}
                <Text className="text-gray-500 dark:text-white/40 text-[11px] font-bold uppercase tracking-widest mb-3 ml-1">
                    Preferences
                </Text>
                <View className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl mb-8 overflow-hidden">
                    <View className="flex-row items-center justify-between p-4 bg-white dark:bg-zinc-900">
                        <View className="flex-row items-center gap-3">
                            <View className="w-8 h-8 rounded-full bg-blue-500/10 items-center justify-center">
                                <Ionicons name={colorScheme === 'dark' ? "moon" : "sunny"} size={16} color="#3b82f6" />
                            </View>
                            <Text className="text-black dark:text-white font-semibold text-[15px]">Dark Mode</Text>
                        </View>
                        <Switch
                            value={colorScheme === 'dark'}
                            onValueChange={toggleColorScheme}
                            trackColor={{ false: colorScheme === 'dark' ? '#3f3f46' : '#e4e4e7', true: '#10b981' }}
                            thumbColor={'#ffffff'}
                            ios_backgroundColor={colorScheme === 'dark' ? "#3f3f46" : "#e4e4e7"}
                        />
                    </View>
                </View>

                {/* Notifications Section */}
                <Text className="text-gray-500 dark:text-white/40 text-[11px] font-bold uppercase tracking-widest mb-3 ml-1">
                    Push Notifications
                </Text>
                <View className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl mb-8 overflow-hidden">
                    <View className="p-4 border-b border-gray-100 dark:border-zinc-800/50">
                        <View className="flex-row items-center gap-3 mb-2">
                            <View className="w-8 h-8 rounded-full bg-purple-500/10 items-center justify-center">
                                <Ionicons name="notifications" size={16} color="#a855f7" />
                            </View>
                            <Text className="text-black dark:text-white font-semibold text-[15px]">Device Push Token</Text>
                        </View>
                        <Text className="text-gray-500 dark:text-white/50 text-xs leading-5 mb-3" numberOfLines={2}>
                            {expoPushToken?.data || "No push token generated for this device."}
                        </Text>
                        <Pressable 
                            onPress={copyToken}
                            disabled={!expoPushToken?.data}
                            className={`py-2.5 rounded-xl items-center justify-center flex-row gap-2 ${copied ? 'bg-emerald-500/10' : 'bg-gray-100 dark:bg-zinc-800'}`}
                        >
                            <Ionicons name={copied ? "checkmark" : "copy-outline"} size={14} color={copied ? "#10b981" : (colorScheme === 'dark' ? "white" : "black")} />
                            <Text className={`font-semibold text-[13px] ${copied ? 'text-emerald-500' : 'text-black dark:text-white'}`}>
                                {copied ? 'Copied' : 'Copy Token'}
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* Account Section */}
                <Text className="text-gray-500 dark:text-white/40 text-[11px] font-bold uppercase tracking-widest mb-3 ml-1">
                    Account
                </Text>
                <View className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl mb-8 overflow-hidden">
                    <Pressable 
                        onPress={handleSignOut}
                        className="flex-row items-center justify-between p-4 active:bg-gray-50 dark:active:bg-zinc-800/50"
                    >
                        <View className="flex-row items-center gap-3">
                            <View className="w-8 h-8 rounded-full bg-red-500/10 items-center justify-center">
                                <Ionicons name="log-out-outline" size={18} color="#ef4444" />
                            </View>
                            <Text className="text-red-500 font-semibold text-[15px]">Sign Out</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color={colorScheme === 'dark' ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"} />
                    </Pressable>
                </View>

                <View className="items-center justify-center mt-4 mb-12">
                     <Text className="text-gray-400 dark:text-white/30 text-xs font-mono">Pingwin v1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
