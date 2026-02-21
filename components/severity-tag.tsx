import React from 'react';
import { Text, View } from 'react-native';
import { Severity } from '../types';

interface SeverityTagProps {
    severity: Severity;
}

const severityConfig: Record<Severity, { bg: string; text: string; label: string }> = {
    critical: { bg: 'bg-accent-error/20', text: 'text-accent-error font-bold', label: 'CRITICAL' },
    error: { bg: 'bg-accent-error/20', text: 'text-accent-error font-bold', label: 'ERROR' },
    warning: { bg: 'bg-accent-warning/20', text: 'text-accent-warning font-bold', label: 'WARNING' },
    info: { bg: 'bg-accent-info/20', text: 'text-accent-info font-bold', label: 'INFO' },
    log: { bg: 'bg-white/10', text: 'text-white/60 font-medium', label: 'LOG' },
};

export function SeverityTag({ severity }: SeverityTagProps) {
    const config = severityConfig[severity];

    return (
        <View className={`px-2 py-0.5 rounded-md ${config.bg}`}>
            <Text className={`text-[10px] ${config.text}`}>
                {config.label}
            </Text>
        </View>
    );
}
