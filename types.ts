export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  imageUrl: string;
  details: string; // Longer description for the modal
  tags: string[];
}

export interface Position {
  x: number;
  y: number;
}