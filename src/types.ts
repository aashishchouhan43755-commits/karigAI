export type SupportedLanguage = 'en' | 'hi' | 'bn' | 'ta' | 'te' | 'mr' | 'gu';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  speechCode: string;
}

export interface GITagInfo {
  isCertified: boolean;
  tagCode?: string;
  region: string;
  state: string;
  yearRecognized?: number;
}

export interface PricingBreakdown {
  materialCost: number;
  laborHours: number;
  fairWagePerHour: number;
  artisanLaborEarning: number;
  heritagePremiumPercentage: number;
  packagingAndLogistics: number;
  platformFairTradeFee: number;
  minimumFairPrice: number;
  recommendedRetailPrice: number;
  b2bWholesaleTier1: number; // 10-49 units
  b2bWholesaleTier2: number; // 50+ units
  fairWageIndexScore: number; // 0-100%
  marketBenchmarkPrice?: number;
  middlemanTypicalDeduction?: number;
}

export interface CraftProduct {
  id: string;
  titleEn: string;
  titleHi: string;
  titleRegional?: string;
  category: string;
  craftLineage: string;
  artisanId: string;
  artisanName: string;
  artisanVillage: string;
  artisanState: string;
  giTag: GITagInfo;
  imageOriginal: string;
  imageEnhanced?: string;
  enhancementStyle?: 'royal_studio' | 'sandstone_heritage' | 'velvet_exhibition' | 'artisan_workshop' | 'raw';
  storyEn: string;
  storyHi: string;
  culturalMotifs: string[];
  materialsUsed: string[];
  dimensions: string;
  creationTimeHours: number;
  pricing: PricingBreakdown;
  stockQuantity: number;
  status: 'published' | 'draft' | 'in_review';
  createdAt: string;
  viewCount: number;
  enquiryCount: number;
}

export interface ArtisanProfile {
  id: string;
  fullName: string;
  craftSpecialty: string;
  state: string;
  district: string;
  village: string;
  experienceYears: number;
  generationInCraft: number;
  cooperativeName: string;
  upiId: string;
  phone: string;
  avatarUrl: string;
  nationalAwardee: boolean;
  giAuthorizedUserNumber?: string;
  bioEn: string;
  bioHi: string;
  audioBioUrl?: string;
  totalProductsListed: number;
  totalFairEarningsINR: number;
}

export interface B2BEnquiry {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  buyerName: string;
  buyerCompany: string;
  buyerType: 'B2B Retailer' | 'Export House' | 'Interior Designer' | 'Corporate Gifting' | 'Collector';
  buyerPhone: string;
  buyerEmail: string;
  quantityUnits: number;
  proposedPricePerUnit: number;
  targetTimeline: string;
  message: string;
  status: 'pending' | 'accepted' | 'negotiating' | 'completed';
  createdAt: string;
  artisanNotes?: string;
}

export interface AdminImpactMetrics {
  totalRegisteredArtisans: number;
  totalCraftsCataloged: number;
  totalMarketplaceVolumeINR: number;
  fairWageAdherenceRate: number; // percentage
  directMiddlemanBypassSavingsINR: number;
  giCertifiedCraftClusters: number;
  femaleArtisanParticipationRate: number;
  statesCovered: number;
}

export interface AutoCatalogRequest {
  imageBase64?: string;
  craftCategory?: string;
  artisanVoiceNotes?: string;
  inputLanguage?: SupportedLanguage;
  materialInput?: string;
  hoursSpent?: number;
  estimatedRawMaterialCost?: number;
}

export interface ImageEnhancementOptions {
  style: 'royal_studio' | 'sandstone_heritage' | 'velvet_exhibition' | 'artisan_workshop';
  applyWatermark: boolean;
  enhanceTexture: boolean;
  giSeal: boolean;
}
