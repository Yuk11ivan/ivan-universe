// 全局类型定义
export interface CoffeeData {
  id: string;
  name: string;
  type: string;
  image: string;
  flavor?: string;
  description?: string;
  rating?: number;
}

export interface MovieData {
  id: string;
  title: string;
  originalTitle?: string;
  type: string;
  image: string;
  rating?: number;
  review?: string;
  releaseYear?: number;
  director?: string;
}

export interface PhotoData {
  id: string;
  src: string;
  caption?: string;
}

export interface MusicData {
  id: string;
  artist: string;
  album: string;
  image: string;
  type?: string;
  year?: number;
}