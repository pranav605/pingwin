import { Notification, Project } from '../types';

export const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        projectName: 'PAYMENT-SVC',
        projectIcon: 'server',
        timestamp: 'Just now',
        title: 'Database Connection Timeout',
        message: 'Primary replica failed to respond after 3000ms. Automatic failover process initiated.',
        severity: 'critical',
        metadata: 'Error 504',
        unread: true
    },
    {
        id: '2',
        projectName: 'AUTH-SERVICE',
        projectIcon: 'person',
        timestamp: '2m ago',
        title: 'New User Registration',
        message: 'User ID #88291 verified email via magic link successfully.',
        severity: 'info'
    },
    {
        id: '3',
        projectName: 'API-GATEWAY',
        projectIcon: 'settings',
        timestamp: '15m ago',
        title: 'High Memory Usage',
        message: 'Instance i-0x82f detected using 85% of available memory. Scaling policy triggered.',
        severity: 'warning'
    },
    {
        id: '4',
        projectName: 'INVOICE-WORKER',
        projectIcon: 'file-tray-full',
        timestamp: '1h ago',
        title: 'Monthly Report Generated',
        message: 'Successfully generated 1,240 invoices for the billing cycle June 2024.',
        severity: 'log'
    },
    {
        id: '5',
        projectName: 'SECURITY-OPS',
        projectIcon: 'lock-closed',
        timestamp: '3h ago',
        title: 'Failed Login Spike',
        message: 'Detected 500+ failed login attempts from IP range 192.168.x.x within 1 minute.',
        severity: 'critical',
        metadata: 'Rate Limit'
    }
];

export const MOCK_PROJECTS: Project[] = [
    {
        id: 'prj-9921',
        name: 'Payment-Svc',
        description: 'Microservice handling Stripe webhooks and payment processing pipelines. Critical infrastructure component.',
        apiKey: 'pk_live_...',
        icon: 'cash-outline',
        alertsToday: '24 alerts today',
        uptime: '99.98%',
        errorRate: '0.02%',
        status: 'active'
    },
    {
        id: 'prj-8812',
        name: 'Auth-Service',
        description: 'Authentication provider, OAuth flows, and user session management.',
        apiKey: 'pk_live_...',
        icon: 'shield-checkmark-outline',
        alertsToday: '12 alerts today',
        uptime: '99.99%',
        errorRate: '0.01%',
        status: 'active'
    },
    {
        id: 'prj-1002',
        name: 'API-Gateway',
        description: 'Main entry point for all client requests. Rate limiting and routing logic.',
        apiKey: 'pk_live_...',
        icon: 'share-social-outline',
        alertsToday: 'Paused',
        uptime: '98.50%',
        errorRate: '1.50%',
        status: 'maintenance'
    },
    {
        id: 'prj-5501',
        name: 'Email-Worker',
        description: 'Background worker for sending transactional emails via SES.',
        apiKey: 'pk_test_...',
        icon: 'mail-outline',
        alertsToday: 'Last alert 5d ago',
        uptime: '0.00%',
        errorRate: '0.00%',
        status: 'inactive'
    }
];
