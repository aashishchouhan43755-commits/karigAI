import { CraftProduct, ArtisanProfile, B2BEnquiry, AdminImpactMetrics } from '../../src/types.ts';
import { DEFAULT_ARTISAN, INITIAL_PRODUCTS, INITIAL_ENQUIRIES, INITIAL_METRICS } from './seedData.ts';

class KarigAIDatabase {
  private artisan: ArtisanProfile = { ...DEFAULT_ARTISAN };
  private products: CraftProduct[] = [...INITIAL_PRODUCTS];
  private enquiries: B2BEnquiry[] = [...INITIAL_ENQUIRIES];
  private metrics: AdminImpactMetrics = { ...INITIAL_METRICS };

  // Artisan Profile
  getArtisanProfile(): ArtisanProfile {
    return { ...this.artisan };
  }

  updateArtisanProfile(updates: Partial<ArtisanProfile>): ArtisanProfile {
    this.artisan = { ...this.artisan, ...updates };
    return { ...this.artisan };
  }

  // Products
  getAllProducts(): CraftProduct[] {
    return [...this.products];
  }

  getProductById(id: string): CraftProduct | undefined {
    return this.products.find(p => p.id === id);
  }

  createProduct(product: CraftProduct): CraftProduct {
    this.products.unshift(product);
    this.artisan.totalProductsListed = this.products.length;
    this.metrics.totalCraftsCataloged += 1;
    return product;
  }

  updateProduct(id: string, updates: Partial<CraftProduct>): CraftProduct | undefined {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    this.products[index] = { ...this.products[index], ...updates };
    return this.products[index];
  }

  deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    this.artisan.totalProductsListed = this.products.length;
    return this.products.length < initialLen;
  }

  // Enquiries
  getAllEnquiries(): B2BEnquiry[] {
    return [...this.enquiries];
  }

  createEnquiry(enquiry: B2BEnquiry): B2BEnquiry {
    this.enquiries.unshift(enquiry);
    const prod = this.getProductById(enquiry.productId);
    if (prod) {
      prod.enquiryCount = (prod.enquiryCount || 0) + 1;
    }
    return enquiry;
  }

  updateEnquiryStatus(id: string, status: B2BEnquiry['status'], artisanNotes?: string): B2BEnquiry | undefined {
    const index = this.enquiries.findIndex(e => e.id === id);
    if (index === -1) return undefined;
    this.enquiries[index].status = status;
    if (artisanNotes !== undefined) {
      this.enquiries[index].artisanNotes = artisanNotes;
    }
    return this.enquiries[index];
  }

  // Metrics
  getMetrics(): AdminImpactMetrics {
    return { ...this.metrics };
  }

  // Reset to Seed Data
  resetDemoData(): void {
    this.artisan = { ...DEFAULT_ARTISAN };
    this.products = [...INITIAL_PRODUCTS];
    this.enquiries = [...INITIAL_ENQUIRIES];
    this.metrics = { ...INITIAL_METRICS };
  }
}

export const db = new KarigAIDatabase();
