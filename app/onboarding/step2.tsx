import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingStep2() {
  const router = useRouter();

  const completeOnboarding = async (path: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      router.push(path as any);
    } catch (e) {
      console.error('Failed to save onboarding state', e);
      router.push(path as any); // fallback
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" >
      {/* Top Half */}
      <View className="flex-auto items-center justify-center p-8">
        <LottieView
          autoPlay
          loop={false}
          style={{
            width: 400,
            height: 400,
          }}
          source={require('@/assets/lottie/Notification-remix.json')}
        />
      </View>

      {/* Bottom Half */}
      <View className="px-6 pb-12 w-full flex-auto justify-end mb-10">
        <View className="mb-10">
          <Text className="text-black dark:text-white text-3xl font-bold mb-4">
            Connect Anywhere
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-base leading-6">
            Stay in the loop with real-time push notifications. Keep track of what matters the most to you right at your fingertips.
          </Text>
        </View>

        <View className="flex-row gap-4 w-full">
          <Pressable
            onPress={() => completeOnboarding('/signup')}
            className="flex-1 bg-black dark:bg-white py-4 rounded-full items-center justify-center shadow-lg active:opacity-80"
          >
            <Text className="text-white dark:text-black font-semibold text-lg">
              Join Now
            </Text>
          </Pressable>

          <Pressable
            onPress={() => completeOnboarding('/login')}
            className="flex-1 border-2 border-black dark:border-white py-4 rounded-full items-center justify-center active:bg-gray-100 dark:active:bg-gray-800"
          >
            <Text className="text-black dark:text-white font-semibold text-lg">
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
