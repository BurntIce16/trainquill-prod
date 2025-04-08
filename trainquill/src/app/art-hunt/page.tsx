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
                        active: !isSubmitted,
                    }}
                    className="w-full max-w-xl"
                >
                    <CarouselContent>
                        <CarouselItem>
                            <div className="p-6 flex flex-col gap-4">
                                <div className="relative w-full h-[300px] flex items-center justify-center">
                                    <Image
                                        src="/art-hunt/img_1.jpeg"
                                        alt="Art piece 1"
                                        fill
                                        className="object-contain rounded-lg"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <h3 className={`text-2xl font-semibold ${!isSubmitted ? "blur-sm" : ""}`}>Slide 1</h3>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="p-6 flex flex-col gap-4">
                                <div className="relative w-full h-[300px] flex items-center justify-center">
                                    <Image
                                        src="/art-hunt/img_2.jpeg"
                                        alt="Art piece 2"
                                        fill
                                        className="object-contain rounded-lg"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <h3 className={`text-2xl font-semibold ${!isSubmitted ? "blur-sm" : ""}`}>Slide 2</h3>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="p-6 flex flex-col gap-4">
                                <div className="relative w-full h-[300px] flex items-center justify-center">
                                    <Image
                                        src="/art-hunt/img_3.jpeg"
                                        alt="Art piece 3"
                                        fill
                                        className="object-contain rounded-lg"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <h3 className={`text-2xl font-semibold ${!isSubmitted ? "blur-sm" : ""}`}>Slide 3</h3>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="p-6 flex flex-col gap-4">
                                <div className="relative w-full h-[300px] flex items-center justify-center">
                                    <Image
                                        src="/art-hunt/img_4.jpeg"
                                        alt="Art piece 4"
                                        fill
                                        className="object-contain rounded-lg"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <h3 className={`text-2xl font-semibold ${!isSubmitted ? "blur-sm" : ""}`}>Slide 4</h3>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="p-6 flex flex-col gap-4">
                                <div className="relative w-full h-[300px] flex items-center justify-center">
                                    <Image
                                        src="/art-hunt/img_5.jpeg"
                                        alt="Art piece 5"
                                        fill
                                        className="object-contain rounded-lg"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <h3 className={`text-2xl font-semibold ${!isSubmitted ? "blur-sm" : ""}`}>Slide 5</h3>
                            </div>
                        </CarouselItem>
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
