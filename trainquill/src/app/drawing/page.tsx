"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AudioController from '@/components/ui/audio-controller';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function Home() {
    const [isDialogOpen, setIsDialogOpen] = useState(true);

    const router = useRouter();

    return (
        <div className="relative min-h-screen">
            <div className="grid grid-rows-[auto_auto_auto] items-center justify-items-center min-h-screen p-4 pt-8 pb-20 gap-1 sm:p-6">

                <div className="flex flex-col items-center gap-8">
                    <h1 className="text-4xl text-center">Physical Drawing activity</h1>

                    <h2 className="text-1xl text-center text-gray-500">
                        Once you are ready to start the activity press play.
                        Once you are done with the activity press the continue button.
                    </h2>

                    <AudioController
                        audioFile="/audio/drawing.mp3"
                    />
                </div>


                <Image src={'/outline.jpg'} alt={'Outline of a person'} width={400} height={400}></Image>



                <Button
                    className="fixed bottom-8 right-8"
                    onClick={() => router.push('/survey')}
                >
                    Continue
                </Button>

                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>This is a physical activity</AlertDialogTitle>
                            <AlertDialogDescription>
                                Before proceeding with this activity please fetch the following items or something comparable.

                                <li>1. A piece of paper</li>
                                <li>2. A pencil, pen, or colored writing device</li>
                                <li>3. An eraser (optional)</li>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
        </div>
    );
}
