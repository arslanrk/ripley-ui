export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  type: "Championship" | "Debut" | "Milestone" | "Achievement";
  imageUrl?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    year: "2017",
    title: "NXT UK Debut",
    description: "Made her debut in NXT UK, establishing herself as a dominant force",
    type: "Debut",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    year: "2019",
    title: "NXT UK Women's Champion",
    description: "Captured the NXT UK Women's Championship, her first major title",
    type: "Championship",
    imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    year: "2020",
    title: "NXT Women's Champion",
    description: "Won the NXT Women's Championship, solidifying her status as a top competitor",
    type: "Championship",
    imageUrl: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    year: "2021",
    title: "Main Roster Debut",
    description: "Debuted on WWE Raw, bringing her intensity to the main roster",
    type: "Debut",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
  },
  {
    id: "5",
    year: "2022",
    title: "Joined The Judgment Day",
    description: "Became a key member of The Judgment Day, establishing her dominance",
    type: "Milestone",
    imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop",
  },
  {
    id: "6",
    year: "2023",
    title: "Royal Rumble Winner",
    description: "Won the Women's Royal Rumble match, earning a WrestleMania main event",
    type: "Achievement",
    imageUrl: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&h=400&fit=crop",
  },
  {
    id: "7",
    year: "2023",
    title: "WrestleMania 39 Main Event",
    description: "Main evented WrestleMania 39, one of the biggest moments in women's wrestling",
    type: "Milestone",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
  },
  {
    id: "8",
    year: "2024",
    title: "Women's World Champion",
    description: "Currently holding the WWE Women's World Championship, continuing her dominance",
    type: "Championship",
    imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop",
  },
];

