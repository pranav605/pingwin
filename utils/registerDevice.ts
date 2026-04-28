import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

export const getDeviceId = async () => {
  let id = await AsyncStorage.getItem('device_id');

  if (!id) {
    id = Crypto.randomUUID();
    await AsyncStorage.setItem('device_id', id);
  }

  return id;
};