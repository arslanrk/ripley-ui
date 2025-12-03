export interface SignatureMove {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  type: "Finisher" | "Signature";
}

export const signatureMoves: SignatureMove[] = [
  {
    id: "1",
    name: "Riptide",
    description: "Rhea Ripley's devastating finishing move - a powerful slam that has ended countless matches",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/embed/mquWUzzAko4",
    type: "Finisher",
  },
  {
    id: "2",
    name: "Prism Trap",
    description: "A brutal submission hold that showcases Ripley's technical prowess and strength",
    imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    type: "Finisher",
  },
  {
    id: "3",
    name: "Cloverleaf",
    description: "A painful submission maneuver that targets the opponent's legs and back",
    imageUrl: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop",
    type: "Signature",
  },
  {
    id: "4",
    name: "Running Dropkick",
    description: "A high-impact aerial attack demonstrating Ripley's agility and power",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    type: "Signature",
  },
];

