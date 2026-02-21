import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Notification, Severity } from '../types';
import { SeverityTag } from './severity-tag';

interface NotificationCardProps {
    notification: Notification;
    onPress?: () => void;
}

const severityIconConfig: Record<Severity, { iconColor: string; bg: string }> = {
    critical: { iconColor: '#ef4444', bg: 'bg-red-500/10' },
    error: { iconColor: '#ef4444', bg: 'bg-red-500/10' },
    warning: { iconColor: '#f59e0b', bg: 'bg-amber-500/10' },
    info: { iconColor: '#3b82f6', bg: 'bg-blue-500/10' },
    log: { iconColor: 'rgba(255,255,255,0.6)', bg: 'bg-white/10' },
};

export function NotificationCard({ notification, onPress }: NotificationCardProps) {
    const config = severityIconConfig[notification.severity];

    return (
        <Pressable
            onPress={onPress}
            className="bg-card mb-4 p-4 rounded-xl border border-border"
        >
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-3">
                    <View className={`w-7 h-7 rounded-md items-center justify-center ${config.bg}`}>
                        <Ionicons name={notification.projectIcon as any} size={14} color={config.iconColor} />
                    </View>
                    <Text className="text-white/60 text-[11px] font-bold tracking-widest uppercase">
                        {notification.projectName}
                    </Text>
                </View>
                <View className="flex-row items-center gap-2">
                    <Text className="text-white/40 text-[11px] font-medium">
                        {notification.timestamp}
                    </Text>
                    {notification.unread && (
                        <View className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    )}
                </View>
            </View>

            <Text className="text-white font-bold text-[15px] mb-1">
                {notification.title}
            </Text>

            <Text className="text-white/50 text-[13px] leading-5 mb-4">
                {notification.message}
            </Text>

            <View className="flex-row items-center gap-3">
                <SeverityTag severity={notification.severity} />
                {notification.metadata && (
                    <Text className="text-white/30 text-[11px] font-mono">
                        {notification.metadata}
                    </Text>
                )}
            </View>
        </Pressable>
    );
}
