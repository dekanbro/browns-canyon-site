export interface Rapid {
  id: string
  name: string
  class: string
  position: { x: number; y: number }
  description: string
  notes: string
  videoUrl?: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export interface ConditionUpdate {
  id: number
  name: string
  date: string
  message: string
}

export interface GuideStory {
  id: number
  name: string
  years: string
  quote: string
  rapid?: string
  image: string
}

export interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
}

export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: "apparel" | "stickers" | "3d-maps" | "posters" | "other"
}
