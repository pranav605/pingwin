import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView className='flex-1 bg-white dark:bg-black'>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: colorScheme === 'dark' ? '#09090b' : '#ffffff',
                        borderTopWidth: 1,
                        borderTopColor: colorScheme === 'dark' ? '#27272a' : '#e4e4e7',
                        ...Platform.select({
                            ios: { paddingBottom: 20, height: 85 },
                            android: { paddingBottom: 10, height: 65 },
                            default: { height: 65 },
                        }),
                    },
                    tabBarActiveTintColor: '#3b82f6', // blue-500
                    tabBarInactiveTintColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontWeight: '500',
                    },
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Feed',
                        tabBarIcon: ({ color, focused }) => (
                            <View className={`w-10 h-10 rounded-full items-center justify-center ${focused ? 'bg-blue-600/20' : ''}`}>
                                <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={20} color={color} />
                            </View>
                        ),
                        animation: 'fade',
                    }}
                />
                <Tabs.Screen
                    name="projects"
                    options={{
                        title: 'Projects',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? 'layers' : 'layers-outline'} size={22} color={color} />
                        ),
                        animation: 'fade',
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={22} color={color} />
                        ),
                        animation: 'fade',
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}
