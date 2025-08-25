export interface Religion {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface KitItem {
  id: string;
  name: string;
  description: string;
  price: number;
  required: boolean;
  category: 'essential' | 'regional' | 'caste';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: string;
  religions: string[];
}

export interface ReligionKit {
  religionId: string;
  items: KitItem[];
}

export interface BookingData {
  religion: Religion | null;
  selectedKitItems: KitItem[];
  selectedServices: Service[];
  personalInfo: {
    name: string;
    address: string;
    phone: string;
  };
}