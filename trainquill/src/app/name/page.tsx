"use client";
import React, { useState, useEffect } from "react";

import cardBackground from "../../assets/card-background.jpg";
import happyImg from "../../assets/angry.jpg";
import sadImg from "../../assets/angry.jpg";
import angryImg from "../../assets/angry.jpg";
import surprisedImg from "../../assets/angry.jpg";
import calmImg from "../../assets/angry.jpg";
import excitedImg from "../../assets/angry.jpg";
import afraidImg from "../../assets/angry.jpg";
import disgustedImg from "../../assets/angry.jpg";

import contentImg from "../../assets/angry.jpg";
import anxiousImg from "../../assets/angry.jpg";
import boredImg from "../../assets/angry.jpg";
import frustratedImg from "../../assets/angry.jpg";
import proudImg from "../../assets/angry.jpg";
import jealousImg from "../../assets/angry.jpg";
import confusedImg from "../../assets/angry.jpg";
import optimisticImg from "../../assets/angry.jpg";

interface Card {
  id: number;
  emotion: string;
  image: string;
  isFlipped: boolean;
}

const emotionSets = [
  [
    { emotion: "Happy", image: happyImg },
    { emotion: "Sad", image: sadImg },
    { emotion: "Angry", image: angryImg },
    { emotion: "Surprised", image: surprisedImg },
    { emotion: "Calm", image: calmImg },
    { emotion: "Excited", image: excitedImg },
    { emotion: "Afraid", image: afraidImg },
    { emotion: "Disgusted", image: disgustedImg },
  ],
  [
    { emotion: "Content", image: contentImg },
    { emotion: "Anxious", image: anxiousImg },
    { emotion: "Bored", image: boredImg },
    { emotion: "Frustrated", image: frustratedImg },
    { emotion: "Proud", image: proudImg },
    { emotion: "Jealous", image: jealousImg },
    { emotion: "Confused", image: confusedImg },
    { emotion: "Optimistic", image: optimisticImg },
  ],
];

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const EmotionsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const currentEmotions = emotionSets[currentPage].map((item, index) => ({
      id: index,
      emotion: item.emotion,
      image: item.image,
      isFlipped: false,
    }));
    setCards(shuffleArray(currentEmotions));
  }, [currentPage]);

  const flipCard = (id: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  };

  const allCardsFlipped = cards.every((card) => card.isFlipped);

  const handleContinue = () => {
    if (currentPage < emotionSets.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <h1>Learn About Emotions</h1>
      <p>
        Flip each card to reveal an emotion. When all cards are flipped, click
        on Continue to explore more!
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          marginTop: "2rem",
          justifyItems: "center",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => flipCard(card.id)}
            style={{ perspective: "1000px", cursor: "pointer" }}
          >
            <div
              style={{
                position: "relative",
                width: "250px",
                height: "350px",
                transition: "transform 0.6s",
                transformStyle: "preserve-3d",
                transform: card.isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  backgroundImage: `url(${cardBackground.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "8px",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  backgroundColor: "#fff",
                  border: "3px solid black",
                  borderRadius: "8px",
                  transform: "rotateY(180deg)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <img
                    src={card.image.src}
                    alt={card.emotion}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "#fff",
                    borderTop: "1px solid black",
                    textAlign: "center",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {card.emotion}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {allCardsFlipped && (
        <>
          {currentPage < emotionSets.length - 1 && (
            <button
              onClick={handleContinue}
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                padding: "1rem 2rem",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Continue
            </button>
          )}
          {currentPage > 0 && (
            <button
              onClick={handleBack}
              style={{
                position: "fixed",
                bottom: "20px",
                left: "20px",
                padding: "1rem 2rem",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EmotionsPage;
