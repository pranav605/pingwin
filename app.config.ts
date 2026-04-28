import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name || 'pingwin',
  slug: config.slug || 'pingwin',
  extra: {
    ...config.extra,
    supabaseUrl: process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    backendUrl: process.env.EXPO_PUBLIC_BACKEND_URL || process.env.BACKEND_URL,
  },
});
