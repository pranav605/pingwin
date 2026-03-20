import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Pressable, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingStep1() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      {/* Top Half */}
      <View className="flex-auto items-center justify-center p-8">
        <LottieView
          autoPlay
          loop={false}
          style={{
            width: 400,
            height: 400,
          }}
          source={colorScheme == "dark" ? require('@/assets/lottie/logo-dark.json') : require('@/assets/lottie/logo-light.json')}
        />
      </View>

      {/* Bottom Half */}
      <View className="px-6 pb-12 w-full flex-auto justify-end mb-10">
        <View className="mb-10">
          <Text className="text-black dark:text-white text-3xl font-bold mb-4">
            Welcome to Pingwin
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-base leading-6">
            Engage with your audience and easily manage your projects from one powerful dashboard. Get ready to elevate your notifications.
          </Text>
        </View>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push('/onboarding/step2' as any)
          }}
          className="bg-black dark:bg-white w-full py-4 rounded-full items-center justify-center shadow-lg active:opacity-80"
        >
          <Text className="text-white dark:text-black font-semibold text-lg">
            Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
