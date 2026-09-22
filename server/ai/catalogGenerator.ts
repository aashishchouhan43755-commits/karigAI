import { getGeminiAI, isGeminiConfigured } from './geminiClient.ts';
import { AutoCatalogRequest, SupportedLanguage } from '../../src/types.ts';

export interface GeneratedCatalogOutput {
  titleEn: string;
  titleHi: string;
  titleRegional?: string;
  category: string;
  craftLineage: string;
  storyEn: string;
  storyHi: string;
  culturalMotifs: string[];
  materialsUsed: string[];
  dimensions: string;
  creationTimeHours: number;
  estimatedRawCost: number;
  giTagRecommendation: {
    isCertifiedCandidate: boolean;
    region: string;
    state: string;
  };
  suggestedCare: string;
  searchTags: string[];
}

const KNOWLEDGE_FALLBACKS: Record<string, GeneratedCatalogOutput> = {
  'madhubani': {
    titleEn: 'Hand-painted Madhubani Mithila Canvas - Kohbar Fish & Lotus of Life',
    titleHi: 'हस्तनिर्मित मधुबनी मिथिला चित्र - कोहबर मत्स्य एवं जीवन कमल',
    category: 'Madhubani & Folk Painting',
    craftLineage: 'Mithila Region, Ancient Vedic Tradition (GI Certified)',
    storyEn: 'Masterfully painted using fine bamboo twigs and nibs, this authentic Madhubani artwork portrays the auspicious Matsya (fish) swimming amidst blooming Kamalas (lotuses). Fish symbolize divine abundance, vitality, and harmony with nature, while the lotus represents sacred purity. Created on handmade sun-dried paper infused with cow-dung wash and organic pigments extracted from aparajita flowers, turmeric, and soot.',
    storyHi: 'बांस की बारीक सींकों और प्राकृतिक रंगों से निर्मित यह प्रामाणिक मधुबनी पेंटिंग समृद्धि एवं नवजीवन के प्रतीक मत्स्य (मछली) तथा पवित्र कमल पुष्प को दर्शाती है। अपराजिता के फूल, हल्दी और काजल के शुद्ध अर्क से यह कलाकृति तैयार की गई है।',
    culturalMotifs: ['Matsya (Auspicious Fish - Fertility & Good Fortune)', 'Padma (Sacred Lotus - Spiritual Purity)', 'Suryanarayan Borders (Divine Protection)'],
    materialsUsed: ['Handmade sun-bleached cotton paper', 'Natural soot black ink', 'Turmeric (Haldi) organic yellow pigment', 'Aparajita extract indigo blue'],
    dimensions: '30 cm x 45 cm (12" x 18")',
    creationTimeHours: 14,
    estimatedRawCost: 380,
    giTagRecommendation: {
      isCertifiedCandidate: true,
      region: 'Madhubani District',
      state: 'Bihar'
    },
    suggestedCare: 'Keep away from direct moisture. Frame under non-reflective UV glass to protect natural organic vegetable pigments.',
    searchTags: ['Madhubani painting', 'Mithila folk art', 'GI certified Bihar', 'Handmade natural pigments', 'Kohbar motif wall art']
  },
  'blue_pottery': {
    titleEn: 'Jaipur Turquoise Glazed Floral Urn - Quartz Stone Blue Pottery',
    titleHi: 'जयपुर फिरोजी पुष्प कलश - क्वार्ट्ज स्टोन ब्लू पॉटरी',
    category: 'Blue Pottery & Ceramics',
    craftLineage: 'Turko-Persian craft brought by Sawai Ram Singh II (GI Certified)',
    storyEn: 'Unlike conventional clay pottery, authentic Jaipur Blue Pottery is crafted without clay, instead using a blend of powdered quartz stone, raw glass, Multani mitti, and natural gum. Hand-painted with cobalt oxide for rich sapphire and copper oxide for vibrant turquoise hues, each piece undergoes slow low-temperature kiln firing.',
    storyHi: 'बिना मिट्टी के विशुद्ध पिसे हुए क्वार्ट्ज पत्थर, काँच और मुल्तानी मिट्टी के अनूठे सम्मिश्रण से तैयार यह जयपुरी ब्लू पॉटरी कलश पारंपरिक राजस्थानी राजदरबार शैली में कोबाल्ट और कॉपर ऑक्साइड से रंगा गया है।',
    culturalMotifs: ['Arabesque Floral Creepers (Lata-Valli)', 'Peacock Feather Arabesque (Mayur Pankh)'],
    materialsUsed: ['Powdered Quartz Stone', 'Natural Katira Gum', 'Cobalt Oxide (Royal Blue)', 'Copper Oxide (Turquoise)', 'Lead-free borax glaze'],
    dimensions: 'Height: 28 cm, Diameter: 16 cm (1.2 kg)',
    creationTimeHours: 18,
    estimatedRawCost: 490,
    giTagRecommendation: {
      isCertifiedCandidate: true,
      region: 'Jaipur Sanganer Cluster',
      state: 'Rajasthan'
    },
    suggestedCare: 'Clean with a soft damp cloth. Not suitable for microwave heating; ideal for decorative displays and dry floristry.',
    searchTags: ['Jaipur blue pottery', 'GI tag Rajasthan ceramics', 'Quartz pottery', 'Turquoise vase', 'Indian heritage home decor']
  },
  'dhokra': {
    titleEn: 'Ancient Bastar Dhokra Bell Metal Figurine - Tribal Musician with Flute',
    titleHi: 'बस्तर ढोकरा बेल मेटल मूर्ति - बांसुरी बजाता आदिवासी संगीतकार',
    category: 'Dhokra & Metalcraft',
    craftLineage: '4,000-Year-Old Lost Wax (Cire Perdue) Casting Tradition (GI Certified)',
    storyEn: 'Dating back directly to the Mohenjo-daro Dancing Girl era, this Bastar Dhokra sculpture is cast through the non-ferrous lost-wax metal technique. The artisan sculpts an intricate clay core, weaves pure beeswax threads around it to form fine filigree patterns, and pours molten bell metal. Because the original wax mould melts away completely during the pour, no two Dhokra statues are ever identical.',
    storyHi: 'सिंधु घाटी सभ्यता की 4000 वर्ष पुरानी लॉस्ट-वैक्स (मोम ढलाई) तकनीक से बस्तर के आदिवासी कारीगरों द्वारा निर्मित यह कांसा प्रतिमा अद्वितीय है। मोम का ढांचा पिघल जाने के कारण प्रत्येक प्रतिमा विश्व में एकमात्र होती है।',
    culturalMotifs: ['Tribal Bansuri Vadan (Forest Harmony)', 'Braided Wax Coils (Tribal Continuity)', 'Sacred Torana arches'],
    materialsUsed: ['Recycled Brass & Bell Metal (Kansa)', 'Natural Beehive Wax (Madhumaakhi Mom)', 'Riverbed Clay & Rice Husk Core'],
    dimensions: 'Height: 22 cm, Width: 11 cm (850 gm)',
    creationTimeHours: 24,
    estimatedRawCost: 650,
    giTagRecommendation: {
      isCertifiedCandidate: true,
      region: 'Bastar & Kondagaon',
      state: 'Chhattisgarh'
    },
    suggestedCare: 'Wipe with dry microfiber cloth. Polish occasionally with brasso or mustard oil to preserve the antique golden patina.',
    searchTags: ['Bastar Dhokra', 'Lost wax casting', 'Tribal brass art', 'GI certified Chhattisgarh', 'Indian antique figurine']
  },
  'channapatna': {
    titleEn: 'Channapatna Non-Toxic Lacquerware Balancing Acrobat & Tops Set',
    titleHi: 'चन्नापट्टना प्राकृतिक लाख खिलौना सेट - सुरक्षित लकड़ी का लट्टू एवं नट',
    category: 'Woodcarving & Lacquerware',
    craftLineage: 'Ivory Wood Lacquer Craft from Tipu Sultan Era (GI Certified Gombe)',
    storyEn: 'Hailing from Karnataka\'s historic "Toy Town" (Gombegala Ooru), this heirloom play set is turned by hand on a high-speed wood lathe from sustainably harvested Wrightia tinctoria (Aale Mara / Ivory Wood). The vibrant luster is applied directly using natural tree-resin shellac tinted with food-safe non-toxic natural colors like turmeric, kumkum, and indigo, polished to a glassy sheen with talc leaf.',
    storyHi: 'कर्नाटक के प्रसिद्ध खिलौना नगरी चन्नापट्टना की इस विरासत खिलौने को अले मारा (आइवरी वुड) की सुरक्षित लकड़ी पर हाथ की खराद से बनाया गया है। इसमें बच्चों के लिए 100% सुरक्षित हल्दी और कुमकुम से रंगे प्राकृतिक लाख का उपयोग किया गया है।',
    culturalMotifs: ['Traditional Lathe Grooves', 'Geometric Spinning Rings', 'Royal Mysore Court Palette'],
    materialsUsed: ['Sustainable Wrightia Tinctoria (Ivory Wood)', 'Natural Shellac (Lac)', 'Organic Turmeric & Kumkum Colorants'],
    dimensions: 'Height: 18 cm, Diameter: 7 cm',
    creationTimeHours: 6,
    estimatedRawCost: 210,
    giTagRecommendation: {
      isCertifiedCandidate: true,
      region: 'Channapatna Ramanagara',
      state: 'Karnataka'
    },
    suggestedCare: 'Eco-friendly and baby-safe. Wipe gently with dry cloth. Do not soak in water.',
    searchTags: ['Channapatna wooden toys', 'GI certified Karnataka', 'Non toxic eco toys', 'Handcrafted lathe wood', 'Heritage gifts']
  },
  'ajrakh': {
    titleEn: 'Kutch Masterclass Ajrakh Hand-Block Printed Modal Silk Dupatta',
    titleHi: 'कच्छ अजरख हस्त-ब्लॉक प्रिंट मोडल सिल्क दुपट्टा',
    category: 'Ajrakh & Block Print',
    craftLineage: '16-Stage Natural Resist Mud (Ghat) Dyeing of Dhamadka & Ajrakhpur (GI Certified)',
    storyEn: 'Derived from "Aaj Rakh" (Keep it today for another wash), Ajrakh is an astonishing 16-stage resist dyeing legacy using hand-carved teak wood blocks. The celestial indigo and alizarin red geometric stars evoke the starlit desert skies of Sindh and Kutch. Washed repeatedly in the mineral-rich waters of Dhamadka with wild tamarind, pomegranate peel, and iron rust liquor.',
    storyHi: 'कच्छ के रेगिस्तान में 16 चरणों की प्राकृतिक मिट्टी-प्रतिरोध छपाई से तैयार यह अजरख मोडल सिल्क दुपट्टा नील, अनार के छिलके और लोहे के अर्क से रंगा गया है। इसके ज्यामितीय सितारे ब्रह्मांड और प्रकृति के संतुलन के प्रतीक हैं।',
    culturalMotifs: ['Tare (Cosmic Stars of Kutch)', 'Kangan & Champakali Floral Borders', 'Jalebi (Sacred Spiral of Water)'],
    materialsUsed: ['Pure Handloom Modal Silk', 'Organic Indigofera tinctoria (True Indigo)', 'Madder Root (Alizarin Red)', 'Pomegranate Peel Extract', 'Acacia Gum Resist'],
    dimensions: '2.5 meters x 0.9 meters (280 gm)',
    creationTimeHours: 32,
    estimatedRawCost: 1150,
    giTagRecommendation: {
      isCertifiedCandidate: true,
      region: 'Kutch / Ajrakhpur',
      state: 'Gujarat'
    },
    suggestedCare: 'Gentle hand wash in cold water with mild eco-detergent or dry clean. Dry inside out in mild shade to preserve natural dye brilliance.',
    searchTags: ['Ajrakh print dupatta', 'GI tag Kutch Gujarat', 'Natural indigo dye', 'Hand block printed silk', 'Sustainable Indian ethnic wear']
  }
};

