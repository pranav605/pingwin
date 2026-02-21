export type Severity = 'info' | 'warning' | 'error' | 'critical' | 'log';

export interface Notification {
    id: string;
    projectName: string;
    projectIcon: string;
    timestamp: string;
    title: string;
    message: string;
    severity: Severity;
    metadata?: string;
    unread?: boolean;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    apiKey: string;
    icon: string;
    alertsToday: string;
    uptime?: string;
    errorRate?: string;
    status: 'active' | 'inactive' | 'maintenance';
}
