"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const DrawingPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorButtonRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const eraseButtonRef = useRef<HTMLButtonElement>(null);
  const penButtonRef = useRef<HTMLButtonElement>(null);
  const penSizeRef = useRef<HTMLInputElement>(null);
  const toolTypeRef = useRef<HTMLSpanElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);

  const eraseBool = useRef(false);
  const drawBool = useRef(false);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const rectLeftRef = useRef(0);
  const rectTopRef = useRef(0);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const isTouchDevice = () => {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch {
      return false;
    }
  };

  const getXY = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    let pageX: number, pageY: number;
    if ("touches" in e) {
      pageX = e.touches[0].pageX;
      pageY = e.touches[0].pageY;
    } else {
      pageX = e.pageX;
      pageY = e.pageY;
    }
    mouseXRef.current = pageX - rectLeftRef.current;
    mouseYRef.current = pageY - rectTopRef.current;
  };

  const stopDrawing = () => {
    if (contextRef.current) {
      contextRef.current.beginPath();
    }
    drawBool.current = false;
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    drawBool.current = true;
    getXY(e);
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(mouseXRef.current, mouseYRef.current);
    }
  };

  const drawOnCanvas = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isTouchDevice()) e.preventDefault();
    getXY(e);
    if (drawBool.current && contextRef.current) {
      const ctx = contextRef.current;
      ctx.lineTo(mouseXRef.current, mouseYRef.current);
      ctx.stroke();
      ctx.globalCompositeOperation = eraseBool.current
        ? "destination-out"
        : "source-over";
    }
  };

  const handlePenClick = () => {
    if (toolTypeRef.current) toolTypeRef.current.innerText = "Pen";
    eraseBool.current = false;
  };

  const handleEraseClick = () => {
    if (toolTypeRef.current) toolTypeRef.current.innerText = "Eraser";
    eraseBool.current = true;
  };

  const handlePenSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (contextRef.current) {
      contextRef.current.lineWidth = value;
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = e.target.value;
    }
  };

  const handleBackgroundImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          if (canvasRef.current && contextRef.current) {
            contextRef.current.drawImage(
              img,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            backgroundImageRef.current = img;
          }
        };
        if (typeof ev.target?.result === "string") {
          img.src = ev.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    if (contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      if (backgroundImageRef.current) {
        contextRef.current.drawImage(
          backgroundImageRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      } else {
        contextRef.current.fillStyle = "#ffffff";
        contextRef.current.fillRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
    }
  };

  const handleSave = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "drawing.png";
      link.click();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.strokeStyle = "black";
        context.lineWidth = Number(penSizeRef.current?.value) || 1;
        contextRef.current = context;
      }
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const rect = canvas.getBoundingClientRect();
      rectLeftRef.current = rect.left;
      rectTopRef.current = rect.top;
      if (toolTypeRef.current) toolTypeRef.current.innerText = "Pen";
      if (contextRef.current) {
        contextRef.current.fillStyle = "#ffffff";
        contextRef.current.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-4xl mt-8">
        <div
          id="paintArea"
          className="relative border-8 border-blue-400 h-[70vh] w-full"
        >
          <canvas
            id="canvas"
            ref={canvasRef}
            onMouseDown={startDrawing}
            onTouchStart={startDrawing}
            onMouseMove={drawOnCanvas}
            onTouchMove={drawOnCanvas}
            onMouseUp={stopDrawing}
            onTouchEnd={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
        <div className="options bg-blue-400 p-8">
          <div id="tools-section">
            <div className="grid grid-cols-4 gap-5 mb-10">
              <div className="tools-wrapper">
                <h5 className="mb-2 text-white text-lg">
                  <span id="tool-type" ref={toolTypeRef}></span> Size:
                </h5>
                <input
                  type="range"
                  id="pen-slider"
                  ref={penSizeRef}
                  defaultValue="4"
                  onChange={handlePenSizeChange}
                  className="w-full"
                />
              </div>
              <div className="tools-wrapper">
                <h5 className="mb-2 text-white text-lg">Color:</h5>
                <input
                  type="color"
                  id="color-input"
                  ref={colorButtonRef}
                  onChange={handleColorChange}
                  className="w-full h-10"
                />
              </div>
              <div className="tools-wrapper">
                <h5 className="mb-2 text-white text-lg">Background Image:</h5>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundImageUpload}
                  className="w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-5">
              <button
                id="button-clear"
                ref={clearButtonRef}
                onClick={handleClear}
                className="py-3 rounded-full bg-white text-blue-400 text-lg font-medium"
              >
                Clear
              </button>
              <button
                id="button-pen"
                ref={penButtonRef}
                onClick={handlePenClick}
                className="py-3 rounded-full bg-white text-blue-400 text-lg font-medium"
              >
                Pen
              </button>
              <button
                id="button-erase"
                ref={eraseButtonRef}
                onClick={handleEraseClick}
                className="py-3 rounded-full bg-white text-blue-400 text-lg font-medium"
              >
                Erase
              </button>
              <Button onClick={handleSave} className="py-3 rounded-full">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingPage;