export async function generateAutoCatalog(req: AutoCatalogRequest): Promise<GeneratedCatalogOutput> {
  const ai = getGeminiAI();
  const inputNotes = (req.artisanVoiceNotes || '').trim();
  const category = (req.craftCategory || 'Indian Heritage Craft').trim();
  const rawCost = req.estimatedRawMaterialCost || 350;
  const hours = req.hoursSpent || 10;
  const lang = req.inputLanguage || 'hi';

  // If Gemini API is configured, use the latest gemini-3.8-flash model
  if (isGeminiConfigured() && ai) {
    try {
      const prompt = `You are karigAi's Master Cultural Heritage & Craft Cataloger.
A marginalized Indian traditional artisan has provided the following details or spoken notes in their language:
- Craft Category: ${category}
- Artisan Spoken Notes / Description: "${inputNotes || 'Handmade traditional heritage piece crafted using generational methods'}"
- Materials Mentioned: "${req.materialInput || 'Traditional natural materials'}"
- Approximate Crafting Hours: ${hours}
- Raw Material Cost (INR): ₹${rawCost}
- Language Preference: ${lang}

Generate a rich, authentic, high-value product catalog item strictly in valid JSON format.
Follow these cultural rules:
1. "titleEn": Sophisticated, export-quality title highlighting craft type, motif, and lineage.
2. "titleHi": Poetic Hindi title in Devanagari script.
3. "storyEn": An emotionally resonant, 90-130 word cultural narrative explaining the generational lineage, sacred or natural meaning of motifs, and the meticulous patience required.
4. "storyHi": Clear Hindi explanation suitable for the artisan to hear or read in their village.
5. "culturalMotifs": Array of 2-3 traditional motifs with cultural symbolism.
6. "materialsUsed": Array of 3-5 authentic traditional materials.
7. "dimensions": Estimated realistic dimensions for this craft type.
8. "giTagRecommendation": Object with isCertifiedCandidate (boolean), region (e.g., "Bastar", "Madhubani", "Jaipur"), state (Indian state).
9. "suggestedCare": Specific preservation instruction for buyers.
10. "searchTags": 5 SEO tags for global and domestic luxury craft buyers.

Return ONLY the raw JSON without markdown code fences.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        }
      });

      const responseText = response.text ? response.text.trim() : '';
      if (responseText) {
        const parsed = JSON.parse(responseText);
        return {
          titleEn: parsed.titleEn || `${category} - Heritage Masterpiece`,
          titleHi: parsed.titleHi || `पारंपरिक ${category} कलाकृति`,
          titleRegional: parsed.titleRegional,
          category: parsed.category || category,
          craftLineage: parsed.craftLineage || 'Generational Indian Traditional Craft',
          storyEn: parsed.storyEn || 'Handcrafted with generational skill passed down through centuries of Indian artistic mastery.',
          storyHi: parsed.storyHi || 'पीढ़ियों से चली आ रही पारंपरिक भारतीय हस्तकला तकनीक से निर्मित।',
          culturalMotifs: Array.isArray(parsed.culturalMotifs) ? parsed.culturalMotifs : ['Traditional Heritage Motif', 'Floral Arabesque'],
          materialsUsed: Array.isArray(parsed.materialsUsed) ? parsed.materialsUsed : ['Natural Pigments', 'Handmade Base'],
          dimensions: parsed.dimensions || 'Standard Artisan Handcrafted Dimensions',
          creationTimeHours: hours,
          estimatedRawCost: rawCost,
          giTagRecommendation: parsed.giTagRecommendation || {
            isCertifiedCandidate: true,
            region: 'Heritage Craft Belt',
            state: 'India'
          },
          suggestedCare: parsed.suggestedCare || 'Store in dry place. Clean gently with soft cloth.',
          searchTags: Array.isArray(parsed.searchTags) ? parsed.searchTags : ['Indian Handicrafts', 'GI Tag Craft', 'Handmade India']
        };
      }
    } catch (err) {
      console.warn('Gemini catalog generation error, using curated craft fallback:', err);
    }
  }

  // Domain fallback matching keyword
  const lower = (inputNotes + ' ' + category).toLowerCase();
  let selected = KNOWLEDGE_FALLBACKS['madhubani'];

  if (lower.includes('blue') || lower.includes('potter') || lower.includes('clay') || lower.includes('jaipur')) {
    selected = KNOWLEDGE_FALLBACKS['blue_pottery'];
  } else if (lower.includes('dhokra') || lower.includes('metal') || lower.includes('brass') || lower.includes('bastar') || lower.includes('bronze')) {
    selected = KNOWLEDGE_FALLBACKS['dhokra'];
  } else if (lower.includes('toy') || lower.includes('wood') || lower.includes('lacquer') || lower.includes('channapatna')) {
    selected = KNOWLEDGE_FALLBACKS['channapatna'];
  } else if (lower.includes('ajrakh') || lower.includes('print') || lower.includes('silk') || lower.includes('dupatta') || lower.includes('saree') || lower.includes('kutch')) {
    selected = KNOWLEDGE_FALLBACKS['ajrakh'];
  }

  return {
    ...selected,
    creationTimeHours: hours || selected.creationTimeHours,
    estimatedRawCost: rawCost || selected.estimatedRawCost
  };
}
