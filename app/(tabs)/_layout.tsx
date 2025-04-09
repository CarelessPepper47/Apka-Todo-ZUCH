// app/(tabs)/_layout.tsx

import { Redirect, Tabs, Slot } from 'expo-router';
import { useUser } from '../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { HapticTab } from '@/components/HapticTab';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type TabBarIconProps = {
  color: string;
  size?: number;
  focused?: boolean;
};

export default function TabsLayout() {
  const { user } = useUser();
  const colorScheme = useColorScheme();

  if (!user) {
    return <Redirect href="/index" />; // Nie jesteś zalogowany? To won na login 😅
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="todo"
        options={{
          title: 'ToDoApp',
          tabBarIcon: ({ color }: TabBarIconProps) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
