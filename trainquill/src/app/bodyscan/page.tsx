"use client";

import AudioController from '@/components/ui/audio-controller';
import { Lyrics } from '@/components/ui/lyric';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import lyricsData from '@/data/bodyscan_transcript.json';


export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  return (
    <div className="relative min-h-screen">
      <div className="grid grid-rows-[auto_auto_auto] items-center justify-items-center min-h-screen p-4 pb-20 gap-8 sm:p-20">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl">BodyScan</h1>
          <AudioController
            audioFile="/audio/bodyscan.mp3"
            onAudioRef={(ref) => audioRef.current = ref.current}
          />
        </div>

        <Lyrics lyrics={lyricsData} audioRef={audioRef} />
      </div>
      
      <Button 
        className="fixed bottom-8 right-8"
        onClick={() => router.push('/reframe')}
      >
        Continue
      </Button>
    </div>
  );
}
