import { PricingBreakdown } from '../../src/types.ts';

export interface PricingInput {
  materialCost: number;
  laborHours: number;
  craftCategory?: string;
  isGICertified?: boolean;
  fairWagePerHour?: number;
  packagingEstimate?: number;
  complexityLevel?: 'simple' | 'medium' | 'masterpiece';
}

/**
 * Fair Living Wage & Dynamic Heritage Pricing Engine
 * Implements karigAi Fair Trade pricing metrics for Indian artisans
 */
export function calculateFairPricing(input: PricingInput): PricingBreakdown {
  const fairWagePerHour = input.fairWagePerHour || 180; // Standard living wage benchmark for rural skilled artisans (₹180/hr)
  const laborHours = Math.max(0.5, input.laborHours || 8);
  const materialCost = Math.max(50, input.materialCost || 250);
  
  // Direct artisan labor compensation
  const artisanLaborEarning = Math.round(laborHours * fairWagePerHour);

  // Complexity multiplier
  const complexityMultiplier = 
    input.complexityLevel === 'masterpiece' ? 1.35 :
    input.complexityLevel === 'medium' ? 1.15 : 1.0;

  // GI Tag & Heritage Scarcity Premium (12% to 22%)
  const heritageMultiplier = input.isGICertified ? 0.20 : 0.08;
  const heritagePremiumValue = Math.round((materialCost + artisanLaborEarning) * heritageMultiplier * complexityMultiplier);

  // Packaging, protective transport & GI authenticity seal tag
  const packagingAndLogistics = input.packagingEstimate || (materialCost > 1500 ? 250 : 120);

  // Platform sustainability minimal fee (3.5% vs commercial aggregators 25-40%)
  const directCostSubtotal = materialCost + artisanLaborEarning + heritagePremiumValue + packagingAndLogistics;
  const platformFairTradeFee = Math.round(directCostSubtotal * 0.035);

  // Absolute minimum fair price below which artisan is being underpaid
  const minimumFairPrice = directCostSubtotal;

  // Recommended B2C Retail Price (Artisan retains full margin)
  const recommendedRetailPrice = Math.round((directCostSubtotal + platformFairTradeFee) * 1.18);

  // Tier 1 B2B Wholesale (10 - 49 units): 16% volume discount for bulk buyers
  const b2bWholesaleTier1 = Math.round(recommendedRetailPrice * 0.84);

  // Tier 2 B2B Wholesale (50+ units): 26% bulk commercial export discount
  const b2bWholesaleTier2 = Math.round(recommendedRetailPrice * 0.74);

  // Fair wage index score (100% when artisan receives full benchmark rate)
  const fairWageIndexScore = Math.min(100, Math.round(((artisanLaborEarning / (laborHours * fairWagePerHour)) * 0.5 + 0.5) * 100));

  // Commercial middleman typical deduction in unorganized markets (where artisan only gets 25-30% of end price)
  const typicalCommercialStorePrice = Math.round(recommendedRetailPrice * 1.6);
  const middlemanTypicalDeduction = typicalCommercialStorePrice - recommendedRetailPrice;

  return {
    materialCost,
    laborHours,
    fairWagePerHour,
    artisanLaborEarning,
    heritagePremiumPercentage: Math.round(heritageMultiplier * 100),
    packagingAndLogistics,
    platformFairTradeFee,
    minimumFairPrice,
    recommendedRetailPrice,
    b2bWholesaleTier1,
    b2bWholesaleTier2,
    fairWageIndexScore,
    marketBenchmarkPrice: typicalCommercialStorePrice,
    middlemanTypicalDeduction
  };
}
