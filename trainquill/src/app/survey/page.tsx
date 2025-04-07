"use client";

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="grid grid-rows-[auto_auto_auto] items-center justify-items-center min-h-screen p-4 pb-20 gap-8 sm:p-20">
        <h1 className="text-8xl">TrainQuill</h1>
        <Button className="text-xl px-8 py-6" onClick={() => window.open('https://wpi.qualtrics.com/jfe/form/SV_7QKlRdH3gHHQc0m', '_blank')}>
          Open survey in a new tab
        </Button>
      </div>
    </div>
  );
}
