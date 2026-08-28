export interface RealwaveProduct {
  partNumber: string;
  category: 'RealEdge' | 'RealIntelligence' | 'RealIQ' | 'Subscription';
  subCategory: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  msrp: number;
  eplusPrice: number;
  unit: string;
  notes: string;
  type: 'hardware' | 'analytics' | 'subscription';
}
