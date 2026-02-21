import { NotificationCard } from '@/components/notification-card';
import { MOCK_NOTIFICATIONS } from '@/constants/mockData';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
    const router = useRouter();

    const renderHeader = () => (
        <View className="pt-4 pb-4">
            <View className="flex-row items-center justify-between mb-8">
                <Text className="text-white text-[28px] font-bold tracking-tight">Dashboard</Text>
                <View className="flex-row items-center gap-5">
                    <Pressable onPress={() => router.push('/create-project')}>
                        <Ionicons name="add-circle-outline" size={26} color="#3b82f6" />
                    </Pressable>
                    <Pressable>
                        <Ionicons name="search" size={22} color="rgba(255,255,255,0.6)" />
                    </Pressable>
                </View>
            </View>

            <View className="flex-row gap-3 mb-8">
                <Pressable className="px-5 py-2.5 rounded-full bg-blue-600 flex-row items-center gap-2">
                    <Ionicons name="grid" size={14} color="white" />
                    <Text className="text-white font-bold text-[11px] uppercase tracking-widest">All</Text>
                </Pressable>
                <Pressable className="px-5 py-2.5 rounded-full bg-zinc-900 border border-border">
                    <Text className="text-white/60 font-bold text-[11px] uppercase tracking-widest">API Gateway</Text>
                </Pressable>
                <Pressable className="px-5 py-2.5 rounded-full bg-zinc-900 border border-border">
                    <Text className="text-white/60 font-bold text-[11px] uppercase tracking-widest">Auth Service</Text>
                </Pressable>
            </View>

            <View className="flex-row items-center justify-between mb-3">
                <Text className="text-white/40 text-[11px] font-bold uppercase tracking-widest">Live Feed</Text>
                <Pressable>
                    <Text className="text-blue-500 text-[13px] font-medium tracking-tight">Mark all read</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-[#09090b]">
            <Stack.Screen options={{ headerShown: false }} />

            <FlatList
                data={MOCK_NOTIFICATIONS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NotificationCard notification={item} />}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                className="flex-1 px-4"
            />
        </SafeAreaView>
    );
}
