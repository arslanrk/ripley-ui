export interface Achievement {
  id: string;
  title: string;
  year?: string;
  image?: string;
  alt?: string;
}

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "WWE Women's World Champion",
    year: "2024",
    image: "/images/RR-as-women-champion.jpg",
    alt: "Rhea Ripley with WWE Women's World Championship",
  },
  {
    id: "2",
    title: "WWE Raw Women's Champion",
    year: "2023",
    image: "/images/RR-as-raw-women-champ.jpg",
    alt: "Rhea Ripley with WWE Raw Women's Championship",
  },
  {
    id: "3",
    title: "WWE Women's Tag Team Champion",
    year: "2023",
    image: "/images/RR-as-tag-team-champion.jpg",
    alt: "Rhea Ripley and Nikki A.S.H. with WWE Women's Tag Team Championship",
  },
  {
    id: "4",
    title: "NXT UK Women's Champion",
    year: "2019",
    image: "/images/RR-as-nxt-uk-champion.jpg",
    alt: "Rhea Ripley with NXT UK Women's Championship",
  },
  {
    id: "5",
    title: "NXT Women's Champion",
    year: "2020",
    image: "/images/RR-as-nxt-champ.jpg",
    alt: "Rhea Ripley with NXT Women's Championship",
  },
  {
    id: "6",
    title: "Royal Rumble Winner",
    year: "2023",
    image: "/images/RR-as-royal-rumble-winner.jpg",
    alt: "Rhea Ripley as Royal Rumble Winner",
  },
];



