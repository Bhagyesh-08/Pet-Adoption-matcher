import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { ChatType } from '@/types';

interface ChatListItemProps {
  chat: ChatType;
}

export default function ChatListItem({ chat }: ChatListItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  
  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: chat.avatarUrl }} style={styles.avatar} />
        {chat.unreadCount > 0 && (
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text style={styles.badgeText}>{chat.unreadCount}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.name, { color: colors.text }]}>{chat.name}</Text>
          <Text style={[styles.time, { color: colors.textDim }]}>{chat.lastMessageTime}</Text>
        </View>
        
        <Text 
          style={[
            styles.message, 
            { color: chat.unreadCount > 0 ? colors.text : colors.textDim }
          ]}
          numberOfLines={2}
        >
          {chat.lastMessage}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
});