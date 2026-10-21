import React, { useState } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { ActiveQuestion } from '../types';
import { audioService } from '../services/audioService';

interface QuestionCardProps {
  question: ActiveQuestion;
  dayIcon: string;
  feedbackToast: {
    show: boolean;
    text: string;
    type: 'correct' | 'wrong' | 'timeout';
  };
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  dayIcon,
  feedbackToast
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const handlePlayRealSound = async () => {
    setIsPlayingSound(true);
    await audioService.playRealSound(question.prompt);
    setTimeout(() => setIsPlayingSound(false), 1500);
  };

  return (
    <main className="bg-white rounded-hero-lg border-2 border-hero-border shadow-hero-md flex-1 flex flex-col items-center justify-between p-4 sm:p-5 text-center relative mb-3 min-h-0 w-full overflow-hidden">
      {/* Toast Notification Top */}
      <div
        className={`absolute top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-white font-black text-sm shadow-lg transition-all duration-200 pointer-events-none z-20 whitespace-nowrap ${
          feedbackToast.show
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-4 scale-90'
        } ${
          feedbackToast.type === 'correct'
            ? 'bg-hero-success'
            : feedbackToast.type === 'timeout'
            ? 'bg-hero-gold'
            : 'bg-hero-danger'
        }`}
      >
        {feedbackToast.text}
      </div>

      {/* Topic Badge */}
      <div className="inline-flex items-center gap-1.5 text-[0.72rem] font-black uppercase tracking-wider text-hero-red bg-red-50 border border-red-100 px-3 py-1 rounded-full">
        <span>{dayIcon}</span>
        <span>{question.topic}</span>
      </div>

      {/* Main Prompt */}
      <h2 className="text-base sm:text-lg font-black text-hero-black leading-snug max-w-md my-1.5">
        {question.prompt}
      </h2>

      {/* Center Visual Area (Real Photo or High-Res Emoji) */}
      <div className="flex-1 w-full flex flex-col items-center justify-center my-1 relative min-h-[110px]">
        {question.realImage ? (
          <div className="relative group max-h-36 sm:max-h-40 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm bg-slate-50">
            <img
              src={question.realImage}
              alt={question.prompt}
              onLoad={() => setImgLoaded(true)}
              className={`max-h-36 sm:max-h-40 object-cover rounded-2xl transition-all duration-300 ${
                imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            />
            {/* Real Audio Cue Button Overlay if sound related */}
            {(question.prompt.toLowerCase().includes('suara') ||
              question.prompt.toLowerCase().includes('bunyi')) && (
              <button
                onClick={handlePlayRealSound}
                className="absolute bottom-2 right-2 bg-hero-black/85 text-white p-2 rounded-full shadow-md backdrop-blur-sm hover:bg-hero-red transition-all active:scale-90 flex items-center gap-1 text-xs font-bold"
                title="Putar Suara Asli"
              >
                <Volume2 size={14} className={isPlayingSound ? "animate-bounce text-hero-gold" : ""} />
                <span>Dengar</span>
              </button>
            )}
          </div>
        ) : question.visual ? (
          <div
            className="text-4xl sm:text-5xl font-black text-hero-black drop-shadow-sm flex items-center justify-center p-2"
            dangerouslySetInnerHTML={{ __html: question.visual }}
          />
        ) : (
          <div className="text-4xl">⭐</div>
        )}
      </div>

      {/* Hint / Sound helper banner if available */}
      <div className="w-full flex items-center justify-center gap-1 text-xs font-bold text-slate-400">
        <Sparkles size={12} className="text-hero-gold" />
        <span>Pilih jawaban yang benar di bawah ya Kak Reza!</span>
      </div>
    </main>
  );
};
