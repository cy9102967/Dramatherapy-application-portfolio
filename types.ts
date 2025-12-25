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

export type VideoSource = 'youtube' | 'instagram' | 'local';

export interface VideoItem {
  id: string;
  source: VideoSource;
  url: string; // The full URL or local path
  title: string;
  date: string;
  description: string;
  thumbnailUrl?: string; // Optional thumbnail if we can't derive it or want a custom one
}