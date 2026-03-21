import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { makeRedirectUri } from 'expo-auth-session';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleGoogleLogin = async () => {
    try {
      const redirectTo = makeRedirectUri();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;

      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
        if (result.type === 'success') {
          const url = result.url;
          const hashMatch = url.match(/#(.*)/);
          if (hashMatch && hashMatch[1]) {
            // URLSearchParams is not always polyfilled in all RN versions, but we can extract tokens manually just in case
            const params = new URLSearchParams(hashMatch[1]);
            const access_token = params.get('access_token');
            const refresh_token = params.get('refresh_token');
            if (access_token && refresh_token) {
              await supabase.auth.setSession({ access_token, refresh_token });
              router.replace('/(tabs)' as any);
            }
          }
        }
      }
    } catch (e) {
      console.error('Login error:', e);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black justify-center">
      <View className="px-6 w-full max-w-sm mx-auto">
        <View className="mb-12">
          <Text className="text-black dark:text-white text-4xl font-bold mb-2">Welcome Back</Text>
          <Text className="text-gray-600 dark:text-gray-400 text-base">Sign in to continue to your dashboard</Text>
        </View>

        <View className="gap-4">
          <TouchableOpacity
            className="w-full bg-gray-100 dark:bg-white flex-row items-center justify-center py-4 rounded-full"
            activeOpacity={0.8}
            onPress={() => {
              // Handle Apple Login
            }}
          >
            <Ionicons name="logo-apple" size={24} color={colorScheme === 'dark' ? 'black' : 'black'} className="mr-3" />
            <Text className="text-black font-semibold text-lg ml-2">Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full bg-gray-50 dark:bg-[#333333] border border-gray-200 dark:border-transparent flex-row items-center justify-center py-4 rounded-full"
            activeOpacity={0.8}
            onPress={handleGoogleLogin}
          >
            <Ionicons name="logo-google" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} className="mr-3" />
            <Text className="text-black dark:text-white font-semibold text-lg ml-2">Continue with Google</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-12 flex-row justify-center items-center">
          <Text className="text-gray-600 dark:text-gray-400">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.replace('/signup' as any)}>
            <Text className="text-black dark:text-white font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity onPress={() => AsyncStorage.setItem('hasCompletedOnboarding', 'false')}>
          <Text className="text-black dark:text-white font-semibold">Set Onboarding False</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/onboarding' as any)}>
          <Text className="text-black dark:text-white font-semibold">Navigate to Onboarding</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}
