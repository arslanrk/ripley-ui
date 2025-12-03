export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  category: "Match" | "Promo" | "Entrance" | "Highlight";
}

export const videos: Video[] = [
  {
    id: "1",
    title: "Rhea Ripley Highlights",
    description: "Amazing moments and highlights from Rhea Ripley",
    youtubeId: "Toclo3-LEp4",
    thumbnail: "https://img.youtube.com/vi/Toclo3-LEp4/maxresdefault.jpg",
    category: "Highlight",
  },
  {
    id: "2",
    title: "Rhea Ripley Action",
    description: "Intense action and dominance in the ring",
    youtubeId: "vOeskk4KDS0",
    thumbnail: "https://img.youtube.com/vi/vOeskk4KDS0/maxresdefault.jpg",
    category: "Match",
  },
  {
    id: "3",
    title: "Rhea Ripley Moments",
    description: "Epic moments showcasing Rhea Ripley's power",
    youtubeId: "JWbQ1L4-6R4",
    thumbnail: "https://img.youtube.com/vi/JWbQ1L4-6R4/maxresdefault.jpg",
    category: "Highlight",
  },
  {
    id: "4",
    title: "Rhea Ripley vs. IYO SKY - Women's World Title Match",
    description: "Full match: Rhea Ripley defends her Women's World Championship against IYO SKY on Raw",
    youtubeId: "qmGsFr_6sl0",
    thumbnail: "https://img.youtube.com/vi/qmGsFr_6sl0/maxresdefault.jpg",
    category: "Match",
  },
  {
    id: "5",
    title: "Rhea Ripley vs. Raquel Rodriguez - Full Match",
    description: "Intense match between Rhea Ripley and Raquel Rodriguez at WWE Live Event",
    youtubeId: "afgIkKJwIvg",
    thumbnail: "https://img.youtube.com/vi/afgIkKJwIvg/maxresdefault.jpg",
    category: "Match",
  },
];

