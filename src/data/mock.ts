export type Category = 'INDOOR' | 'OUTDOOR' | 'TECHNICAL' | 'NON-TECHNICAL';
export type Section = 'BOYS' | 'GIRLS';

export interface Event {
  id: string;
  title: string;
  category: Category;
  section: Section;
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
}

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Code Relay',
    category: 'TECHNICAL',
    section: 'BOYS',
    description: 'A fast-paced coding competition where teams of 3 take turns to solve algorithmic challenges. Speed and accuracy are key.',
    rules: [
      'Teams of exactly 3 members.',
      'Only one member codes at a time.',
      'Swaps happen every 10 minutes.',
      'Use of internet is prohibited.'
    ],
    coordinator: {
      name: 'Alex Johnson',
      contact: '+1 234 567 8900',
      photo: 'https://i.pravatar.cc/150?u=alex'
    },
    registeredCount: 45,
    date: '2026-04-15',
    time: '10:00 AM',
    venue: 'Computer Lab 1',
    image: 'https://picsum.photos/seed/code/800/600'
  },
  {
    id: 'e2',
    title: 'Hackathon 24H',
    category: 'TECHNICAL',
    section: 'GIRLS',
    description: 'A 24-hour hackathon to build innovative solutions for real-world problems. Bring your best ideas and code them to life.',
    rules: [
      'Teams of 2-4 members.',
      'All code must be written during the event.',
      'Final presentation is mandatory.',
      'Open source libraries are allowed.'
    ],
    coordinator: {
      name: 'Sarah Williams',
      contact: '+1 234 567 8901',
      photo: 'https://i.pravatar.cc/150?u=sarah'
    },
    registeredCount: 120,
    date: '2026-04-16',
    time: '09:00 AM',
    venue: 'Main Auditorium',
    image: 'https://picsum.photos/seed/hackathon/800/600'
  },
  {
    id: 'e3',
    title: 'Futsal Tournament',
    category: 'OUTDOOR',
    section: 'BOYS',
    description: 'High-energy 5-a-side football tournament. Show off your skills and teamwork on the field.',
    rules: [
      '5 players on field + 3 substitutes.',
      'Matches are 15 minutes per half.',
      'Standard futsal rules apply.',
      'Proper sports attire is mandatory.'
    ],
    coordinator: {
      name: 'Michael Chen',
      contact: '+1 234 567 8902',
      photo: 'https://i.pravatar.cc/150?u=michael'
    },
    registeredCount: 80,
    date: '2026-04-15',
    time: '02:00 PM',
    venue: 'College Sports Ground',
    image: 'https://picsum.photos/seed/futsal/800/600'
  },
  {
    id: 'e4',
    title: 'Relay Race 4x100m',
    category: 'OUTDOOR',
    section: 'GIRLS',
    description: 'Test your speed and coordination in the classic 4x100m relay race.',
    rules: [
      'Teams of exactly 4 members.',
      'Baton must be passed within the exchange zone.',
      'Standard track rules apply.'
    ],
    coordinator: {
      name: 'Emily Davis',
      contact: '+1 234 567 8903',
      photo: 'https://i.pravatar.cc/150?u=emily'
    },
    registeredCount: 32,
    date: '2026-04-16',
    time: '04:00 PM',
    venue: 'Athletics Track',
    image: 'https://picsum.photos/seed/relay/800/600'
  },
  {
    id: 'e5',
    title: 'Chess Championship',
    category: 'INDOOR',
    section: 'BOYS',
    description: 'Strategic minds clash in this intense chess tournament. Swiss format.',
    rules: [
      'Individual participation.',
      'Swiss system, 5 rounds.',
      'Time control: 15 mins + 10s increment.',
      'Arbiter decision is final.'
    ],
    coordinator: {
      name: 'David Lee',
      contact: '+1 234 567 8904',
      photo: 'https://i.pravatar.cc/150?u=david'
    },
    registeredCount: 64,
    date: '2026-04-15',
    time: '11:00 AM',
    venue: 'Indoor Sports Complex',
    image: 'https://picsum.photos/seed/chess/800/600'
  },
  {
    id: 'e6',
    title: 'Table Tennis Singles',
    category: 'INDOOR',
    section: 'GIRLS',
    description: 'Fast-paced table tennis action. Knockout format.',
    rules: [
      'Individual participation.',
      'Best of 3 games for qualifiers, best of 5 for semis/finals.',
      'Standard ITTF rules apply.'
    ],
    coordinator: {
      name: 'Jessica Taylor',
      contact: '+1 234 567 8905',
      photo: 'https://i.pravatar.cc/150?u=jessica'
    },
    registeredCount: 48,
    date: '2026-04-16',
    time: '10:00 AM',
    venue: 'Indoor Sports Complex',
    image: 'https://picsum.photos/seed/tt/800/600'
  },
  {
    id: 'e7',
    title: 'Debate Competition',
    category: 'NON-TECHNICAL',
    section: 'BOYS',
    description: 'Articulate your thoughts and argue your points in the annual debate competition.',
    rules: [
      'Teams of 2 members.',
      'Topics given 15 minutes prior.',
      '3 minutes per speaker.',
      'Rebuttal round included.'
    ],
    coordinator: {
      name: 'Robert Wilson',
      contact: '+1 234 567 8906',
      photo: 'https://i.pravatar.cc/150?u=robert'
    },
    registeredCount: 20,
    date: '2026-04-15',
    time: '01:00 PM',
    venue: 'Seminar Hall A',
    image: 'https://picsum.photos/seed/debate/800/600'
  },
  {
    id: 'e8',
    title: 'Creative Writing',
    category: 'NON-TECHNICAL',
    section: 'GIRLS',
    description: 'Let your imagination run wild. Write a short story or poem based on a given prompt.',
    rules: [
      'Individual participation.',
      'Time limit: 1 hour.',
      'Word limit: 500-1000 words.',
      'Plagiarism will lead to disqualification.'
    ],
    coordinator: {
      name: 'Olivia Martinez',
      contact: '+1 234 567 8907',
      photo: 'https://i.pravatar.cc/150?u=olivia'
    },
    registeredCount: 55,
    date: '2026-04-16',
    time: '11:00 AM',
    venue: 'Library Reading Room',
    image: 'https://picsum.photos/seed/writing/800/600'
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

// Initial mock registrations
export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'REG-001',
    eventId: 'e1',
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
