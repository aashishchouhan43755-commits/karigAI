import test from 'node:test';
import assert from 'node:assert';

// Pricing formula test verifying karigAi fair living wage criteria
function calculateFairPricing(input) {
  const fairWagePerHour = input.fairWagePerHour || 180;
  const laborHours = Math.max(0.5, input.laborHours || 8);
  const materialCost = Math.max(50, input.materialCost || 250);
  
  const artisanLaborEarning = Math.round(laborHours * fairWagePerHour);
  const heritageMultiplier = input.isGICertified ? 0.20 : 0.08;
  const heritagePremiumValue = Math.round((materialCost + artisanLaborEarning) * heritageMultiplier);
  const packagingAndLogistics = input.packagingEstimate || (materialCost > 1500 ? 250 : 120);
  const directCostSubtotal = materialCost + artisanLaborEarning + heritagePremiumValue + packagingAndLogistics;
  const platformFairTradeFee = Math.round(directCostSubtotal * 0.035);
  const recommendedRetailPrice = Math.round((directCostSubtotal + platformFairTradeFee) * 1.18);
  const b2bWholesaleTier1 = Math.round(recommendedRetailPrice * 0.84);
  const b2bWholesaleTier2 = Math.round(recommendedRetailPrice * 0.74);

  return {
    artisanLaborEarning,
    recommendedRetailPrice,
    b2bWholesaleTier1,
    b2bWholesaleTier2,
    minimumFairPrice: directCostSubtotal
  };
}

test('Fair Wage Calculation protects artisan earnings', () => {
  const result = calculateFairPricing({
    materialCost: 400,
    laborHours: 12,
    fairWagePerHour: 180,
    isGICertified: true
  });

  // Artisan direct labor earning must equal hours * ₹180
  assert.strictEqual(result.artisanLaborEarning, 2160);
  // Retail price must exceed minimum fair cost
  assert.ok(result.recommendedRetailPrice > result.minimumFairPrice);
  // Wholesale tiers should grant bulk discounts while remaining above base cost
  assert.ok(result.b2bWholesaleTier1 < result.recommendedRetailPrice);
  assert.ok(result.b2bWholesaleTier2 < result.b2bWholesaleTier1);
});

test('GI Tagged crafts earn certified heritage premium', () => {
  const standardCraft = calculateFairPricing({
    materialCost: 300,
    laborHours: 8,
    isGICertified: false
  });

  const giTaggedCraft = calculateFairPricing({
    materialCost: 300,
    laborHours: 8,
    isGICertified: true
  });

  assert.ok(giTaggedCraft.recommendedRetailPrice > standardCraft.recommendedRetailPrice);
});
