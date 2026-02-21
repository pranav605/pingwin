import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateProjectScreen() {
    const router = useRouter();
    const [isActive, setIsActive] = React.useState(true);

    return (
        <SafeAreaView className="flex-1 bg-[#09090b]">
            <Stack.Screen options={{
                headerShown: false,
            }} />

            {/* Custom Header to avoid notch/modal issues */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-white/5">
                <Pressable onPress={() => router.back()} className="py-2">
                    <Text className="text-blue-500 text-[17px] font-medium tracking-tight">Cancel</Text>
                </Pressable>
                <Text className="text-white text-[19px] font-bold tracking-tight">New Project</Text>
                <View style={{ width: 50 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 p-6"
            >
                <View className="items-center mb-10">
                    <View className="w-24 h-24 rounded-2xl bg-zinc-900 border border-dashed border-white/20 items-center justify-center">
                        <Ionicons name="camera-outline" size={32} color="rgba(255,255,255,0.4)" />
                        <Text className="text-[10px] text-white/40 mt-1 font-bold">Upload Icon</Text>

                        <View className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-600 items-center justify-center border-4 border-background">
                            <Ionicons name="pencil" size={14} color="white" />
                        </View>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-white/60 text-sm font-semibold mb-2">Project Name</Text>
                    <TextInput
                        placeholder="e.g., Production API Alerts"
                        placeholderTextColor="rgba(255,255,255,0.2)"
                        className="w-full bg-zinc-900 border border-border px-4 py-4 rounded-xl text-white font-medium"
                    />
                </View>

                <View className="mb-8">
                    <Text className="text-white/60 text-sm font-semibold mb-2">Description</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        placeholder="Briefly describe the purpose of these notifications..."
                        placeholderTextColor="rgba(255,255,255,0.2)"
                        className="w-full bg-zinc-900 border border-border px-4 py-4 rounded-xl text-white font-medium h-32"
                        textAlignVertical="top"
                    />
                </View>

                <View className="flex-row items-center justify-between mb-10">
                    <View>
                        <Text className="text-white font-bold text-base">Active Status</Text>
                        <Text className="text-white/40 text-xs">Project is live immediately</Text>
                    </View>
                    <Switch
                        value={isActive}
                        onValueChange={setIsActive}
                        trackColor={{ false: '#27272a', true: '#2563eb' }}
                        thumbColor="#fff"
                    />
                </View>

                <View className="flex-1" />

                <Pressable
                    onPress={() => router.push('/project-integration')}
                    className="w-full bg-blue-600 py-4 rounded-2xl items-center justify-center flex-row gap-3 active:bg-blue-700"
                >
                    <Ionicons name="rocket-sharp" size={20} color="white" />
                    <Text className="text-white font-black text-base uppercase tracking-widest">Create Project</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
