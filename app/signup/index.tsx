import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { supabase } from '@/lib/supabase';

WebBrowser.maybeCompleteAuthSession();

export default function SignupScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleGoogleSignup = async () => {
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
            const params = new URLSearchParams(hashMatch[1]);
            const access_token = params.get('access_token');
            const refresh_token = params.get('refresh_token');
            if (access_token && refresh_token) {
              await supabase.auth.setSession({ access_token, refresh_token });
              router.replace('/(tabs)/dashboard' as any);
            }
          }
        }
      }
    } catch (e) {
      console.error('Signup error:', e);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black justify-center">
      <View className="px-6 w-full max-w-sm mx-auto">
        <View className="mb-12">
          <Text className="text-black dark:text-white text-4xl font-bold mb-2">Create Account</Text>
          <Text className="text-gray-600 dark:text-gray-400 text-base">Join us to get started with your projects</Text>
        </View>

        <View className="gap-4">
          <TouchableOpacity
            className="w-full bg-gray-100 dark:bg-white flex-row items-center justify-center py-4 rounded-full"
            activeOpacity={0.8}
            onPress={() => {
              // Handle Apple Signup
            }}
          >
            <Ionicons name="logo-apple" size={24} color={colorScheme === 'dark' ? 'black' : 'black'} className="mr-3" />
            <Text className="text-black font-semibold text-lg ml-2">Sign up with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full bg-gray-50 dark:bg-[#333333] border border-gray-200 dark:border-transparent flex-row items-center justify-center py-4 rounded-full"
            activeOpacity={0.8}
            onPress={handleGoogleSignup}
          >
            <Ionicons name="logo-google" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} className="mr-3" />
            <Text className="text-black dark:text-white font-semibold text-lg ml-2">Sign up with Google</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-12 flex-row justify-center items-center">
          <Text className="text-gray-600 dark:text-gray-400">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.replace('/login' as any)}>
            <Text className="text-black dark:text-white font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-500 text-xs text-center mt-12 mx-4 leading-5">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}
