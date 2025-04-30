import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform, 
  Image 
} from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { ChevronLeft, Send } from 'lucide-react-native';
import Animated, { FadeInRight, FadeInLeft } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { mockChats, mockMessages } from '@/data/mockData';
import { MessageType } from '@/types';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const chatId = typeof id === 'string' ? id : 'new';
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || 'light'];
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>(
    chatId !== 'new' ? mockMessages.filter(m => m.chatId === chatId) : []
  );
  const flatListRef = useRef<FlatList>(null);
  
  const chat = mockChats.find(c => c.id === chatId);
  const chatName = chat?.name || 'New Chat';
  const chatImage = chat?.avatarUrl || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200';

  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage: MessageType = {
      id: Date.now().toString(),
      chatId: chatId,
      text: message,
      timestamp: new Date().toISOString(),
      sender: 'currentUser',
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate reply after 1 second
    if (messages.length < 2) {
      setTimeout(() => {
        const replyMessage: MessageType = {
          id: (Date.now() + 1).toString(),
          chatId: chatId,
          text: "Thanks for your interest! When would you like to meet this adorable pet?",
          timestamp: new Date().toISOString(),
          sender: 'other',
        };
        setMessages(prevMessages => [...prevMessages, replyMessage]);
      }, 1000);
    }
  };

  const renderMessage = ({ item }: { item: MessageType }) => {
    const isCurrentUser = item.sender === 'currentUser';
    
    return (
      <Animated.View 
        entering={isCurrentUser ? FadeInRight.duration(300) : FadeInLeft.duration(300)}
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
          { 
            backgroundColor: isCurrentUser 
              ? colors.primary 
              : colorScheme === 'dark' ? colors.card : '#F1F5F9'
          }
        ]}
      >
        <Text style={[
          styles.messageText, 
          { color: isCurrentUser ? 'white' : colors.text }
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.messageTime, 
          { color: isCurrentUser ? 'rgba(255,255,255,0.8)' : colors.textDim }
        ]}>
          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: () => (
            <View style={styles.headerTitle}>
              <Image source={{ uri: chatImage }} style={styles.headerAvatar} />
              <Text style={[styles.headerText, { color: colors.text }]}>{chatName}</Text>
            </View>
          ),
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {messages.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messagesList}
          />
        ) : (
          <View style={styles.emptyChat}>
            <Text style={[styles.emptyChatText, { color: colors.textDim }]}>
              Start a conversation about this pet.
            </Text>
          </View>
        )}
        
        <View style={[styles.inputContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <TextInput
            style={[styles.input, { backgroundColor: colorScheme === 'dark' ? colors.background : '#F1F5F9', color: colors.text }]}
            placeholder="Type a message..."
            placeholderTextColor={colors.textDim}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <Pressable 
            onPress={sendMessage} 
            style={[styles.sendButton, { backgroundColor: colors.primary }]}
          >
            <Send size={20} color="white" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  headerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  messageTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 10,
    maxHeight: 100,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyChatText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});