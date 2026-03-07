export type Category = 'INDOOR' | 'OUTDOOR' | 'TECHNICAL' | 'NON-TECHNICAL';

export interface Event {
  id: string;
  title: string;
  category: Category;
  description: string;
  rules: string[];
  coordinator: {
    name: string;
    contact: string;
    photo: string;
  };
  registeredCount: number;
  date: string;
  time: string;
  venue: string;
  image: string;
  formUrl: string;
}

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e9',
    title: 'Quiz Blitz',
    category: 'TECHNICAL',
    description: 'A rapid-fire technical quiz covering programming fundamentals, data structures, algorithms, operating systems, and current tech trends. Think fast, answer faster.',
    rules: [
      'Individual participation only.',
      'Three rounds: written, buzzer, and rapid fire.',
      'No electronic devices allowed during the quiz.',
      'Tie-breaker questions will be used if needed.',
      'The quizmaster\'s decision is final.'
    ],
    coordinator: {
      name: 'Balgani Naveen',
      contact: '+91 9951518580',
      photo: 'https://i.pravatar.cc/150?u=balgani'
    },
    registeredCount: 85,
    date: '2026-03-10',
    time: '10:00 AM',
    venue: 'Information Technology Department',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&h=600&fit=crop&auto=format',
    formUrl: 'https://forms.gle/mt52LraiqHuqfL3o9'
  },
  {
    id: 'e10',
    title: 'Coding Contest',
    category: 'TECHNICAL',
    description: 'A classic competitive programming showdown. Solve algorithmic problems of increasing difficulty within a fixed time limit. Accuracy and speed both matter.',
    rules: [
      'Individual participation only.',
      'Duration: 2 hours, 6 problems.',
      'Languages allowed: C, C++, Java, Python.',
      'Use of internet or AI tools is strictly prohibited.',
      'Partial scoring is enabled for some problems.'
    ],
    coordinator: {
      name: 'Balgani Naveen',
      contact: '+91 9951518580',
      photo: 'https://i.pravatar.cc/150?u=balgani'
    },
    registeredCount: 95,
    date: '2026-03-10',
    time: '02:00 PM',
    venue: 'Information Technology Department',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&auto=format',
    formUrl: 'https://forms.gle/aWVF4W9SCdE1xXGi8'
  },
  {
    id: 'e11',
    title: 'Vibeathon',
    category: 'TECHNICAL',
    description: 'Build the most creative and visually stunning web application in just 4 hours. No restrictions on theme. Judging is based on design, creativity, functionality, and the overall vibe of your project.',
    rules: [
      'Teams of 2-3 members.',
      'Duration: 4 hours.',
      'Any frontend or full-stack framework is allowed.',
      'Pre-built components and UI libraries are permitted.',
      'Projects must be deployed or demo-ready by the deadline.'
    ],
    coordinator: {
      name: 'Balgani Naveen',
      contact: '+91 9951518580',
      photo: 'https://i.pravatar.cc/150?u=balgani'
    },
    registeredCount: 72,
    date: '2026-03-17',
    time: '10:00 AM',
    venue: 'Information Technology Department',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop&auto=format',
    formUrl: 'https://forms.gle/8ZxgPbKSRdQoPbJE9'
  },
  {
    id: 'e12',
    title: 'Cyber Hunt',
    category: 'TECHNICAL',
    description: 'A thrilling Capture The Flag style cybersecurity challenge. Solve puzzles involving cryptography, steganography, web exploitation, and forensics to find hidden flags.',
    rules: [
      'Teams of 2 members.',
      'Duration: 3 hours.',
      'Attacking other teams\' systems is strictly prohibited.',
      'Hints will be released at fixed intervals.',
      'The team with the most flags wins. Time is the tiebreaker.'
    ],
    coordinator: {
      name: 'Balgani Naveen',
      contact: '+91 9951518580',
      photo: 'https://i.pravatar.cc/150?u=balgani'
    },
    registeredCount: 60,
    date: '2026-03-18',
    time: '01:00 PM',
    venue: 'Information Technology Department',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&auto=format',
    formUrl: 'https://forms.gle/fVoqx1Q5mof64nGS6'
  }
];

export interface Registration {
  id: string;
  eventId: string;
  regNo: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  date: string;
  photoUrl?: string;
  status: 'Confirmed' | 'Pending';
}

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'REG-001',
    eventId: 'e9',
    regNo: 'CS2023001',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    department: 'Computer Science',
    year: '3rd',
    date: new Date().toISOString(),
    status: 'Confirmed'
  }
];
