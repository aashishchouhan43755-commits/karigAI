import React from 'react';
import { AdminImpactMetrics, ArtisanProfile, SupportedLanguage } from '../types.ts';
import {
  ShieldCheck,
  Award,
  TrendingUp,
  Users,
  Building,
  CheckCircle,
  IndianRupee,
  MapPin,
  FileText,
  BadgeCheck,
  Sparkles
} from 'lucide-react';
import { GISignatureBadge, PaisleyMotif } from './IndianMotifs.tsx';
import { AudioPlayerButton } from './AudioPlayerButton.tsx';

interface AdminDashboardTabProps {
  metrics: AdminImpactMetrics;
  artisan: ArtisanProfile;
  currentLanguage: SupportedLanguage;
  onResetDemoData: () => void;
}

export const AdminDashboardTab: React.FC<AdminDashboardTabProps> = ({
  metrics,
  artisan,
  currentLanguage,
  onResetDemoData
}) => {
  return (
    <div id="cooperative-admin-dashboard" className="space-y-6">
      {/* Top Banner: karigAi Mission Header */}
      <div className="bg-[#241F1C] text-[#FDFBF7] p-6 sm:p-7 rounded-3xl border border-[#3D3530] shadow-md space-y-3 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/40 border border-[#C69214]/60 text-amber-300 text-xs font-bold font-['Cinzel']">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>karigAi • Artisan Heritage & Fair Living Wage</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-['Rozha_One'] text-amber-100">
              सहकारी समिति एवं सामाजिक प्रभाव डैशबोर्ड
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
              ग्रामीण कारीगरों की आजीविका, पारदर्शी मूल्य तथा GI विरासत संरक्षण की निगरानी प्रणाली।
            </p>
          </div>

          <button
            type="button"
            onClick={onResetDemoData}
            className="px-4 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-700/60 text-amber-200 text-xs font-bold transition-all cursor-pointer"
          >
            Reset Demo Data
          </button>
        </div>
      </div>

      {/* Key Impact Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Fair Wage Compliance */}
        <div className="bg-white p-5 rounded-2xl border border-[#E4D5C5] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>न्यायसंगत मजदूरी अनुपालन</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">
            {metrics.fairWageAdherenceRate}%
          </div>
          <p className="text-[11px] text-stone-500">
            न्यूनतम ₹180/घंटा आजीविका मजदूरी बेंचमार्क के अनुरूप।
          </p>
        </div>

        {/* Direct Middleman Savings */}
        <div className="bg-white p-5 rounded-2xl border border-[#E4D5C5] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>बिचौलिया बाईपास बचत</span>
            <IndianRupee className="w-4 h-4 text-[#B84A28]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#8C2D19]">
            ₹{(metrics.directMiddlemanBypassSavingsINR / 100000).toFixed(1)} लाख
          </div>
          <p className="text-[11px] text-stone-500">
            ग्रामीण कारीगर परिवारों को सीधे स्थानांतरित अतिरिक्त आय।
          </p>
        </div>

        {/* Registered Artisans */}
        <div className="bg-white p-5 rounded-2xl border border-[#E4D5C5] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>सत्यापित कारीगर</span>
            <Users className="w-4 h-4 text-[#0E747E]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900">
            {metrics.totalRegisteredArtisans.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-stone-500">
            {metrics.femaleArtisanParticipationRate}% महिला कारीगर भागीदारी।
          </p>
        </div>

        {/* GI Craft Clusters */}
        <div className="bg-white p-5 rounded-2xl border border-[#E4D5C5] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>मान्यता प्राप्त GI क्लस्टर</span>
            <Award className="w-4 h-4 text-[#C69214]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#8C5D0B]">
            {metrics.giCertifiedCraftClusters} क्लस्टर
          </div>
          <p className="text-[11px] text-stone-500">
            {metrics.statesCovered} भारतीय राज्यों में कला मैपिंग।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Master Artisan Cooperative Profile */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-[#E4D5C5] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-xs font-bold text-[#8C5D0B] uppercase tracking-wider">
                मास्टर कारीगर प्रोफाइल (Master Artisan)
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <BadgeCheck className="w-3.5 h-3.5" />
                <span>सत्यापित GI साधक</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={artisan.avatarUrl}
                alt={artisan.fullName}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#C69214] shadow-sm"
              />
              <div>
                <h3 className="text-lg font-bold font-['Rozha_One'] text-[#8C2D19]">
                  {artisan.fullName}
                </h3>
                <p className="text-xs font-semibold text-stone-600">
                  {artisan.craftSpecialty}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B84A28]" />
                  <span>{artisan.village}, {artisan.district}, {artisan.state}</span>
                </div>
              </div>
            </div>

            {/* Audio Bio */}
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DACB] flex items-center justify-between">
              <span className="text-xs font-medium text-stone-700">कारीगर का जीवन परिचय सुनें:</span>
              <AudioPlayerButton
                textToSpeak={`${artisan.fullName}. ${artisan.bioHi}`}
                language={currentLanguage}
                size="sm"
                label="जीवन परिचय (Bio)"
              />
            </div>

            <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
              {artisan.bioHi}
            </p>

            {/* Credential Attributes */}
            <div className="space-y-2 text-xs pt-1">
              <div className="flex justify-between text-stone-600">
                <span>सहकारी समिति:</span>
                <span className="font-bold text-stone-800">{artisan.cooperativeName}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>पीढ़ीगत अनुभव:</span>
                <span className="font-bold text-stone-800">{artisan.generationInCraft}वीं पीढ़ी ({artisan.experienceYears} वर्ष)</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>GI ऑथराइज्ड यूजर नंबर:</span>
                <span className="font-mono font-bold text-[#8C5D0B]">{artisan.giAuthorizedUserNumber}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>डायरेक्ट UPI आईडी:</span>
                <span className="font-mono font-bold text-emerald-700">{artisan.upiId}</span>
              </div>
              <div className="flex justify-between text-stone-600 border-t border-stone-100 pt-2">
                <span>कुल न्यायसंगत संचित आय:</span>
                <span className="font-bold text-base text-[#8C2D19]">
                  ₹{artisan.totalFairEarningsINR.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: National GI Craft Registry & Fair Trade Standards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-[#E4D5C5] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#1F1E1B]">
                  सक्रिय भारतीय भौगोलिक उपदर्शन (GI) शिल्प क्लस्टर
                </h3>
                <p className="text-xs text-stone-500">
                  KarigAI द्वारा सीधे मैप किए गए ऐतिहासिक हस्तशिल्प केंद्र
                </p>
              </div>
              <PaisleyMotif className="w-6 h-6 text-[#C69214]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DACB] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#8C2D19]">मधुबनी / मिथिला चित्रकला</span>
                  <GISignatureBadge region="बिहार" />
                </div>
                <p className="text-stone-600 text-[11px]">
                  वैदिक कालीन प्राकृतिक रंगों की परंपरा। बांस की सींक से कोहबर एवं लोक जीवन चित्रण।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DACB] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#8C2D19]">जयपुर ब्लू पॉटरी</span>
                  <GISignatureBadge region="राजस्थान" />
                </div>
                <p className="text-stone-600 text-[11px]">
                  क्वार्ट्ज स्टोन, कांच व प्राकृतिक गोंद से निर्मित बिना मिट्टी की राजसी चीनी मिट्टी कला।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DACB] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#8C2D19]">बस्तर ढोकरा धातु शिल्प</span>
                  <GISignatureBadge region="छत्तीसगढ़" />
                </div>
                <p className="text-stone-600 text-[11px]">
                  4,000 वर्ष प्राचीन लॉस्ट-वैक्स कांस्य ढलाई परंपरा। मधुमक्खी के मोम के तारों से नक्काशी।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DACB] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#8C2D19]">चन्नापट्टना लाख खिलौने</span>
                  <GISignatureBadge region="कर्नाटक" />
                </div>
                <p className="text-stone-600 text-[11px]">
                  हाथ की खराद पर अले-मारा लकड़ी व सुरक्षित प्राकृतिक हल्दी-लाख से रंगे शिशु-सुरक्षित खिलौने।
                </p>
              </div>
            </div>

            {/* Fair Wage Comparison Table */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                पारंपरिक बिचौलिया शोषण बनाम KarigAI न्यायसंगत मॉडल:
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-stone-200 rounded-lg overflow-hidden">
                  <thead className="bg-[#FAF5E6] text-[#8C5D0B] font-bold">
                    <tr>
                      <th className="p-2 border-b border-stone-200">पैमाना (Metric)</th>
                      <th className="p-2 border-b border-stone-200 text-rose-700">असंगठित बिचौलिया बाजार</th>
                      <th className="p-2 border-b border-stone-200 text-emerald-800 bg-emerald-50/70">KarigAI मॉडल</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="p-2 font-medium">कारीगर प्रति घंटा आय</td>
                      <td className="p-2 text-rose-600">₹30 - ₹50 / घंटा</td>
                      <td className="p-2 text-emerald-800 font-bold bg-emerald-50/40">₹180 - ₹250 / घंटा (गारंटी)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">अंतिम खुदरा मूल्य में कारीगर का हिस्सा</td>
                      <td className="p-2 text-rose-600">18% - 28%</td>
                      <td className="p-2 text-emerald-800 font-bold bg-emerald-50/40">96.5% (सीधा बैंक ट्रांसफर)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">GI टैग प्रामाणिकता संरक्षण</td>
                      <td className="p-2 text-rose-600">नकली मिल-निर्मित प्रतियों से खतरा</td>
                      <td className="p-2 text-emerald-800 font-bold bg-emerald-50/40">डिजिटल वाटरमार्क व QR कोड</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
