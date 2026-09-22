import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types.ts';

interface AudioPlayerButtonProps {
  textToSpeak: string;
  language?: SupportedLanguage;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  textToSpeak,
  language = 'hi',
  label,
  size = 'md',
  className = '',
  id
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert('Speech synthesis is not supported on this browser device.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Map language code to BCP-47 speech tags
    const langCodeMap: Record<SupportedLanguage, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      bn: 'bn-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      mr: 'mr-IN',
      gu: 'gu-IN'
    };

    const targetLang = langCodeMap[language] || 'hi-IN';
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = targetLang;
    utterance.rate = 0.95; // Slightly slower for low-literacy clarity
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const buttonSizeClasses =
    size === 'sm'
      ? 'px-2.5 py-1 text-xs'
      : size === 'lg'
      ? 'px-4 py-2.5 text-base font-semibold'
      : 'px-3 py-1.5 text-sm font-medium';

  return (
    <button
      id={id || 'audio-narration-btn'}
      type="button"
      onClick={handleToggleAudio}
      className={`inline-flex items-center gap-2 rounded-full border transition-all cursor-pointer select-none active:scale-95 ${
        isPlaying
          ? 'bg-[#9E1B32] border-[#9E1B32] text-white shadow-md ring-2 ring-[#9E1B32]/30'
          : 'bg-[#F4EBE1] border-[#D4C3B3] text-[#7A361D] hover:bg-[#EAE0D3] hover:border-[#B84A28]'
      } ${buttonSizeClasses} ${className}`}
      title={isPlaying ? 'Stop Audio' : 'Listen in audio'}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-4 h-4 animate-pulse shrink-0" />
          <span>{label || 'बोलना बंद करें (Stop)'}</span>
          <span className="flex gap-0.5 items-end h-3">
            <span className="w-0.5 h-3 bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-2 bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-3.5 bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-[#B84A28] shrink-0" />
          <span>{label || 'सुनें (Listen)'}</span>
          <Sparkles className="w-3 h-3 text-[#C69214] opacity-70" />
        </>
      )}
    </button>
  );
};
