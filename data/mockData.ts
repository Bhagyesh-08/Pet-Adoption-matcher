export const mockPets = [
  {
    id: '1',
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    ageGroup: 'Young',
    gender: 'Male',
    description: 'Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He\'s great with children and other pets, and he\'s looking for an active family who can give him lots of love and attention.',
    healthInfo: ['Vaccinated', 'Microchipped', 'Neutered'],
    location: 'San Francisco, CA',
    postedTime: '2 days ago',
    imageUrl: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'Golden',
    isFavorite: true
  },
  {
    id: '2',
    name: 'Luna',
    species: 'Cat',
    breed: 'Siamese',
    age: '1 year',
    ageGroup: 'Young',
    gender: 'Female',
    description: 'Luna is a beautiful Siamese cat with striking blue eyes. She\'s playful but also enjoys quiet time curled up on a lap. Luna is litter-trained and well-behaved.',
    healthInfo: ['Vaccinated', 'Microchipped', 'Spayed'],
    location: 'Oakland, CA',
    postedTime: '1 week ago',
    imageUrl: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'Cream & Brown',
    isFavorite: false
  },
  {
    id: '3',
    name: 'Buddy',
    species: 'Dog',
    breed: 'Labrador Retriever',
    age: '5 years',
    ageGroup: 'Adult',
    gender: 'Male',
    description: 'Buddy is a well-trained Labrador with a gentle temperament. He loves swimming and playing with his toys. Buddy is good with children and would make a great family pet.',
    healthInfo: ['Vaccinated', 'Microchipped', 'Neutered'],
    location: 'San Jose, CA',
    postedTime: '3 days ago',
    imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'Yellow',
    isFavorite: true
  },
  {
    id: '4',
    name: 'Whiskers',
    species: 'Cat',
    breed: 'Maine Coon',
    age: '3 years',
    ageGroup: 'Adult',
    gender: 'Male',
    description: 'Whiskers is a majestic Maine Coon with a fluffy coat and friendly personality. He enjoys being brushed and will follow you around the house.',
    healthInfo: ['Vaccinated', 'Microchipped', 'Neutered'],
    location: 'Berkeley, CA',
    postedTime: '5 days ago',
    imageUrl: 'https://images.pexels.com/photos/96428/pexels-photo-96428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'Tabby',
    isFavorite: false
  },
  {
    id: '5',
    name: 'Daisy',
    species: 'Dog',
    breed: 'Beagle',
    age: '7 months',
    ageGroup: 'Puppy',
    gender: 'Female',
    description: 'Daisy is an adorable Beagle puppy full of energy and curiosity. She\'s still learning basic commands but is very intelligent and eager to please.',
    healthInfo: ['Vaccinated', 'Microchipped'],
    location: 'Palo Alto, CA',
    postedTime: '1 day ago',
    imageUrl: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'Tri-color',
    isFavorite: false
  },
  {
    id: '6',
    name: 'Oliver',
    species: 'Cat',
    breed: 'British Shorthair',
    age: '4 years',
    ageGroup: 'Adult',
    gender: 'Male',
    description: 'Oliver is a handsome British Shorthair with a plush gray coat. He\'s calm and independent but enjoys company when he\'s in the mood.',
    healthInfo: ['Vaccinated', 'Microchipped', 'Neutered'],
    location: 'San Francisco, CA',
    postedTime: '1 week ago',
    imageUrl: 'https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'Gray',
    isFavorite: false
  }
];

export const mockChats = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatarUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
    lastMessage: 'Hi there! I\'m interested in adopting Max. Is he still available?',
    lastMessageTime: '10:30 AM',
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Michael Brown',
    avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
    lastMessage: 'Thank you for the information. I would love to meet Whiskers in person. When would be a good time?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Emily Wilson',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    lastMessage: 'I have a few questions about Luna\'s medical history before I make a decision.',
    lastMessageTime: 'Yesterday',
    unreadCount: 1
  }
];

export const mockMessages = [
  {
    id: '1',
    chatId: '1',
    text: 'Hi there! I\'m interested in adopting Max. Is he still available?',
    timestamp: '2023-06-10T10:30:00Z',
    sender: 'other'
  },
  {
    id: '2',
    chatId: '1',
    text: 'Yes, Max is still available! He\'s a wonderful dog with a loving personality.',
    timestamp: '2023-06-10T10:35:00Z',
    sender: 'currentUser'
  },
  {
    id: '3',
    chatId: '1',
    text: 'Great! Would it be possible to meet him this weekend?',
    timestamp: '2023-06-10T10:38:00Z',
    sender: 'other'
  },
  {
    id: '4',
    chatId: '1',
    text: 'Absolutely! We\'re available on Saturday afternoon. Would 2 PM work for you?',
    timestamp: '2023-06-10T10:42:00Z',
    sender: 'currentUser'
  },
  {
    id: '5',
    chatId: '1',
    text: 'That works perfectly. Can you send me the address?',
    timestamp: '2023-06-10T10:45:00Z',
    sender: 'other'
  },
  {
    id: '6',
    chatId: '2',
    text: 'Hello, I saw your listing for Whiskers and I\'m very interested. Could you tell me more about his personality?',
    timestamp: '2023-06-09T15:20:00Z',
    sender: 'other'
  },
  {
    id: '7',
    chatId: '2',
    text: 'Hi Michael! Whiskers is a very gentle and affectionate cat. He loves to sit on laps and be petted, and he gets along well with other cats.',
    timestamp: '2023-06-09T15:30:00Z',
    sender: 'currentUser'
  },
  {
    id: '8',
    chatId: '2',
    text: 'Thank you for the information. I would love to meet Whiskers in person. When would be a good time?',
    timestamp: '2023-06-09T15:35:00Z',
    sender: 'other'
  }
];