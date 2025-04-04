"use client";

import AudioController from '@/components/ui/audio-controller';
import { Lyrics } from '@/components/ui/lyric';
import { useRef } from 'react';
import lyricsData from '@/data/bodyscan_transcript.json';


export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="grid grid-rows-[auto_auto_auto] items-center justify-items-center min-h-screen p-4 pb-20 gap-8 sm:p-20">
      <h1 className="text-8xl">TrainQuill</h1>

      <div className="flex flex-col items-center gap-4">
        <p className="text-2xl">BodyScan</p>
        <AudioController
          audioFile="/audio/bodyscan.mp3"
          onAudioRef={(ref) => audioRef.current = ref.current}
        />
      </div>

      <Lyrics lyrics={lyricsData} audioRef={audioRef} />
    </div>
  );
}
