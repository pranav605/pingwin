import React from 'react';
import { Text, View } from 'react-native';

interface CodeSnippetProps {
    label: string;
    code: string;
    language?: string;
}

export function CodeSnippet({ label, code, language = 'BASH' }: CodeSnippetProps) {
    return (
        <View className="mb-6">
            <View className="flex-row items-center justify-between bg-zinc-800 px-4 py-2 rounded-t-xl border-x border-t border-border">
                <View className="flex-row gap-1.5">
                    <View className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <View className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                    <View className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                </View>
                <Text className="text-white/40 text-[10px] font-bold tracking-widest">{language}</Text>
            </View>

            <View className="bg-zinc-950 p-4 rounded-b-xl border border-border">
                <Text className="text-white/80 font-mono text-xs leading-5">
                    {code}
                </Text>
            </View>
        </View>
    );
}
