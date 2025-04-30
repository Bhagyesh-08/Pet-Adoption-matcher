import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Chrome as Home, Heart, Plus, MessageCircle, User } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textDim,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Discover',
            tabBarIcon: ({ color, size }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color, size }) => (
              <Heart size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="add-pet"
          options={{
            title: 'Add Pet',
            tabBarIcon: ({ color, size }) => (
              <View style={styles.addButton}>
                <Plus size={size} color="white" />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: 'Messages',
            tabBarIcon: ({ color, size }) => (
              <MessageCircle size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <User size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#6366F1',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
});