// ── Event Data ──
export const EVENTS = [
  {
    id: 'hackathon',
    title: 'Hackathon',
    description: 'Build innovative solutions in 24 hours. Team up and compete for glory.',
    icon: '⚡',
    category: 'Competition',
    date: 'Day 1-2',
  },
  {
    id: 'ai-challenge',
    title: 'AI Challenge',
    description: 'Push the boundaries of artificial intelligence and machine learning.',
    icon: '🧠',
    category: 'Competition',
    date: 'Day 1',
  },
  {
    id: 'robotics',
    title: 'Robotics',
    description: 'Design, build and battle your robots in thrilling arena combat.',
    icon: '🤖',
    category: 'Competition',
    date: 'Day 2',
  },
  {
    id: 'ctf',
    title: 'Capture The Flag',
    description: 'Test your cybersecurity skills in this high-stakes hacking challenge.',
    icon: '🏴',
    category: 'Competition',
    date: 'Day 1',
  },
  {
    id: 'drone-race',
    title: 'Drone Race',
    description: 'Navigate through obstacle courses at breakneck speeds.',
    icon: '🚁',
    category: 'Competition',
    date: 'Day 2',
  },
  {
    id: 'gaming',
    title: 'Gaming Tournament',
    description: 'Compete in esports across multiple titles and prove your dominance.',
    icon: '🎮',
    category: 'Competition',
    date: 'Day 1-2',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Craft stunning user experiences that blend form with function.',
    icon: '🎨',
    category: 'Workshop',
    date: 'Day 1',
  },
  {
    id: 'paper-presentation',
    title: 'Paper Presentation',
    description: 'Present your research and innovations to industry experts.',
    icon: '📄',
    category: 'Academic',
    date: 'Day 2',
  },
] as const;

// ── Timeline Data ──
export const TIMELINE = [
  { time: '9:00 AM', title: 'Grand Opening', description: 'Inauguration ceremony with keynote speakers', day: 'Day 1' },
  { time: '10:00 AM', title: 'Hackathon Begins', description: '24-hour coding marathon kicks off', day: 'Day 1' },
  { time: '11:00 AM', title: 'Workshops', description: 'Parallel workshop sessions begin', day: 'Day 1' },
  { time: '2:00 PM', title: 'AI Challenge', description: 'Machine learning competition starts', day: 'Day 1' },
  { time: '4:00 PM', title: 'Gaming Tournament', description: 'Esports qualifiers begin', day: 'Day 1' },
  { time: '6:00 PM', title: 'CTF Launch', description: 'Cybersecurity challenge goes live', day: 'Day 1' },
  { time: '9:00 AM', title: 'Robotics Arena', description: 'Robot battles commence', day: 'Day 2' },
  { time: '11:00 AM', title: 'Drone Race', description: 'High-speed drone racing event', day: 'Day 2' },
  { time: '2:00 PM', title: 'Paper Presentations', description: 'Research showcase sessions', day: 'Day 2' },
  { time: '5:00 PM', title: 'Grand Finale', description: 'Prize distribution and closing ceremony', day: 'Day 2' },
] as const;

// ── Team Data ──
export const TEAM = [
  { name: 'Arjun Menon', position: 'Fest Coordinator', photo: '/team/placeholder.jpg', github: '#', linkedin: '#', twitter: '#' },
  { name: 'Priya Sharma', position: 'Technical Lead', photo: '/team/placeholder.jpg', github: '#', linkedin: '#', twitter: '#' },
  { name: 'Rahul Nair', position: 'Design Head', photo: '/team/placeholder.jpg', github: '#', linkedin: '#', twitter: '#' },
  { name: 'Ananya Krishnan', position: 'Events Manager', photo: '/team/placeholder.jpg', github: '#', linkedin: '#', twitter: '#' },
  { name: 'Vishnu Dev', position: 'Sponsorship Lead', photo: '/team/placeholder.jpg', github: '#', linkedin: '#', twitter: '#' },
  { name: 'Meera Thomas', position: 'Marketing Head', photo: '/team/placeholder.jpg', github: '#', linkedin: '#', twitter: '#' },
  { name: 'Aditya Kumar', position: 'Web Developer', photo: '/team/placeholder.jpg', github: '#', linkedin: '#', twitter: '#' },
  { name: 'Sneha Pillai', position: 'PR & Media', photo: '/team/placeholder.jpg', github: '#', linkedin: '#', twitter: '#' },
] as const;

// ── Sponsors Data ──
export const SPONSORS = [
  { name: 'TechCorp', tier: 'Platinum' },
  { name: 'InnovateLabs', tier: 'Platinum' },
  { name: 'CloudSync', tier: 'Gold' },
  { name: 'DataForge', tier: 'Gold' },
  { name: 'CyberShield', tier: 'Gold' },
  { name: 'NeuralWave', tier: 'Silver' },
  { name: 'QuantumBit', tier: 'Silver' },
  { name: 'ByteStream', tier: 'Silver' },
  { name: 'PixelCraft', tier: 'Silver' },
  { name: 'CodeNexus', tier: 'Bronze' },
  { name: 'DevSphere', tier: 'Bronze' },
  { name: 'AlgoMind', tier: 'Bronze' },
] as const;

// ── Statistics ──
export const STATS = [
  { value: 3000, suffix: '+', label: 'Participants' },
  { value: 60, suffix: '+', label: 'Events' },
  { value: 20, suffix: '+', label: 'Workshops' },
  { value: 15, suffix: '+', label: 'Sponsors' },
] as const;

// ── Nav Links ──
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
] as const;

// ── Countdown Target Date ──
export const FEST_DATE = new Date('2026-02-15T09:00:00+05:30');

// ── Colors ──
export const COLORS = {
  primary: '#7C3AED',
  primaryLight: '#8B5CF6',
  secondary: '#A855F7',
  accent: '#FF4DFF',
  background: '#050510',
  surface: 'rgba(255,255,255,0.05)',
  blue: '#3B82F6',
} as const;
