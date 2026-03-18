import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
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
    <SafeAreaView className="flex-1 bg-black" >
      {/* Top Half */}
      <View className="flex-auto items-center justify-center p-8">
        <Image
          source={require('@/assets/images/icon-no-bg.png')}
          className="w-48 h-48"
          resizeMode="contain"
        />
      </View>

      {/* Bottom Half */}
      <View className="px-6 pb-12 w-full flex-auto justify-end mb-10">
        <View className="mb-10">
          <Text className="text-white text-3xl font-bold mb-4">
            Connect Anywhere
          </Text>
          <Text className="text-gray-400 text-base leading-6">
            Stay in the loop with real-time push notifications. Keep track of what matters the most to you right at your fingertips.
          </Text>
        </View>

        <View className="flex-row gap-4 w-full">
          <Pressable
            onPress={() => completeOnboarding('/signup')}
            className="flex-1 bg-white py-4 rounded-full items-center justify-center shadow-lg active:opacity-80"
          >
            <Text className="text-black font-semibold text-lg">
              Join Now
            </Text>
          </Pressable>

          <Pressable
            onPress={() => completeOnboarding('/login')}
            className="flex-1 border-2 border-white py-4 rounded-full items-center justify-center active:bg-gray-800"
          >
            <Text className="text-white font-semibold text-lg">
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
