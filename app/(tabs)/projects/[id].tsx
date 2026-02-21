import { MOCK_NOTIFICATIONS, MOCK_PROJECTS } from '@/constants/mockData';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ProjectDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [settingsVisible, setSettingsVisible] = useState(false);

    const project = MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[0];
    const projectNotifications = MOCK_NOTIFICATIONS.filter(n => n.projectName === project.name.toUpperCase());

    const [projectName, setProjectName] = useState(project.name);
    const [isActive, setIsActive] = useState(project.status === 'active');

    // Mock specific recent notifications for the mockup if the normal ones are empty
    const displayNotifications = [
        { id: '1', title: 'Webhook timeout detected', message: 'Connection timed out after 3000ms while waiting for...', severity: 'critical', timestamp: '10:42 AM' },
        { id: '2', title: 'High latency on endpoint /charge', message: 'Average response time exceeded 500ms threshold.', severity: 'warning', timestamp: '09:15 AM' },
        { id: '3', title: 'Deployment Successful', message: 'Version v2.4.1 deployed to production.', severity: 'info', timestamp: '08:30 AM' },
        { id: '4', title: 'Daily Backup Completed', message: 'Database snapshot stored in S3 bucket.', severity: 'info', timestamp: 'Yesterday' },
        { id: '5', title: 'API Rate Limit Exceeded', message: 'Client 10.0.2.15 exceeded 1000 req/min.', severity: 'critical', timestamp: 'Yesterday' }
    ];

    let iconBg = 'bg-zinc-800';
    let iconColor = '#A1A1AA';

    if (project.status === 'active') { iconBg = 'bg-blue-600/20'; iconColor = '#3b82f6'; }
    else if (project.status === 'maintenance') { iconBg = 'bg-blue-600/10'; iconColor = '#60a5fa'; }

    return (
        <SafeAreaView className="flex-1 bg-[#09090b]">
            <Stack.Screen options={{
                headerStyle: { backgroundColor: '#09090b' },
                headerTintColor: '#fff',
                headerTitle: 'Project Details',
                headerTitleStyle: { fontWeight: 'bold' },
                headerLeft: () => (
                    <Pressable onPress={() => router.back()} className="mr-4">
                        <Ionicons name="arrow-back" size={24} color="rgba(255,255,255,0.6)" />
                    </Pressable>
                ),
                headerRight: () => (
                    <Pressable>
                        <Ionicons name="settings" size={22} color="rgba(255,255,255,0.6)" />
                    </Pressable>
                )
            }} />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View className="flex-row items-center gap-4 px-6 py-6 border-b border-white/5">
                    <View className={`w-14 h-14 rounded-2xl items-center justify-center border border-border ${iconBg}`}>
                        <Ionicons name={project.icon as any} size={28} color={iconColor} />
                    </View>
                    <View className="flex-1">
                        <Text className="text-white text-[22px] font-bold tracking-tight mb-1">{project.name}</Text>
                        <Text className="text-white/40 font-mono text-[11px] tracking-widest">ID: {project.id}</Text>
                    </View>
                    <Pressable
                        onPress={() => setSettingsVisible(true)}
                        className="w-10 h-10 items-center justify-center rounded-full bg-white/5"
                    >
                        <Ionicons name="settings-outline" size={20} color="rgba(255,255,255,0.8)" />
                    </Pressable>
                </View>

                {/* Details & Status Card */}
                <View className="px-5 py-6">
                    <View className="bg-[#18181b] border border-[#27272a] rounded-2xl p-5 mb-8">
                        <View className="flex-row items-center justify-between mb-5">
                            <Text className="text-white font-bold text-[15px]">Details & Status</Text>
                            <Ionicons name="chevron-up" size={20} color="rgba(255,255,255,0.5)" />
                        </View>

                        <View className="flex-row items-center gap-3 mb-4">
                            <View className="bg-emerald-500/10 rounded-full px-2.5 py-1 flex-row items-center gap-1.5">
                                <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <Text className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Active</Text>
                            </View>
                            <Text className="text-white/30 text-[10px] font-black">•</Text>
                            <Text className="text-white/50 text-[13px] font-medium">Uptime: {project.uptime}</Text>
                        </View>

                        <Text className="text-white/70 text-[13px] leading-[22px] mb-6 pr-4">
                            {project.description}
                        </Text>

                        <View className="flex-row gap-3">
                            <View className="flex-1 bg-[#09090b] border border-[#27272a] rounded-xl p-4">
                                <Text className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Alerts Today</Text>
                                <Text className="text-white text-2xl font-medium tracking-tight">24</Text>
                            </View>
                            <View className="flex-1 bg-[#09090b] border border-[#27272a] rounded-xl p-4">
                                <Text className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Error Rate</Text>
                                <Text className="text-emerald-500 text-2xl font-mono tracking-tight">{project.errorRate}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Recent Notifications */}
                    <View className="flex-row items-center justify-between mb-4 px-1">
                        <Text className="text-white font-bold text-[15px]">Recent Notifications</Text>
                        <Pressable>
                            <Text className="text-blue-500 text-[13px] font-medium tracking-tight">View all</Text>
                        </Pressable>
                    </View>

                    <View className="pl-1 pr-4">
                        {displayNotifications.map((notif, index) => {
                            let dotColor = '';
                            if (notif.severity === 'critical') dotColor = 'bg-red-500';
                            if (notif.severity === 'warning') dotColor = 'bg-amber-500';
                            if (notif.severity === 'info') dotColor = 'bg-blue-500';

                            return (
                                <View key={notif.id} className={`flex-row gap-4 py-4 ${index !== displayNotifications.length - 1 ? 'border-b border-white/5' : ''}`}>
                                    <View className="mt-1.5">
                                        <View className={`w-2 h-2 rounded-full ${dotColor}`} />
                                    </View>
                                    <View className="flex-1">
                                        <View className="flex-row items-center justify-between mb-1.5">
                                            <Text className={`text-[10px] font-bold uppercase tracking-widest ${notif.severity === 'critical' ? 'text-red-500' : notif.severity === 'warning' ? 'text-amber-500' : 'text-blue-500'}`}>
                                                {notif.severity}
                                            </Text>
                                            <Text className="text-white/40 font-mono text-[10px]">{notif.timestamp}</Text>
                                        </View>
                                        <Text className="text-white font-medium text-[15px] mb-1">{notif.title}</Text>
                                        <Text className="text-white/50 text-xs leading-5 pr-4" numberOfLines={2}>
                                            {notif.message}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>

                <View className="h-32" />
            </ScrollView>

            <View className="absolute bottom-6 left-6 right-6">
                <Pressable
                    onPress={() => router.push('/project-integration')}
                    className="w-full bg-blue-600 py-4 rounded-2xl items-center justify-center flex-row gap-3 shadow-xl shadow-blue-500/30 active:bg-blue-700"
                >
                    <Ionicons name="clipboard-outline" size={20} color="white" />
                    <Text className="text-white font-bold text-[15px] tracking-wide">Manage Integration</Text>
                </Pressable>
            </View>

            {/* Custom Bottom Sheet Modal for Settings */}
            <Modal
                transparent={true}
                visible={settingsVisible}
                animationType="slide"
                onRequestClose={() => setSettingsVisible(false)}
            >
                <View className="flex-1 justify-end bg-black/60">
                    <Pressable
                        className="absolute inset-0"
                        onPress={() => setSettingsVisible(false)}
                    />

                    <View className="bg-[#18181b] border-t border-[#27272a] rounded-t-3xl pt-4 pb-12 px-6 shadow-2xl z-10 w-full mb-0">
                        {/* Drag Handle */}
                        <View className="w-12 h-1.5 bg-white/10 rounded-full self-center mb-6" />

                        <Text className="text-white text-xl font-bold tracking-tight mb-6">Project Settings</Text>

                        {/* Project Name Input */}
                        <View className="mb-6">
                            <Text className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Project Name</Text>
                            <TextInput
                                value={projectName}
                                onChangeText={setProjectName}
                                className="bg-zinc-900 border border-[#27272a] rounded-xl px-4 py-3.5 text-white text-[15px] font-medium"
                                placeholder="Enter project name..."
                                placeholderTextColor="rgba(255,255,255,0.3)"
                                selectionColor="#3b82f6"
                            />
                        </View>

                        {/* Status Toggle */}
                        <View className="mb-8 flex-row items-center justify-between bg-zinc-900 border border-[#27272a] rounded-xl p-4">
                            <View className="flex-1 mr-4">
                                <Text className="text-white text-[15px] font-bold mb-1">Active Status</Text>
                                <Text className="text-white/50 text-xs leading-5">
                                    Turn off to pause alerts processing and mark project as inactive.
                                </Text>
                            </View>
                            <Switch
                                value={isActive}
                                onValueChange={setIsActive}
                                trackColor={{ false: '#3f3f46', true: '#10b981' }}
                                thumbColor={'#ffffff'}
                                ios_backgroundColor="#3f3f46"
                            />
                        </View>

                        {/* Delete Section */}
                        <View className="mb-8 border border-red-500/30 bg-red-500/5 rounded-xl p-4">
                            <Text className="text-red-500 text-[15px] font-bold mb-2">Danger Zone</Text>
                            <Text className="text-red-500/70 text-xs leading-5 mb-4">
                                Once deleted, this project and all its alert history cannot be recovered.
                            </Text>
                            <Pressable className="bg-red-500/20 py-3 rounded-lg items-center justify-center border border-red-500/30">
                                <Text className="text-red-500 font-bold text-sm tracking-wide">Delete Project</Text>
                            </Pressable>
                        </View>

                        {/* Actions */}
                        <View className="flex-row gap-3">
                            <Pressable
                                onPress={() => setSettingsVisible(false)}
                                className="flex-1 py-4 items-center justify-center bg-zinc-800 rounded-xl"
                            >
                                <Text className="text-white font-bold text-[15px]">Cancel</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setSettingsVisible(false)}
                                className="flex-1 py-4 items-center justify-center bg-blue-600 rounded-xl"
                            >
                                <Text className="text-white font-bold text-[15px]">Save Changes</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
