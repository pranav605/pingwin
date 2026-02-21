import { CodeSnippet } from '@/components/code-snippet';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProjectIntegrationScreen() {
    const router = useRouter();
    const apiKey = 'pk_live_51Mz2s9d_alpha_alerts_2024';
    const [copied, setCopied] = React.useState(false);
    const [snippetCopied, setSnippetCopied] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<'curl' | 'node' | 'react'>('curl');

    const copyApiKey = async () => {
        await Clipboard.setStringAsync(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const curlCode = `curl -X POST https://api.alpha.com/v1/alerts \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Server Status",
    "message": "System operational",
    "priority": "high"
  }'`;

    const nodeCode = `const notify = require('notify-sdk');

const client = new notify.Client('${apiKey}');

await client.send({
  title: 'Server Status',
  message: 'System operational',
  priority: 'high'
});`;

    const reactCode = `import { useNotify } from '@notify/react-native';

const { sendNotification } = useNotify();

const handleAlert = () => {
  sendNotification({
    title: 'Client Action',
    message: 'User completed checkout',
  });
};`;

    const copySnippet = async () => {
        const code = activeTab === 'curl' ? curlCode : activeTab === 'node' ? nodeCode : reactCode;
        await Clipboard.setStringAsync(code);
        setSnippetCopied(true);
        setTimeout(() => setSnippetCopied(false), 2000);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#09090b]">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            {/* Custom Header to avoid notch issues */}
            <View className="flex-row items-center px-6 py-4 border-b border-white/5">
                <Pressable onPress={() => router.back()} className="mr-5">
                    <Ionicons name="arrow-back" size={24} color="rgba(255,255,255,0.6)" />
                </Pressable>
                <Text className="text-white text-[19px] font-bold tracking-tight">Integration Details</Text>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="mb-8">
                    <View className="flex-row items-center gap-2 mb-2">
                        <View className="w-2 h-2 rounded-full bg-blue-500" />
                        <Text className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Live Project</Text>
                    </View>
                    <Text className="text-white text-4xl font-bold mb-3">Alpha Alerts</Text>
                    <Text className="text-white/40 text-sm leading-6">
                        Use your unique API key to authenticate requests. Keep this key confidential.
                    </Text>
                </View>

                <View className="mb-10">
                    <Text className="text-white/60 text-sm font-bold uppercase tracking-widest mb-3">Public API Key</Text>
                    <View className="flex-row items-center bg-zinc-900 border border-border rounded-xl overflow-hidden h-12">
                        <View className="flex-1 px-4 py-4">
                            <Text className="text-white font-mono text-xs" numberOfLines={1}>
                                {apiKey.substring(0, 10)}...{apiKey.substring(apiKey.length - 8)}
                            </Text>
                        </View>
                        <View className="flex-row items-center border-l border-border h-full">
                            <Pressable className="px-4 h-full items-center justify-center opacity-40">
                                <Ionicons name="eye-outline" size={20} color="white" />
                            </Pressable>
                            <Pressable
                                onPress={copyApiKey}
                                className={`px-4 h-full items-center justify-center border-l border-border ${copied ? 'bg-emerald-500/10' : ''}`}
                            >
                                <Ionicons name={copied ? "checkmark" : "copy-outline"} size={20} color={copied ? "#10b981" : "white"} />
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View className="">
                    <Text className="text-white/60 text-sm font-bold uppercase tracking-widest mb-4">Implementation</Text>
                    <View className="flex-row bg-zinc-900 p-1 rounded-xl border border-border mb-6">
                        {(['curl', 'node', 'react'] as const).map((tab) => (
                            <Pressable
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`flex-1 py-2.5 rounded-lg items-center ${activeTab === tab ? 'bg-blue-600' : ''}`}
                            >
                                <Text className={`text-xs font-bold uppercase tracking-widest ${activeTab === tab ? 'text-white' : 'text-white/40'}`}>
                                    {tab === 'curl' ? 'cURL' : tab === 'node' ? 'Node.js' : 'React'}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    {activeTab === 'curl' && <CodeSnippet label="cURL Example" code={curlCode} language="BASH" />}
                    {activeTab === 'node' && <CodeSnippet label="Node.js Example" code={nodeCode} language="JAVASCRIPT" />}
                    {activeTab === 'react' && <CodeSnippet label="React Native" code={reactCode} language="TYPESCRIPT" />}
                </View>
            </ScrollView>

            <View className="absolute bottom-6 left-6 right-6 flex-row gap-3">
                <Pressable
                    onPress={() => router.replace('/(tabs)/projects')}
                    className="flex-1 bg-zinc-800 py-5 rounded-2xl items-center justify-center border border-white/10 active:bg-zinc-700"
                >
                    <Text className="text-white font-black text-base uppercase tracking-widest">
                        Close
                    </Text>
                </Pressable>
                <Pressable
                    onPress={copySnippet}
                    className="flex-1 bg-blue-600 py-5 rounded-2xl items-center justify-center flex-row gap-3 shadow-xl shadow-blue-500/30 active:bg-blue-700"
                >
                    <Ionicons
                        name={snippetCopied ? "checkmark" : "copy-outline"}
                        size={22}
                        color="white"
                    />
                    <Text className="text-white font-black text-base uppercase tracking-widest">
                        {snippetCopied ? "Copied!" : "Copy"}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
