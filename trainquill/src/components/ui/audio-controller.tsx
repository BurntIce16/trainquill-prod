"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCw, Volume2, VolumeX } from 'lucide-react';

interface AudioControllerProps {
  audioFile: string;
  onAudioRef?: (ref: React.RefObject<HTMLAudioElement | null>) => void;
}

const AudioController: React.FC<AudioControllerProps> = ({ 
  audioFile,
  onAudioRef 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (onAudioRef) {
      onAudioRef(audioRef);
    }
  }, [onAudioRef]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setIsCompleted(true);
      });
    }
  }, []);

  const handlePlayOrRestart = () => {
    if (!audioRef.current) return;

    if (isCompleted) {
      audioRef.current.currentTime = 0;
      setIsCompleted(false);
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <audio ref={audioRef} src={audioFile} />
      
      <button
        onClick={handlePlayOrRestart}
        disabled={isPlaying}
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors ${
          isPlaying 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-primary hover:bg-primary/90'
        }`}
        aria-label={isCompleted ? 'Restart' : 'Play'}
      >
        {isCompleted ? <RotateCw size={24} /> : <Play size={24} />}
      </button>

      <button
        onClick={handleMute}
        className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-white transition-colors"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
};

export default AudioController;