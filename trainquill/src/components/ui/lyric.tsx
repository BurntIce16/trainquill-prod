"use client";

import React, { RefObject, useEffect, useState } from 'react';

interface LyricLine {
  text: string;
  startTime: number;
  endTime: number;
}

interface LyricsProps {
  lyrics: LyricLine[];
  audioRef: RefObject<HTMLAudioElement | null>;
}

export const Lyrics: React.FC<LyricsProps> = ({ lyrics, audioRef }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(-1);

  useEffect(() => {
    if (!audioRef || !audioRef.current) return;

    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      
      // Find the line that contains the current time
      const index = lyrics.findIndex((line, i) => {
        // If we're within this line's time range
        if (currentTime >= line.startTime && currentTime <= line.endTime) {
          return true;
        }
        
        // If we're in a gap between lines, keep the previous line active
        if (i < lyrics.length - 1 && 
            currentTime > line.endTime && 
            currentTime < lyrics[i + 1].startTime) {
          return true;
        }
        
        return false;
      });

      setCurrentLineIndex(index);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [lyrics, audioRef]);

  const visibleLyrics = lyrics.slice(
    Math.max(0, currentLineIndex - 2),
    Math.min(lyrics.length, currentLineIndex + 3)
  );

  const getPositionClass = (index: number) => {
    const relativeToCurrent = index - (currentLineIndex - Math.min(2, currentLineIndex));
    switch (relativeToCurrent) {
      case 2: return 'text-gray-500';
      case 1: return 'text-gray-500';
      case 0: return 'text-gray-500'; // Removed font-bold and special color
      case 3: return 'text-gray-500';
      case 4: return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl mx-auto p-4 h-[300px] items-center justify-center">
      <div className="relative w-[600px] border-2 border-gray-300 rounded-lg p-6 bg-white/50 backdrop-blur-sm h-[200px] flex items-center overflow-hidden">
        <div className="flex flex-col w-full">
          {visibleLyrics.map((line, index) => (
            <div
              key={index + Math.max(0, currentLineIndex - 2)}
              className={`text-lg transition-all duration-300 ${getPositionClass(index)} py-1 truncate`}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lyrics;