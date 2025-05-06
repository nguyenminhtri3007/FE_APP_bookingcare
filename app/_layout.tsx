import { toastConfig } from '@/src/common/config/toastConfig';
import { Fonts } from '@/src/common/resource/fonts';
import { ToastProvider } from '@/src/customize/toast.context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

export {
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
    [Fonts.POPPINS_REGULAR]: require("@/assets/fonts/Poppins-Regular.ttf"),
    [Fonts.POPPINS_ITALIC]: require("@/assets/fonts/Poppins-Italic.ttf"),
    [Fonts.POPPINS_BOLD]: require("@/assets/fonts/Poppins-Bold.ttf"),
    [Fonts.POPPINS_LIGHT]: require("@/assets/fonts/Poppins-Light.ttf"),
    [Fonts.POPPINS_MEDIUM]: require("@/assets/fonts/Poppins-Medium.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <ToastProvider>
      <>
        <StatusBar style='auto' />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: 'Trang chủ',
              headerShown: false
            }}
          />
          
          <Stack.Screen
            name="(routes)/welcome-intro/index"
            options={{
              title: 'Welcome',
              headerShown: false
            }}
          />
          <Stack.Screen
            name="(routes)/sign-in/index"
            options={{
              headerShown: false,
              presentation: 'modal'
            }}
          />
          <Stack.Screen
            name="(routes)/sign-up/index"
            options={{
              headerShown: false,
              presentation: 'modal'
            }}
          />

          <Stack.Screen
            name="(routes)/specialty-details/index"
            options={{
              title: 'Chi tiết bác sĩ',
              headerShown: false,
            }}
          />
           <Stack.Screen
            name="(routes)/clinic-details/index"
            options={{
              title: 'Chi tiết cơ sở y tế',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(routes)/doctor-details/index"
            options={{
              title: 'Chi tiết cơ sở y tế',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(routes)/booking-care/index"
            options={{
            title:'đặt lịch khám bệnh',
            headerShown: false,
          }}
          />

           <Stack.Screen
            name="(routes)/edit-profile/index"
            options={{
            title:'cập nhật hồ sơ',
            headerShown: false,
          }}
          />


          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false
            }}
          />
        </Stack>
        <Toast config={toastConfig} />
      </>
    </ToastProvider>
  );
}
