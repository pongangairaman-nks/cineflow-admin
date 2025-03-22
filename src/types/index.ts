// ✅ Like Type
export interface Like {
  _id: string;
  userId: string;
  videoId: string;
  createdAt: string;
}

// ✅ Comment Type
export interface Comment {
  _id: string;
  userId: string;
  videoId: string;
  text: string;
  createdAt: string;
}

// ✅ Video Type
export interface IVideo {
  _id: string;
  title: string;
  type: string;
  genre: string;
  url: string;
  posterUrl: string;
  aiDescription?: string;
  likes: number;
  likesBy: Like[];
  comments: Comment[];
}
