import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';



export default function RootLayout() {
  
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    
      
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="landing" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/SignUp" options={{ headerTitle: '', headerTransparent: true }} />
        {/* <Stack.Screen name="(auth)/SignIn" options={{ headerShown: false }} />   */}

        </Stack>
    
  );
}
