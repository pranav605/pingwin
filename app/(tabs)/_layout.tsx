import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#09090b', // zinc-950
                    borderTopWidth: 1,
                    borderTopColor: '#27272a', // zinc-800
                    ...Platform.select({
                        ios: { paddingBottom: 20, height: 85 },
                        android: { paddingBottom: 10, height: 65 },
                        default: { height: 65 },
                    }),
                },
                tabBarActiveTintColor: '#3b82f6', // blue-500
                tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '500',
                },
            }}>
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Feed',
                    tabBarIcon: ({ color, focused }) => (
                        <View className={`w-10 h-10 rounded-full items-center justify-center ${focused ? 'bg-blue-600/20' : ''}`}>
                            <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={20} color={color} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="projects"
                options={{
                    title: 'Projects',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'layers' : 'layers-outline'} size={22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'settings' : 'settings-outline'} size={22} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
