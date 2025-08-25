import { Service } from '../types';

export const services: Service[] = [
  // Hindu Services
  {
    id: 'hindu-pandit',
    name: 'Hindu Pandit Service',
    description: 'Experienced Pandit for Hindu last rites ceremonies',
    price: 2500,
    duration: '3-4 hours',
    religions: ['hindu']
  },
  {
    id: 'cremation',
    name: 'Cremation Arrangement',
    description: 'Complete cremation facility arrangement',
    price: 5000,
    duration: '4-6 hours',
    religions: ['hindu', 'sikh', 'buddhist', 'jain']
  },
  {
    id: 'hindu-pyre-wood',
    name: 'Sacred Pyre Wood',
    description: 'Traditional wood arrangement for Hindu cremation',
    price: 3000,
    duration: '2 hours setup',
    religions: ['hindu']
  },
  {
    id: 'ganga-aarti',
    name: 'Ganga Aarti Service',
    description: 'Traditional river-side aarti ceremony',
    price: 1500,
    duration: '1 hour',
    religions: ['hindu']
  },

  // Muslim Services
  {
    id: 'imam-service',
    name: 'Islamic Molana Service',
    description: 'Qualified Molana for Islamic funeral prayers',
    price: 2000,
    duration: '2-3 hours',
    religions: ['muslim']
  },
  {
    id: 'burial-arrangement',
    name: 'Burial Arrangement',
    description: 'Complete burial arrangement and coordination',
    price: 4000,
    duration: '3-4 hours',
    religions: ['muslim', 'christian']
  },
  {
    id: 'grave-digging',
    name: 'Grave Digging',
    description: 'Professional grave digging service with proper dimensions',
    price: 3000,
    duration: '2-3 hours',
    religions: ['muslim', 'christian']
  },
  {
    id: 'ghusl-service',
    name: 'Ghusl (Ritual Washing)',
    description: 'Traditional Islamic body preparation service',
    price: 1500,
    duration: '1-2 hours',
    religions: ['muslim']
  },
  {
    id: 'janaza-prayer',
    name: 'Janaza Prayer Arrangement',
    description: 'Organize community prayer service',
    price: 1000,
    duration: '1 hour',
    religions: ['muslim']
  },

  // Christian Services
  {
    id: 'christian-priest',
    name: 'Christian Priest Service',
    description: 'Licensed priest for Christian funeral service',
    price: 3000,
    duration: '2-4 hours',
    religions: ['christian']
  },
  {
    id: 'church-service',
    name: 'Church Service Arrangement',
    description: 'Coordinate funeral service at church',
    price: 2500,
    duration: '2-3 hours',
    religions: ['christian']
  },
  {
    id: 'christian-choir',
    name: 'Choir Service',
    description: 'Professional choir for funeral hymns',
    price: 2000,
    duration: '2 hours',
    religions: ['christian']
  },

  // Sikh Services
  {
    id: 'sikh-granthi',
    name: 'Sikh Granthi Service',
    description: 'Granthi for Sikh funeral ceremonies',
    price: 2500,
    duration: '3-4 hours',
    religions: ['sikh']
  },
  {
    id: 'gurdwara-service',
    name: 'Gurdwara Service Arrangement',
    description: 'Coordinate service at local Gurdwara',
    price: 2000,
    duration: '2-3 hours',
    religions: ['sikh']
  },
  {
    id: 'kirtan-service',
    name: 'Kirtan (Devotional Music)',
    description: 'Traditional Sikh devotional music service',
    price: 1800,
    duration: '2 hours',
    religions: ['sikh']
  },

  // Buddhist Services
  {
    id: 'buddhist-monk',
    name: 'Buddhist Monk Service',
    description: 'Buddhist monk for funeral ceremonies',
    price: 2200,
    duration: '2-3 hours',
    religions: ['buddhist']
  },
  {
    id: 'meditation-service',
    name: 'Meditation Ceremony',
    description: 'Guided meditation service for the departed',
    price: 1500,
    duration: '1-2 hours',
    religions: ['buddhist']
  },
  {
    id: 'buddhist-chanting',
    name: 'Buddhist Chanting Service',
    description: 'Traditional Buddhist chanting ceremony',
    price: 1200,
    duration: '1 hour',
    religions: ['buddhist']
  },

  // Jain Services
  {
    id: 'jain-acharya',
    name: 'Jain Acharya Service',
    description: 'Jain religious leader for funeral rites',
    price: 2800,
    duration: '3-4 hours',
    religions: ['jain']
  },
  {
    id: 'jain-temple-service',
    name: 'Jain Temple Service',
    description: 'Coordinate service at Jain temple',
    price: 2000,
    duration: '2 hours',
    religions: ['jain']
  },
  {
    id: 'charity-arrangement',
    name: 'Dana (Charity) Arrangement',
    description: 'Organize charitable giving in memory',
    price: 1000,
    duration: '1 hour coordination',
    religions: ['jain', 'hindu', 'buddhist']
  },

  // Universal Services (available for all religions)
  {
    id: 'transport',
    name: 'Body Transportation',
    description: 'Respectful transportation service with hearse',
    price: 1500,
    duration: 'As needed',
    religions: ['hindu', 'muslim', 'christian', 'sikh', 'buddhist', 'jain']
  },
  {
    id: 'flower-decoration',
    name: 'Flower Decoration',
    description: 'Beautiful floral arrangements for the ceremony',
    price: 1200,
    duration: '1 hour setup',
    religions: ['hindu', 'muslim', 'christian', 'sikh', 'buddhist', 'jain']
  },
  {
    id: 'photography',
    name: 'Memorial Photography',
    description: 'Professional photography service for remembrance',
    price: 2000,
    duration: '2-3 hours',
    religions: ['hindu', 'muslim', 'christian', 'sikh', 'buddhist', 'jain']
  },
  {
    id: 'catering',
    name: 'Memorial Catering',
    description: 'Traditional food service for guests',
    price: 150,
    duration: 'Per person',
    religions: ['hindu', 'muslim', 'christian', 'sikh', 'buddhist', 'jain']
  },
  {
    id: 'tent-setup',
    name: 'Tent & Seating Setup',
    description: 'Temporary shelter and seating arrangement',
    price: 2500,
    duration: '2 hours setup',
    religions: ['hindu', 'muslim', 'christian', 'sikh', 'buddhist', 'jain']
  }
];