import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
     "Geist-Regular": require("geist-sans/fonts/Geist-Regular.ttf"), 
     "Geist-Medium": require("geist-sans/fonts/Geist-Medium.ttf"), 
     "Geist-SemiBold": require("geist-sans/fonts/Geist-SemiBold.ttf"), 
     "GeistMono-Regular": require("geist-mono/fonts/GeistMono-Regular.ttf"), 
    });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#0d1117',
              },
              headerTintColor: '#f0f6fc',
              headerTitleStyle: {
                fontFamily: 'Geist-SemiBold',
              },
              contentStyle: {
                backgroundColor: '#0d1117',
              },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
