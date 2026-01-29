export enum UserRole {
  FREELANCER = 'Freelancer',
  CLIENT = 'Client',
  ADMIN = 'Admin'
}

export enum OrderStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  DISPUTED = 'Disputed'
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  profile?: {
    bio: string;
    skills: string[];
    rating: number;
  };
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  freelancerId: string;
  freelancerName: string;
  deliveryTimeDays: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

export interface Order {
  _id: string;
  serviceId: string;
  serviceTitle: string;
  clientId: string;
  clientName: string;
  freelancerId: string;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}