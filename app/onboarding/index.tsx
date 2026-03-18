import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingStep1() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
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
            Welcome to Pingwin
          </Text>
          <Text className="text-gray-400 text-base leading-6">
            Engage with your audience and easily manage your projects from one powerful dashboard. Get ready to elevate your notifications.
          </Text>
        </View>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push('/onboarding/step2' as any)
          }}
          className="bg-white w-full py-4 rounded-full items-center justify-center shadow-lg active:opacity-80"
        >
          <Text className="text-black font-semibold text-lg">
            Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
