import { MOCK_PROJECTS } from '@/constants/mockData';
import { Project } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProjectsScreen() {
    const router = useRouter();

    const activeCount = MOCK_PROJECTS.filter(p => p.status === 'active').length;
    const inactiveCount = MOCK_PROJECTS.filter(p => p.status !== 'active').length;

    const renderProjectCard = (project: Project) => {
        let statusColor = '';
        let statusBg = '';
        let iconBg = '';
        let iconColor = '';

        if (project.status === 'active') {
            statusColor = 'text-emerald-500';
            statusBg = 'bg-emerald-500/10';
            iconBg = 'bg-blue-600/20';
            iconColor = '#3b82f6';
        } else if (project.status === 'maintenance') {
            statusColor = 'text-amber-500';
            statusBg = 'bg-amber-500/10';
            iconBg = 'bg-blue-600/10';
            iconColor = '#60a5fa';
        } else {
            statusColor = 'text-white/40';
            statusBg = 'bg-white/5';
            iconBg = 'bg-zinc-800';
            iconColor = '#A1A1AA';
        }

        return (
            <Pressable
                key={project.id}
                onPress={() => router.push(`/projects/${project.id}`)}
                className="bg-zinc-900 border border-border rounded-2xl mb-4 overflow-hidden"
            >
                <View className="px-5 pt-5 pb-4">
                    <View className="flex-row items-center justify-between mb-3">
                        <View className="flex-row items-center gap-4">
                            <View className={`w-12 h-12 rounded-xl items-center justify-center ${iconBg}`}>
                                <Ionicons name={project.icon as any} size={24} color={iconColor} />
                            </View>
                            <View>
                                <Text className="text-white text-lg font-bold mb-0.5">{project.name}</Text>
                                <Text className="text-white/40 font-mono text-[11px] tracking-wider">ID: {project.id}</Text>
                            </View>
                        </View>
                        <View className={`px-2.5 py-1 rounded-full flex-row items-center gap-1.5 ${statusBg}`}>
                            <View className={`w-1.5 h-1.5 rounded-full ${project.status === 'active' ? 'bg-emerald-500' : project.status === 'maintenance' ? 'bg-amber-500' : 'bg-white/40'}`} />
                            <Text className={`text-[10px] font-bold uppercase tracking-widest ${statusColor}`}>
                                {project.status}
                            </Text>
                        </View>
                    </View>
                    <Text className="text-white/60 text-[13px] leading-5">
                        {project.description}
                    </Text>
                </View>
                <View className="px-5 py-3 border-t border-border flex-row items-center justify-between bg-white/5">
                    <View className="flex-row items-center gap-2">
                        <Ionicons name="notifications-outline" size={14} color="rgba(255,255,255,0.4)" />
                        <Text className="text-white/60 text-xs font-medium">{project.alertsToday}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={14} color="rgba(255,255,255,0.3)" />
                </View>
            </Pressable>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-[#09090b]">
            <View className="px-6 pt-10 pb-2">
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-white text-[28px] font-bold tracking-tight">Projects</Text>
                    <View className="flex-row items-center gap-5">
                        <Pressable>
                            <Ionicons name="filter" size={22} color="rgba(255,255,255,0.6)" />
                        </Pressable>
                        <Pressable>
                            <Ionicons name="search" size={22} color="rgba(255,255,255,0.6)" />
                        </Pressable>
                    </View>
                </View>

                <View className="flex-row items-center gap-4 pb-4 border-b border-border">
                    <View className="flex-row items-center gap-1.5">
                        <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <Text className="text-white/60 text-xs font-medium">{activeCount} Active</Text>
                    </View>
                    <View className="flex-row items-center gap-1.5">
                        <View className="w-1.5 h-1.5 rounded-full bg-white/30" />
                        <Text className="text-white/60 text-xs font-medium">{inactiveCount} Inactive</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                <View className="py-6">
                    <Pressable
                        onPress={() => router.push('/create-project')}
                        className="bg-transparent border border-dashed border-white/20 rounded-2xl p-6 items-center justify-center mb-8 active:bg-white/5"
                    >
                        <View className="w-12 h-12 rounded-full bg-blue-600/20 items-center justify-center mb-3">
                            <Ionicons name="add" size={24} color="#3b82f6" />
                        </View>
                        <Text className="text-white font-bold text-base mb-1">Add New Project</Text>
                        <Text className="text-white/40 text-xs font-medium tracking-wide">Create a new channel for alerts</Text>
                    </Pressable>

                    <Text className="text-white/40 text-[11px] font-bold uppercase tracking-widest mb-4 ml-1">
                        Your Projects
                    </Text>

                    {MOCK_PROJECTS.map(renderProjectCard)}
                </View>
                <View className="h-6" />
            </ScrollView>
        </SafeAreaView>
    );
}
