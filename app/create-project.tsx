import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Stack, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Switch,
    Text,
    TextInput,
    View,
    useColorScheme
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const ITEM_SIZE = 70;
const SPACING = 10;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function CreateProjectScreen() {
    const router = useRouter();
    const [isActive, setIsActive] = React.useState(true);
    const colorScheme = useColorScheme();
    const [projectName, setProjectName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const scrollX = useRef(new Animated.Value(0)).current;

    // ✅ THIS is your API-safe selected value
    const selectedIconRef = useRef('server');

    const icons = [
        'server',
        'chatbox',
        'cloud',
        'cube',
        'phone-portrait',
        'laptop',
        'analytics',
        'shield-checkmark',
        'bug',
        'flame',
        'leaf',
        'paw',
        'heart',
        'star'
    ];

    const handleCreateProject = async () => {
        const payload = {
            icon: selectedIconRef.current, // ✅ always correct
            isActive,
            name: projectName,
            description
        };

        await sendRequest(payload);

        router.push('/project-integration');
    };

    const sendRequest = async (payload:any) => {
        const backendUrl = Constants.expoConfig?.extra?.backendUrl;
        try {
              const { data: { session } } = await supabase.auth.getSession();
              if (!session) return;
        
        const res = await fetch(`${backendUrl}/api/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify(payload)
        });
    }catch (err) {
      console.error('Fetch notifications error:', err);
    } 

    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-[#09090b]">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/5">
                <Pressable onPress={() => router.back()} className="py-2">
                    <Text className="text-blue-500 text-[17px] font-medium tracking-tight">
                        Cancel
                    </Text>
                </Pressable>

                <Text className="text-black dark:text-white text-[19px] font-bold tracking-tight">
                    New Project
                </Text>

                <View style={{ width: 50 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 p-6"
            >
                {/* ICON PICKER */}
                <View>
                    <Text className="text-gray-600 dark:text-white/60 text-sm font-semibold mb-2">
                        Select Icon
                    </Text>

                    <View className="h-32 justify-center overflow-visible">
                        <Animated.FlatList
                            data={icons}
                            keyExtractor={(item) => item}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={ITEM_SIZE + SPACING}
                            decelerationRate="fast"
                            bounces={false}
                            contentContainerStyle={{
                                paddingHorizontal: (SCREEN_WIDTH - ITEM_SIZE) / 2,
                                paddingVertical: 20,
                            }}

                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                {
                                    useNativeDriver: true,
                                    listener: (event) => {
                                        const x = event.nativeEvent.contentOffset.x;
                                        const index = Math.round(
                                            x / (ITEM_SIZE + SPACING)
                                        );

                                        selectedIconRef.current = icons[index];
                                    }
                                }
                            )}

                            scrollEventThrottle={16}

                            renderItem={({ item, index }) => {
                                const inputRange = [
                                    (index - 1) * (ITEM_SIZE + SPACING),
                                    index * (ITEM_SIZE + SPACING),
                                    (index + 1) * (ITEM_SIZE + SPACING),
                                ];

                                const scale = scrollX.interpolate({
                                    inputRange,
                                    outputRange: [0.85, 1.2, 0.85],
                                    extrapolate: 'clamp',
                                });

                                const opacity = scrollX.interpolate({
                                    inputRange,
                                    outputRange: [0.4, 1, 0.4],
                                    extrapolate: 'clamp',
                                });

                                return (
                                    <View style={{ width: ITEM_SIZE, marginRight: SPACING, overflow: 'visible' }}>
                                        <Animated.View
                                            style={{
                                                transform: [{ scale }],
                                                opacity,
                                            }}
                                            className="w-14 h-14 rounded-xl items-center justify-center border bg-white dark:bg-zinc-900 border-black/10 dark:border-white/10"
                                        >
                                            <Ionicons
                                                name={item as any}
                                                size={24}
                                                color={
                                                    colorScheme === 'dark'
                                                        ? "rgba(255,255,255,0.7)"
                                                        : "rgba(0,0,0,0.6)"
                                                }
                                            />
                                        </Animated.View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </View>

                {/* NAME */}
                <View className="mb-6">
                    <Text className="text-gray-600 dark:text-white/60 text-sm font-semibold mb-2">
                        Project Name
                    </Text>

                    <TextInput
                        value={projectName}
                        onChangeText={setProjectName}
                        placeholder="e.g., Production API Alerts"
                        placeholderTextColor={
                            colorScheme === 'dark'
                                ? "rgba(255,255,255,0.2)"
                                : "rgba(0,0,0,0.2)"
                        }
                        className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-4 py-4 rounded-xl text-black dark:text-white font-medium"
                    />
                </View>

                {/* DESCRIPTION */}
                <View className="mb-8">
                    <Text className="text-gray-600 dark:text-white/60 text-sm font-semibold mb-2">
                        Description
                    </Text>

                    <TextInput
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Briefly describe the purpose..."
                        placeholderTextColor={
                            colorScheme === 'dark'
                                ? "rgba(255,255,255,0.2)"
                                : "rgba(0,0,0,0.2)"
                        }
                        className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-4 py-4 rounded-xl text-black dark:text-white font-medium h-32"
                        textAlignVertical="top"
                    />
                </View>

                {/* SWITCH */}
                <View className="flex-row items-center justify-between mb-10">
                    <View>
                        <Text className="text-black dark:text-white font-bold text-base">
                            Active Status
                        </Text>
                        <Text className="text-gray-500 dark:text-white/40 text-xs">
                            Project is live immediately
                        </Text>
                    </View>

                    <Switch
                        value={isActive}
                        onValueChange={setIsActive}
                        trackColor={{
                            false: colorScheme === 'dark' ? '#27272a' : '#e4e4e7',
                            true: '#2563eb'
                        }}
                        thumbColor="#fff"
                    />
                </View>

                <View className="flex-1" />

                {/* BUTTON */}
                <Pressable
                    onPress={handleCreateProject}
                    className="w-full bg-blue-600 py-4 rounded-2xl items-center justify-center flex-row gap-3 active:bg-blue-700"
                >
                    <Ionicons name="rocket-sharp" size={20} color="white" />
                    <Text className="text-white font-black text-base uppercase tracking-widest">
                        Create Project
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}