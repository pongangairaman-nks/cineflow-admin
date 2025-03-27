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
  genre: string;
  type: string;
  url: string;
  poster: string;
  likes: number;
  likesBy: Like[]; // Assuming these are user IDs
  comments: Comment[]; // You might want to define a more specific type for comments
  aiDescription?: string; // Optional field
}
