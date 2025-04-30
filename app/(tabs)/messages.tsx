import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import ChatListItem from '@/components/chat/ChatListItem';
import { mockChats } from '@/data/mockData';

export default function MessagesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, this would re-fetch chats
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleChatPress = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Messages</Text>
      </View>
      
      {mockChats.length > 0 ? (
        <FlatList
          data={mockChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleChatPress(item.id)}>
              <ChatListItem chat={item} />
            </Pressable>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.textDim }]}>
            No messages yet
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.textDim }]}>
            When you contact a pet owner, your conversations will appear here.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyState: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});