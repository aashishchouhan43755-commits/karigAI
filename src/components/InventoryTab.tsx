import React, { useState } from 'react';
import { CraftProduct, SupportedLanguage } from '../types.ts';
import { TRANSLATIONS } from '../translations.ts';
import { AudioPlayerButton } from './AudioPlayerButton.tsx';
import { GISignatureBadge, PaisleyMotif } from './IndianMotifs.tsx';
import {
  Search,
  Filter,
  Package,
  Share2,
  Award,
  Eye,
  MessageSquare,
  Plus,
  Minus,
  Check,
  ExternalLink,
  QrCode
} from 'lucide-react';

interface InventoryTabProps {
  products: CraftProduct[];
  currentLanguage: SupportedLanguage;
  onUpdateStock: (id: string, newStock: number) => void;
  onOpenStudio: () => void;
  onOpenEnquiries: (productId?: string) => void;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({
  products,
  currentLanguage,
  onUpdateStock,
  onOpenStudio,
  onOpenEnquiries
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [giOnlyFilter, setGiOnlyFilter] = useState<boolean>(false);
  const [selectedCertificateProduct, setSelectedCertificateProduct] = useState<CraftProduct | null>(null);
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  const categories = ['All', 'Madhubani & Folk Painting', 'Blue Pottery & Ceramics', 'Dhokra & Metalcraft', 'Woodcarving & Lacquerware'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.craftLineage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.artisanVillage.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesGI = !giOnlyFilter || p.giTag.isCertified;

    return matchesSearch && matchesCategory && matchesGI;
  });

  const handleShareCard = (product: CraftProduct) => {
    const title = currentLanguage === 'hi' ? product.titleHi : product.titleEn;
    const shareText = `Explore authentic GI-certified ${title} handcrafted by ${product.artisanName} on karigAi: ₹${product.pricing.recommendedRetailPrice}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedShareId(product.id);
      setTimeout(() => setCopiedShareId(null), 2500);
    }
  };

  return (
    <div id="artisan-inventory-container" className="space-y-6">
      {/* Top Controls: Search, Filters & Add Craft Button */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E4D5C5] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="inventory-search-input"
              type="text"
              placeholder={currentLanguage === 'hi' ? 'शिल्प, गाँव, या सामग्री खोजें...' : 'Search crafts, village, materials...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D9C8B5] bg-[#FAF7F2] text-sm text-[#1F1E1B] focus:outline-hidden focus:ring-2 focus:ring-[#B84A28]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              id="gi-only-filter-btn"
              type="button"
              onClick={() => setGiOnlyFilter(!giOnlyFilter)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                giOnlyFilter
                  ? 'bg-[#FAF5E6] border-[#C69214] text-[#8C5D0B] ring-1 ring-[#C69214]'
                  : 'bg-[#FAF7F2] border-[#D9C8B5] text-stone-600 hover:bg-[#F3EBE1]'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#B84A28]" />
              <span>{currentLanguage === 'hi' ? 'GI प्रमाणित केवल' : 'GI Certified Only'}</span>
            </button>

            <button
              id="open-studio-shortcut-btn"
              type="button"
              onClick={onOpenStudio}
              className="px-4 py-2 rounded-xl bg-[#B84A28] hover:bg-[#9E3B1C] text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{currentLanguage === 'hi' ? 'नया शिल्प जोड़ें' : 'Add Craft'}</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#8C2D19] text-white shadow-xs'
                  : 'bg-[#FAF7F2] border border-[#E0D0BE] text-[#5C4D40] hover:bg-[#EFE5D8]'
              }`}
            >
              {cat === 'All' ? (currentLanguage === 'hi' ? 'सभी शिल्प' : 'All Crafts') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Craft Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-[#E4D5C5] text-center space-y-4">
          <Package className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-700">
            {currentLanguage === 'hi' ? 'कोई शिल्प नहीं मिला' : 'No Crafts Found'}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {currentLanguage === 'hi' ? 'फ़िल्टर बदलें या AI स्टूडियो द्वारा नया शिल्प कैटलॉग करें।' : 'Change filters or catalog a new craft in AI Studio.'}
          </p>
          <button
            type="button"
            onClick={onOpenStudio}
            className="px-5 py-2.5 rounded-xl bg-[#B84A28] text-white text-xs font-bold shadow-sm hover:bg-[#9E3B1C] cursor-pointer"
          >
            {currentLanguage === 'hi' ? 'AI स्टूडियो खोलें' : 'Open AI Studio'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#E4D5C5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#FAF5E6] group">
                <img
                  src={product.imageEnhanced || product.imageOriginal}
                  alt={currentLanguage === 'hi' ? product.titleHi : product.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* GI Tag Pill */}
                {product.giTag.isCertified && (
                  <div className="absolute top-3 left-3 z-10">
                    <GISignatureBadge region={product.giTag.region} />
                  </div>
                )}

                {/* Stock Counter Tag */}
                <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold text-[#1F1E1B] border border-stone-200 shadow-2xs">
                  {product.stockQuantity > 0 ? (
                    <span className="text-emerald-700">
                      {currentLanguage === 'hi' ? `उपलब्ध: ${product.stockQuantity}` : `In Stock: ${product.stockQuantity}`}
                    </span>
                  ) : (
                    <span className="text-rose-600">
                      {currentLanguage === 'hi' ? 'स्टॉक समाप्त' : 'Out of Stock'}
                    </span>
                  )}
                </div>

                {/* View count & Enquiries overlay */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-amber-300" />
                    <span>{product.viewCount} {currentLanguage === 'hi' ? 'बार देखा गया' : 'views'}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenEnquiries(product.id)}
                    className="flex items-center gap-1 text-amber-300 hover:text-white font-bold cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{product.enquiryCount} {currentLanguage === 'hi' ? 'ऑर्डर संदेश' : 'enquiries'}</span>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold font-['Rozha_One'] text-[#8C2D19] line-clamp-1">
                        {currentLanguage === 'hi' ? product.titleHi : product.titleEn}
                      </h3>
                    </div>
                    <AudioPlayerButton
                      textToSpeak={currentLanguage === 'hi' ? `${product.titleHi}. ${product.storyHi}` : `${product.titleEn}. ${product.storyEn}`}
                      language={currentLanguage}
                      size="sm"
                    />
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {currentLanguage === 'hi' ? product.storyHi : product.storyEn}
                  </p>

                  {/* Motifs Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.culturalMotifs.slice(0, 2).map((motif, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-[#FAF5E6] border border-[#C69214]/30 text-[10px] text-[#8C5D0B] font-medium"
                      >
                        {motif}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Artisan Fair Wage Earnings */}
                <div className="pt-3 border-t border-stone-100 space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wide block">
                        {currentLanguage === 'hi' ? 'खुदरा मूल्य' : 'Retail Price'}
                      </span>
                      <span className="text-xl font-black text-[#8C2D19]">
                        ₹{product.pricing.recommendedRetailPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-700 font-semibold block">
                        {currentLanguage === 'hi' ? 'सीधी मजदूरी' : 'Direct Artisan Labor'}
                      </span>
                      <span className="text-sm font-bold text-emerald-700">
                        ₹{product.pricing.artisanLaborEarning.toLocaleString('en-IN')} ({product.creationTimeHours} {currentLanguage === 'hi' ? 'घंटे' : 'hrs'})
                      </span>
                    </div>
                  </div>

                  {/* B2B Wholesale Tier Highlight */}
                  <div className="text-[11px] p-2 rounded-lg bg-[#FAF7F2] border border-[#E7DACB] flex justify-between text-stone-700">
                    <span>{currentLanguage === 'hi' ? 'थोक दर (10+ पीस):' : 'Wholesale (10+ pcs):'}</span>
                    <span className="font-bold text-[#0E747E]">
                      ₹{product.pricing.b2bWholesaleTier1} / {currentLanguage === 'hi' ? 'इकाई' : 'unit'}
                    </span>
                  </div>

                  {/* Stock Quantity Controls & Actions */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center border border-[#D9C8B5] rounded-lg bg-[#FAF7F2] p-0.5">
                      <button
                        type="button"
                        onClick={() => onUpdateStock(product.id, Math.max(0, product.stockQuantity - 1))}
                        className="p-1 text-stone-600 hover:text-black cursor-pointer"
                        title="Decrease stock"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800">{product.stockQuantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateStock(product.id, product.stockQuantity + 1)}
                        className="p-1 text-stone-600 hover:text-black cursor-pointer"
                        title="Increase stock"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedCertificateProduct(product)}
                        className="p-2 rounded-lg bg-[#FAF5E6] border border-[#C69214] text-[#8C5D0B] hover:bg-[#F3E7C4] text-xs font-semibold cursor-pointer flex items-center gap-1"
                        title="View Official GI Heritage Certificate"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{currentLanguage === 'hi' ? 'प्रमाणपत्र' : 'Certificate'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShareCard(product)}
                        className="p-2 rounded-lg bg-[#EFE5D8] border border-[#D9C8B5] text-[#5C4D40] hover:text-black text-xs font-semibold cursor-pointer flex items-center gap-1"
                        title="Share Link"
                      >
                        {copiedShareId === product.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                        <span className="hidden sm:inline">{currentLanguage === 'hi' ? 'साझा करें' : 'Share'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GI Heritage Certificate Modal */}
      {selectedCertificateProduct && (
        <div
          id="gi-certificate-modal"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedCertificateProduct(null)}
        >
          <div
            className="bg-[#FDFBF7] max-w-lg w-full rounded-3xl border-4 border-[#C69214] p-6 sm:p-8 shadow-2xl relative space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Traditional Decorative Top Header */}
            <div className="text-center space-y-1 border-b-2 border-[#C69214]/40 pb-4">
              <div className="flex justify-center mb-1">
                <PaisleyMotif className="w-8 h-8 text-[#B84A28]" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8C5D0B] font-['Cinzel']">
                GOVERNMENT OF INDIA • GEOGRAPHICAL INDICATION REGISTRY
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-['Rozha_One'] text-[#8C2D19]">
                प्रामाणिक शिल्प विरासत प्रमाणपत्र
              </h2>
              <p className="text-xs text-stone-600 font-medium">
                Official Authenticity & Fair Living Wage Certificate
              </p>
            </div>

            {/* Certificate Details */}
            <div className="space-y-3 text-xs bg-white p-4 rounded-xl border border-[#E7DACB]">
              <div className="flex justify-between">
                <span className="text-stone-500">शिल्प नाम (Craft Title):</span>
                <span className="font-bold text-stone-800 text-right">{selectedCertificateProduct.titleHi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">मास्टर कारीगर (Master Artisan):</span>
                <span className="font-bold text-stone-800">{selectedCertificateProduct.artisanName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">शिल्प क्षेत्र (GI Region):</span>
                <span className="font-bold text-stone-800">{selectedCertificateProduct.giTag.region}, {selectedCertificateProduct.giTag.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">GI पंजीकरण संख्या:</span>
                <span className="font-mono font-bold text-[#8C5D0B]">{selectedCertificateProduct.giTag.tagCode || 'GI-MTH-38-07'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">समर्पित हस्तशिल्प समय:</span>
                <span className="font-bold text-stone-800">{selectedCertificateProduct.creationTimeHours} घंटे (Handcrafted)</span>
              </div>
              <div className="flex justify-between border-t border-stone-100 pt-2 text-emerald-700">
                <span>कारीगर न्यायसंगत मजदूरी अंश:</span>
                <span className="font-bold">₹{selectedCertificateProduct.pricing.artisanLaborEarning} (100% Direct Payout)</span>
              </div>
            </div>

            {/* QR Code & Seal */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF5E6] border border-[#C69214]/40">
              <div className="flex items-center gap-2">
                <QrCode className="w-10 h-10 text-[#8C5D0B]" />
                <div className="text-[10px] text-[#8C5D0B]">
                  <div className="font-bold">Scan to Verify Provenance</div>
                  <div>Blockchain-backed tamper-proof token</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-stone-500 block">Digitally Signed by</span>
                <span className="text-xs font-bold text-[#8C2D19]">KarigAI Cooperative</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCertificateProduct(null)}
              className="w-full py-2.5 rounded-xl bg-[#8C2D19] text-white font-bold text-xs hover:bg-[#6E2213] cursor-pointer"
            >
              बंद करें (Close Certificate)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
