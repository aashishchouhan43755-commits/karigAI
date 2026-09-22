import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { db } from './server/data/db.ts';
import { generateAutoCatalog } from './server/ai/catalogGenerator.ts';
import { calculateFairPricing } from './server/ai/pricingEngine.ts';
import { enhanceArtisanImage } from './server/ai/imageEnhancer.ts';
import { isGeminiConfigured } from './server/ai/geminiClient.ts';
import { CraftProduct, B2BEnquiry } from './src/types.ts';

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limit for artisan mobile camera uploads & high-res craft images
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// --- API ROUTES FIRST ---

// Health & Environment status
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'karigAi - Artisan Heritage Craft Platform',
    creator: 'Aashish Chouhan',
    email: 'aashishchouhan43755@gmail.com',
    geminiEnabled: isGeminiConfigured(),
    timestamp: new Date().toISOString()
  });
});

// Artisan Profile
app.get(['/api/artisan/profile', '/api/artisans/:id'], (_req: Request, res: Response) => {
  const profile = db.getArtisanProfile();
  res.json(profile);
});

app.put('/api/artisan/profile', (req: Request, res: Response) => {
  const updated = db.updateArtisanProfile(req.body);
  res.json(updated);
});

// Products & Inventory
app.get('/api/products', (req: Request, res: Response) => {
  let products = db.getAllProducts();
  const { category, giOnly, search } = req.query;

  if (category && typeof category === 'string' && category !== 'All') {
    products = products.filter(p => p.category === category);
  }

  if (giOnly === 'true') {
    products = products.filter(p => p.giTag.isCertified);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.titleEn.toLowerCase().includes(q) ||
      p.titleHi.toLowerCase().includes(q) ||
      p.craftLineage.toLowerCase().includes(q) ||
      p.artisanName.toLowerCase().includes(q) ||
      p.culturalMotifs.some(m => m.toLowerCase().includes(q))
    );
  }

  res.json(products);
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = db.getProductById(req.params.id);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json(product);
});

app.post('/api/products', (req: Request, res: Response) => {
  const newProduct: CraftProduct = {
    ...req.body,
    id: req.body.id || `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
    viewCount: 1,
    enquiryCount: 0
  };
  const created = db.createProduct(newProduct);
  res.status(201).json(created);
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  const updated = db.updateProduct(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json(updated);
});

app.patch('/api/products/:id/stock', (req: Request, res: Response) => {
  const { stockQuantity } = req.body;
  const updated = db.updateProduct(req.params.id, { stockQuantity });
  if (!updated) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const success = db.deleteProduct(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json({ success: true });
});

// AI Auto-Cataloging Endpoint
app.post('/api/ai/catalog', async (req: Request, res: Response) => {
  try {
    const catalogResult = await generateAutoCatalog(req.body);
    res.json(catalogResult);
  } catch (error: any) {
    console.error('Error in /api/ai/catalog:', error);
    res.status(500).json({ error: 'Failed to generate catalog', details: error.message });
  }
});

// AI Dynamic Fair Pricing Engine Endpoint
app.post('/api/ai/pricing-engine', (req: Request, res: Response) => {
  try {
    const pricing = calculateFairPricing(req.body);
    res.json(pricing);
  } catch (error: any) {
    console.error('Error in /api/ai/pricing-engine:', error);
    res.status(500).json({ error: 'Failed to compute pricing', details: error.message });
  }
});

// AI Image Enhancement Studio Endpoint
app.post('/api/ai/enhance-image', (req: Request, res: Response) => {
  try {
    const { image, options } = req.body;
    const result = enhanceArtisanImage(image, options || {
      style: 'royal_studio',
      applyWatermark: true,
      enhanceTexture: true,
      giSeal: true
    });
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/ai/enhance-image:', error);
    res.status(500).json({ error: 'Image enhancement failed', details: error.message });
  }
});

// Voice Transcription / Speech Parser Endpoint (Mock + Gemini Audio integration point)
app.post('/api/ai/transcribe-voice', (req: Request, res: Response) => {
  const { voiceText, language } = req.body;
  // Parses voice queries into structured craft inputs
  const recognizedText = voiceText || 'यह मधुबनी पेंटिंग है, मैंने इसे बांस की सींक और प्राकृतिक रंगों से 14 घंटे में बनाया है। सामग्री की लागत लगभग ₹400 है।';

  res.json({
    transcription: recognizedText,
    languageDetected: language || 'hi',
    extractedEntities: {
      craftCategory: recognizedText.includes('मधुबनी') || recognizedText.includes('पेंटिंग') ? 'Madhubani & Folk Painting' :
                     recognizedText.includes('मिट्टी') || recognizedText.includes('बर्तन') || recognizedText.includes('पॉटरी') ? 'Blue Pottery & Ceramics' :
                     recognizedText.includes('लकड़ी') || recognizedText.includes('खिलौना') ? 'Woodcarving & Lacquerware' : 'Heritage Craft',
      suggestedHours: 14,
      suggestedMaterialCost: 400
    }
  });
});

// B2B & Buyer Enquiries
app.get('/api/enquiries', (_req: Request, res: Response) => {
  res.json(db.getAllEnquiries());
});

app.post('/api/enquiries', (req: Request, res: Response) => {
  const newEnquiry: B2BEnquiry = {
    ...req.body,
    id: `enq-${Date.now()}`,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  const created = db.createEnquiry(newEnquiry);
  res.status(201).json(created);
});

app.all(['/api/enquiries/:id/status', '/api/enquiries/:id'], (req: Request, res: Response) => {
  if (req.method === 'PATCH' || req.method === 'PUT') {
    const { status, artisanNotes, notes } = req.body;
    const updated = db.updateEnquiryStatus(req.params.id, status, artisanNotes || notes);
    if (!updated) {
      res.status(404).json({ error: 'Enquiry not found' });
      return;
    }
    res.json(updated);
    return;
  }
  res.status(405).json({ error: 'Method not allowed' });
});

// Admin & Cooperative Impact Metrics
app.get('/api/admin/metrics', (_req: Request, res: Response) => {
  res.json(db.getMetrics());
});

// Reset Demo Data
app.post(['/api/seed/reset', '/api/reset-demo'], (_req: Request, res: Response) => {
  db.resetDemoData();
  res.json({ message: 'Demo data successfully reset to pristine state', products: db.getAllProducts().length });
});

// --- VITE MIDDLEWARE SETUP ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KarigAI server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start KarigAI server:', err);
});
