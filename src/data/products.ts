import { Product } from '../types';

const img = (prompt: string) => 
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=square_hd`;

export const initialProducts: Product[] = [
  {
    id: 'uuid-1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 79.99,
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Crystal clear sound and comfortable fit for all-day wear.',
    image: img('modern black wireless headphones product photography white background'),
    stock: 50,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'uuid-2',
    name: 'Vintage Denim Jacket',
    category: 'Clothing',
    price: 129.99,
    description: 'Classic vintage-wash denim jacket with brass buttons. Perfect layering piece for any season.',
    image: img('vintage blue denim jacket fashion photography clean background'),
    stock: 30,
    createdAt: '2024-01-16T10:00:00Z'
  },
  {
    id: 'uuid-3',
    name: 'JavaScript: The Good Parts',
    category: 'Books',
    price: 24.99,
    description: 'Essential reading for every JavaScript developer. Master the essential features of this powerful language.',
    image: img('programming book JavaScript cover design modern typography'),
    stock: 100,
    createdAt: '2024-01-17T10:00:00Z'
  },
  {
    id: 'uuid-4',
    name: 'Smart Watch Pro',
    category: 'Electronics',
    price: 299.99,
    description: 'Advanced fitness tracking, heart rate monitoring, and notifications on your wrist. Water-resistant design.',
    image: img('modern smartwatch fitness tracker product photography elegant design'),
    stock: 25,
    createdAt: '2024-01-18T10:00:00Z'
  },
  {
    id: 'uuid-5',
    name: 'Cotton Summer Dress',
    category: 'Clothing',
    price: 59.99,
    description: 'Lightweight breathable cotton dress perfect for summer days. Flowy silhouette with floral accents.',
    image: img('elegant summer cotton dress fashion photography soft colors'),
    stock: 45,
    createdAt: '2024-01-19T10:00:00Z'
  },
  {
    id: 'uuid-6',
    name: 'Clean Code',
    category: 'Books',
    price: 32.99,
    description: 'A handbook of agile software craftsmanship. Write code that is easy to read, understand, and maintain.',
    image: img('clean code programming book cover professional design'),
    stock: 80,
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'uuid-7',
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 49.99,
    description: 'Portable waterproof speaker with 360-degree sound. Take your music anywhere with 20-hour battery life.',
    image: img('portable bluetooth speaker product photography modern design'),
    stock: 60,
    createdAt: '2024-01-21T10:00:00Z'
  },
  {
    id: 'uuid-8',
    name: 'Leather Belt',
    category: 'Clothing',
    price: 34.99,
    description: 'Genuine leather belt with brushed silver buckle. Classic design that complements any outfit.',
    image: img('genuine leather belt with silver buckle fashion accessory'),
    stock: 70,
    createdAt: '2024-01-22T10:00:00Z'
  },
  {
    id: 'uuid-9',
    name: 'Design Patterns',
    category: 'Books',
    price: 44.99,
    description: 'Elements of reusable object-oriented software. The classic guide to design patterns.',
    image: img('design patterns computer science book cover technical illustration'),
    stock: 55,
    createdAt: '2024-01-23T10:00:00Z'
  },
  {
    id: 'uuid-10',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 29.99,
    description: 'Ergonomic wireless mouse with silent clicks. Precise tracking on any surface.',
    image: img('ergonomic wireless mouse product photography minimalist design'),
    stock: 90,
    createdAt: '2024-01-24T10:00:00Z'
  },
  {
    id: 'uuid-11',
    name: 'Wool Sweater',
    category: 'Clothing',
    price: 89.99,
    description: 'Soft merino wool sweater in classic fit. Perfect for layering in colder months.',
    image: img('soft wool sweater fashion photography cozy winter clothing'),
    stock: 40,
    createdAt: '2024-01-25T10:00:00Z'
  },
  {
    id: 'uuid-12',
    name: 'The Pragmatic Programmer',
    category: 'Books',
    price: 39.99,
    description: 'Your journey to mastery in software development. Practical advice for every programmer.',
    image: img('pragmatic programmer book cover professional tech design'),
    stock: 65,
    createdAt: '2024-01-26T10:00:00Z'
  },
  {
    id: 'uuid-13',
    name: 'Portable Charger',
    category: 'Electronics',
    price: 39.99,
    description: '20000mAh power bank with fast charging. Charge your devices on the go, twice.',
    image: img('portable power bank charger product photography modern tech'),
    stock: 75,
    createdAt: '2024-01-27T10:00:00Z'
  },
  {
    id: 'uuid-14',
    name: 'Running Shoes',
    category: 'Clothing',
    price: 119.99,
    description: 'Lightweight running shoes with cushioned sole. Perfect for daily runs and workouts.',
    image: img('modern running shoes athletic footwear product photography'),
    stock: 35,
    createdAt: '2024-01-28T10:00:00Z'
  },
  {
    id: 'uuid-15',
    name: 'React Handbook',
    category: 'Books',
    price: 34.99,
    description: 'Master React.js with this comprehensive guide. From basics to advanced patterns.',
    image: img('React JavaScript framework book cover modern web development'),
    stock: 50,
    createdAt: '2024-01-29T10:00:00Z'
  },
  {
    id: 'uuid-16',
    name: 'USB-C Hub',
    category: 'Electronics',
    price: 59.99,
    description: '7-in-1 USB-C hub with HDMI, USB-A, SD card reader. Perfect for laptop connectivity.',
    image: img('USB-C hub adapter product photography tech accessory'),
    stock: 45,
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 'uuid-17',
    name: 'Casual T-Shirt',
    category: 'Clothing',
    price: 24.99,
    description: 'Premium cotton casual t-shirt in classic fit. Soft and breathable for everyday wear.',
    image: img('casual cotton t-shirt fashion photography plain white'),
    stock: 120,
    createdAt: '2024-02-02T10:00:00Z'
  },
  {
    id: 'uuid-18',
    name: 'Node.js Design Patterns',
    category: 'Books',
    price: 49.99,
    description: 'Master Node.js with practical design patterns for scalable applications.',
    image: img('Node.js programming book cover server side development'),
    stock: 60,
    createdAt: '2024-02-03T10:00:00Z'
  },
  {
    id: 'uuid-19',
    name: 'Laptop Sleeve',
    category: 'Electronics',
    price: 34.99,
    description: 'Water-resistant laptop sleeve for 13-15 inch laptops. Protect your device in style.',
    image: img('laptop sleeve case product photography minimalist design'),
    stock: 55,
    createdAt: '2024-02-04T10:00:00Z'
  },
  {
    id: 'uuid-20',
    name: 'Skinny Jeans',
    category: 'Clothing',
    price: 79.99,
    description: 'Premium denim skinny jeans with stretch fit. Comfort meets style.',
    image: img('skinny denim jeans fashion photography modern style'),
    stock: 40,
    createdAt: '2024-02-05T10:00:00Z'
  },
  {
    id: 'uuid-21',
    name: 'TypeScript Handbook',
    category: 'Books',
    price: 39.99,
    description: 'Learn TypeScript from the official handbook. Build type-safe applications.',
    image: img('TypeScript programming book cover Microsoft technology'),
    stock: 75,
    createdAt: '2024-02-06T10:00:00Z'
  },
  {
    id: 'uuid-22',
    name: 'Gaming Keyboard',
    category: 'Electronics',
    price: 89.99,
    description: 'RGB mechanical gaming keyboard with hot-swappable switches. Precision gaming experience.',
    image: img('RGB gaming keyboard product photography colorful lights'),
    stock: 30,
    createdAt: '2024-02-07T10:00:00Z'
  },
  {
    id: 'uuid-23',
    name: 'Hooded Sweatshirt',
    category: 'Clothing',
    price: 69.99,
    description: 'Soft fleece hooded sweatshirt with drawstring. Stay cozy and stylish.',
    image: img('hooded sweatshirt fashion photography casual wear'),
    stock: 55,
    createdAt: '2024-02-08T10:00:00Z'
  },
  {
    id: 'uuid-24',
    name: 'Machine Learning Yearning',
    category: 'Books',
    price: 29.99,
    description: 'Andrew Ng\'s guide to machine learning strategy and best practices.',
    image: img('machine learning AI book cover neural network illustration'),
    stock: 85,
    createdAt: '2024-02-09T10:00:00Z'
  },
  {
    id: 'uuid-25',
    name: 'Webcam Pro',
    category: 'Electronics',
    price: 69.99,
    description: '1080p HD webcam with built-in microphone. Perfect for video calls and streaming.',
    image: img('HD webcam product photography computer accessory'),
    stock: 40,
    createdAt: '2024-02-10T10:00:00Z'
  },
  {
    id: 'uuid-26',
    name: 'Canvas Sneakers',
    category: 'Clothing',
    price: 49.99,
    description: 'Classic canvas sneakers with rubber sole. Versatile and comfortable.',
    image: img('canvas sneakers fashion photography casual footwear'),
    stock: 65,
    createdAt: '2024-02-11T10:00:00Z'
  },
  {
    id: 'uuid-27',
    name: 'Deep Learning',
    category: 'Books',
    price: 89.99,
    description: 'The definitive textbook on deep learning from Goodfellow, Bengio, and Courville.',
    image: img('deep learning AI book cover technical publication'),
    stock: 50,
    createdAt: '2024-02-12T10:00:00Z'
  },
  {
    id: 'uuid-28',
    name: 'Noise-Cancelling Earbuds',
    category: 'Electronics',
    price: 149.99,
    description: 'True wireless earbuds with active noise cancellation. Premium sound quality.',
    image: img('wireless earbuds product photography premium audio'),
    stock: 35,
    createdAt: '2024-02-13T10:00:00Z'
  },
  {
    id: 'uuid-29',
    name: 'Oxford Shirt',
    category: 'Clothing',
    price: 59.99,
    description: 'Classic cotton oxford shirt in versatile colors. Perfect for business casual.',
    image: img('oxford shirt fashion photography formal casual'),
    stock: 45,
    createdAt: '2024-02-14T10:00:00Z'
  },
  {
    id: 'uuid-30',
    name: 'The Phoenix Project',
    category: 'Books',
    price: 34.99,
    description: 'A novel about IT, DevOps, and helping your business win.',
    image: img('DevOps business book cover technology management'),
    stock: 70,
    createdAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 'uuid-31',
    name: 'HDMI Cable',
    category: 'Electronics',
    price: 19.99,
    description: 'High-speed HDMI 2.1 cable with 4K HDR support. 6 feet length.',
    image: img('HDMI cable product photography tech accessory'),
    stock: 100,
    createdAt: '2024-02-16T10:00:00Z'
  },
  {
    id: 'uuid-32',
    name: 'Winter Coat',
    category: 'Clothing',
    price: 199.99,
    description: 'Premium down winter coat with waterproof shell. Stay warm in style.',
    image: img('winter coat fashion photography cold weather clothing'),
    stock: 25,
    createdAt: '2024-02-17T10:00:00Z'
  },
  {
    id: 'uuid-33',
    name: 'Code Complete',
    category: 'Books',
    price: 59.99,
    description: 'The definitive guide to software construction and best practices.',
    image: img('code complete programming book cover comprehensive guide'),
    stock: 65,
    createdAt: '2024-02-18T10:00:00Z'
  },
  {
    id: 'uuid-34',
    name: 'Tablet Stand',
    category: 'Electronics',
    price: 24.99,
    description: 'Adjustable tablet stand with aluminum construction. Perfect for work and entertainment.',
    image: img('tablet stand holder product photography ergonomic design'),
    stock: 80,
    createdAt: '2024-02-19T10:00:00Z'
  },
  {
    id: 'uuid-35',
    name: 'Silk Scarf',
    category: 'Clothing',
    price: 44.99,
    description: 'Luxurious silk scarf with elegant pattern. Add a touch of sophistication.',
    image: img('silk scarf fashion photography elegant accessory'),
    stock: 35,
    createdAt: '2024-02-20T10:00:00Z'
  },
  {
    id: 'uuid-36',
    name: 'Agile Software Development',
    category: 'Books',
    price: 44.99,
    description: 'The definitive guide to agile practices and methodologies.',
    image: img('agile software development book cover scrum methodology'),
    stock: 55,
    createdAt: '2024-02-21T10:00:00Z'
  }
];
