export interface PetType {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  ageGroup: string;
  gender: string;
  description: string;
  healthInfo: string[];
  location: string;
  postedTime: string;
  imageUrl: string;
  color: string;
  isFavorite?: boolean;
}

export interface ChatType {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface MessageType {
  id: string;
  chatId: string;
  text: string;
  timestamp: string;
  sender: 'currentUser' | 'other';
}

export interface FilterOptions {
  species: string[];
  age: string[];
  gender: string[];
}