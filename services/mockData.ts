import { User, UserRole, Service, Order, OrderStatus } from '../types';

// Mock Users
export const MOCK_USERS: User[] = [
  {
    _id: 'u1',
    name: 'Alice Dev',
    email: 'alice@example.com',
    role: UserRole.FREELANCER,
    avatar: 'https://picsum.photos/id/64/200/200',
    profile: {
      bio: 'Full Stack Developer specialized in MERN stack and .NET',
      skills: ['React', 'Node.js', 'C#', 'MongoDB'],
      rating: 4.9
    }
  },
  {
    _id: 'u2',
    name: 'Bob Client',
    email: 'bob@example.com',
    role: UserRole.CLIENT,
    avatar: 'https://picsum.photos/id/65/200/200'
  }
];

// Mock Services
export const MOCK_SERVICES: Service[] = [
  {
    _id: 's1',
    title: 'Professional React & .NET Application',
    description: 'I will build a scalable web application using React, ASP.NET Core, and MongoDB. Includes authentication, real-time features, and polished UI.',
    category: 'Web Development',
    price: 500,
    freelancerId: 'u1',
    freelancerName: 'Alice Dev',
    deliveryTimeDays: 7,
    imageUrl: 'https://picsum.photos/id/180/800/600',
    rating: 4.9,
    reviewCount: 24
  },
  {
    _id: 's2',
    title: 'Modern Logo & Brand Identity',
    description: 'Minimalist logo design with a full brand identity package including color palette and typography usage guidelines.',
    category: 'Graphic Design',
    price: 150,
    freelancerId: 'u3', // Hypothetical other freelancer
    freelancerName: 'Charlie Design',
    deliveryTimeDays: 3,
    imageUrl: 'https://picsum.photos/id/40/800/600',
    rating: 4.7,
    reviewCount: 56
  },
  {
    _id: 's3',
    title: 'SEO Optimization for E-commerce',
    description: 'Boost your sales with comprehensive on-page and technical SEO audits.',
    category: 'Digital Marketing',
    price: 300,
    freelancerId: 'u1',
    freelancerName: 'Alice Dev',
    deliveryTimeDays: 5,
    imageUrl: 'https://picsum.photos/id/60/800/600',
    rating: 4.8,
    reviewCount: 12
  }
];

// Mock Orders
export const MOCK_ORDERS: Order[] = [
  {
    _id: 'o1',
    serviceId: 's1',
    serviceTitle: 'Professional React & .NET Application',
    clientId: 'u2',
    clientName: 'Bob Client',
    freelancerId: 'u1',
    status: OrderStatus.IN_PROGRESS,
    totalPrice: 500,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
  },
  {
    _id: 'o2',
    serviceId: 's2',
    serviceTitle: 'Modern Logo & Brand Identity',
    clientId: 'u2',
    clientName: 'Bob Client',
    freelancerId: 'u3',
    status: OrderStatus.COMPLETED,
    totalPrice: 150,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString() // 10 days ago
  }
];

// Simulation Service
export const api = {
  getServices: async (): Promise<Service[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_SERVICES), 500));
  },
  getServiceById: async (id: string): Promise<Service | undefined> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_SERVICES.find(s => s._id === id)), 300));
  },
  getOrdersByFreelancer: async (freelancerId: string): Promise<Order[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_ORDERS.filter(o => o.freelancerId === freelancerId)), 500));
  },
  getOrdersByClient: async (clientId: string): Promise<Order[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_ORDERS.filter(o => o.clientId === clientId)), 500));
  },
  createOrder: async (order: Omit<Order, '_id'>): Promise<Order> => {
    return new Promise((resolve) => {
      const newOrder = { ...order, _id: Math.random().toString(36).substr(2, 9) };
      MOCK_ORDERS.unshift(newOrder); // Add to mock DB
      setTimeout(() => resolve(newOrder), 800);
    });
  }
};