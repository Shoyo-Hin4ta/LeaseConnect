// data.tsx
export interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
  }
  
  export interface UserData {
    id: number;
    name: string;
    avatar: string;
    isOnline: boolean;
    messages?: Message[];
  }
  
  export const userData: UserData[] = [
    {
      id: 1,
      name: 'Jane Doe',
      avatar: '/User1.png',
      isOnline: true,
      messages: [
        { id: 1, sender: 'Jane Doe', content: 'Hey, Jakob', timestamp: '2023-05-01T10:00:00Z' },
        { id: 2, sender: 'Jakob Hoeg', content: 'Hey!', timestamp: '2023-05-01T10:01:00Z' },
        { id: 3, sender: 'Jane Doe', content: 'How are you?', timestamp: '2023-05-01T10:02:00Z' },
        { id: 4, sender: 'Jakob Hoeg', content: 'I am good, you?', timestamp: '2023-05-01T10:03:00Z' },
        { id: 5, sender: 'Jane Doe', content: 'I am good too!', timestamp: '2023-05-01T10:04:00Z' },
      ],
    },
    {
      id: 2,
      name: 'John Doe',
      avatar: '/User2.png',
      isOnline: false,
      messages: [],
    },
    {
      id: 3,
      name: 'Elizabeth Smith',
      avatar: '/User3.png',
      isOnline: true,
      messages: [],
    },
    {
      id: 4,
      name: 'John Smith',
      avatar: '/User4.png',
      isOnline: false,
      messages: [],
    },
  ];
  
  export const loggedInUserData = {
    id: 5,
    name: 'Jakob Hoeg',
    avatar: '/LoggedInUser.jpg',
    isOnline: true,
  };