import { ReligionKit, KitItem } from '../types';

const hinduItems: KitItem[] = [
  // Essential items
  { id: 'h1', name: 'White Cotton Cloth', description: 'Pure white cotton shroud', price: 500, required: true, category: 'essential' },
  { id: 'h2', name: 'Sacred Thread (Janeu)', description: 'Traditional sacred thread', price: 50, required: true, category: 'essential' },
  { id: 'h3', name: 'Tulsi Leaves', description: 'Holy basil leaves for purification', price: 30, required: true, category: 'essential' },
  { id: 'h4', name: 'Ghee', description: 'Pure clarified butter for rituals', price: 200, required: true, category: 'essential' },
  { id: 'h5', name: 'Sandalwood Paste', description: 'Pure sandalwood for tilaka', price: 300, required: true, category: 'essential' },
  // Regional/Caste specific
  { id: 'h6', name: 'Ganga Jal', description: 'Holy water from River Ganges', price: 100, required: false, category: 'regional' },
  { id: 'h7', name: 'Rudraksha Mala', description: 'Sacred beads for Brahmins', price: 1500, required: false, category: 'caste' },
  { id: 'h8', name: 'Peacock Feather', description: 'For Kshatriya rituals', price: 150, required: false, category: 'caste' }
];

const muslimItems: KitItem[] = [
  // Essential items
  { id: 'm1', name: 'Kafan (Shroud)', description: 'White cotton burial shroud', price: 800, required: true, category: 'essential' },
  { id: 'm2', name: 'Camphor', description: 'For purification rituals', price: 50, required: true, category: 'essential' },
  { id: 'm3', name: 'Rose Water', description: 'For cleansing and fragrance', price: 100, required: true, category: 'essential' },
  { id: 'm4', name: 'Cotton Wool', description: 'For body preparation', price: 80, required: true, category: 'essential' },
  { id: 'm5', name: 'Soap (Unscented)', description: 'Pure soap for ghusl', price: 40, required: true, category: 'essential' },
  // Regional additions
  { id: 'm6', name: 'Dates', description: 'For charity distribution', price: 200, required: false, category: 'regional' },
  { id: 'm7', name: 'Prayer Mat', description: 'For final prayers', price: 500, required: false, category: 'regional' },
  { id: 'm8', name: 'Quran (Small)', description: 'For recitation', price: 300, required: false, category: 'regional' }
];

const christianItems: KitItem[] = [
  // Essential items
  { id: 'c1', name: 'White Burial Clothes', description: 'Formal white attire', price: 1200, required: true, category: 'essential' },
  { id: 'c2', name: 'Cross Pendant', description: 'Christian cross for burial', price: 300, required: true, category: 'essential' },
  { id: 'c3', name: 'Bible', description: 'Holy Bible for final rites', price: 500, required: true, category: 'essential' },
  { id: 'c4', name: 'Holy Water', description: 'Blessed water for rituals', price: 50, required: true, category: 'essential' },
  { id: 'c5', name: 'Candles', description: 'For vigil and prayers', price: 100, required: true, category: 'essential' },
  // Denominational
  { id: 'c6', name: 'Rosary', description: 'For Catholic rituals', price: 400, required: false, category: 'regional' },
  { id: 'c7', name: 'Flowers (White)', description: 'For decoration', price: 300, required: false, category: 'regional' },
  { id: 'c8', name: 'Incense', description: 'For prayer ceremonies', price: 80, required: false, category: 'regional' }
];

const sikhItems: KitItem[] = [
  // Essential items
  { id: 's1', name: 'White Cloth', description: 'Pure white cotton for wrapping', price: 600, required: true, category: 'essential' },
  { id: 's2', name: 'Kirpan', description: 'Ceremonial sword', price: 800, required: true, category: 'essential' },
  { id: 's3', name: 'Kara', description: 'Steel bracelet', price: 200, required: true, category: 'essential' },
  { id: 's4', name: 'Turban Cloth', description: 'For head covering', price: 300, required: true, category: 'essential' },
  { id: 's5', name: 'Guru Granth Sahib (Small)', description: 'Holy book for recitation', price: 1000, required: true, category: 'essential' },
  // Additional
  { id: 's6', name: 'Khanda Symbol', description: 'Sikh religious symbol', price: 150, required: false, category: 'regional' },
  { id: 's7', name: 'Ghee for Lamp', description: 'For lighting diya', price: 100, required: false, category: 'regional' }
];

const buddhistItems: KitItem[] = [
  // Essential items
  { id: 'b1', name: 'Saffron Cloth', description: 'Traditional saffron shroud', price: 700, required: true, category: 'essential' },
  { id: 'b2', name: 'Lotus Flowers', description: 'Symbol of purity', price: 200, required: true, category: 'essential' },
  { id: 'b3', name: 'Incense Sticks', description: 'For meditation and prayer', price: 100, required: true, category: 'essential' },
  { id: 'b4', name: 'Prayer Beads', description: '108-bead mala for chanting', price: 500, required: true, category: 'essential' },
  { id: 'b5', name: 'Buddha Statue (Small)', description: 'For final blessing', price: 800, required: true, category: 'essential' },
  // Regional
  { id: 'b6', name: 'Tibetan Flags', description: 'Prayer flags for Tibetan Buddhism', price: 300, required: false, category: 'regional' },
  { id: 'b7', name: 'Singing Bowl', description: 'For sound meditation', price: 1200, required: false, category: 'regional' }
];

const jainItems: KitItem[] = [
  // Essential items
  { id: 'j1', name: 'White Cotton Cloth', description: 'Pure white shroud', price: 500, required: true, category: 'essential' },
  { id: 'j2', name: 'Sacred Water', description: 'Purified water for rituals', price: 50, required: true, category: 'essential' },
  { id: 'j3', name: 'Flowers (White)', description: 'For offering', price: 150, required: true, category: 'essential' },
  { id: 'j4', name: 'Jain Symbols', description: 'Religious symbols for blessing', price: 200, required: true, category: 'essential' },
  { id: 'j5', name: 'Grain for Charity', description: 'For dana (charity)', price: 300, required: true, category: 'essential' },
  // Sect specific
  { id: 'j6', name: 'Marble Dust', description: 'For Svetambara sect', price: 100, required: false, category: 'caste' },
  { id: 'j7', name: 'Sacred Books', description: 'Jain scriptures', price: 600, required: false, category: 'regional' }
];

export const religionKits: ReligionKit[] = [
  { religionId: 'hindu', items: hinduItems },
  { religionId: 'muslim', items: muslimItems },
  { religionId: 'christian', items: christianItems },
  { religionId: 'sikh', items: sikhItems },
  { religionId: 'buddhist', items: buddhistItems },
  { religionId: 'jain', items: jainItems }
];