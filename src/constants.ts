import { CardData, ThemeType } from './types';

export const CARDS: CardData[] = [
  {
    id: 1,
    title: "Eco\nDashboard",
    link: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    tags: ["UI/UX", "React"],
    theme: ThemeType.GREEN,
    rotation: -5
  },
  {
    id: 2,
    title: "Neon\nCommerce",
    link: "#",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=1000&auto=format&fit=crop",
    tags: ["E-commerce", "WebGL"],
    theme: ThemeType.PINK,
    rotation: 3
  },
  {
    id: 3,
    title: "FinTech\nApp",
    link: "#",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
    tags: ["Finance", "Mobile"],
    theme: ThemeType.BLUE,
    rotation: -3
  },
  {
    id: 4,
    title: "Dark\nMode System",
    link: "#",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    tags: ["Design System", "CSS"],
    theme: ThemeType.DARK,
    rotation: 6
  }
];
