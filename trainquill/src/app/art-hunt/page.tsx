"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import AudioController from '@/components/ui/audio-controller';
import { useRouter } from 'next/navigation';
import { artPieces } from './data';

export default function Home() {
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    return (
        <div className="relative min-h-screen">
            <div className="grid grid-rows-[auto_auto_auto] items-center justify-items-center min-h-screen p-4 pt-8 pb-20 gap-2 sm:p-6">
                <h1 className="text-4xl">Art Hunt</h1>

                <AudioController
                    audioFile="/audio/art-hunt.mp3"
                />

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                        watchDrag: false,
                    }}
                    className="w-full max-w-xl"
                >
                    <CarouselContent>
                        {artPieces.map((piece) => (
                            <CarouselItem key={piece.id}>
                                <div className="p-6 flex flex-col gap-4">
                                    <div className="relative w-full h-[300px] flex items-center justify-center">
                                        <Image
                                            src={piece.imagePath}
                                            alt={`${piece.title} by ${piece.author}`}
                                            fill
                                            className="object-contain rounded-lg"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className={!isSubmitted ? "blur-sm" : ""}>
                                        <h3 className="text-2xl font-semibold">{piece.title}</h3>
                                        <p className="text-gray-500">{piece.author}</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious
                        className={isSubmitted ? "hidden" : ""}
                    />
                    <CarouselNext
                        className={isSubmitted ? "hidden" : ""}
                    />
                </Carousel>

                <div className="grid w-4xl h-32 gap-1.5">
                    <Label htmlFor="response">Why does this piece make you uncomfortable?</Label>
                    <Textarea
                        placeholder="This piece makes me uncomfortable because..."
                        id="response"
                        className="resize-none"
                        disabled={isSubmitted}
                    />
                </div>

                <Button
                    onClick={handleSubmit}
                    hidden={isSubmitted}
                >
                    {isSubmitted ? 'Submitted' : 'Submit'}
                </Button>

                <Button
                    className="fixed bottom-8 right-8"
                    hidden={!isSubmitted}
                    onClick={() => router.push('/survey')}
                >
                    Continue
                </Button>

            </div>
        </div>
    );
}
