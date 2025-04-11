"use client";
import React, { useRef, useEffect, useState } from "react";

const CanvasBoard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [penSize, setPenSize] = useState(5);
  const [eraserSize, setEraserSize] = useState(20);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(2);

  // Sample images - replace with your actual image paths
  const images = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
    "/images/5.png",
  ];

  const getCircularDistance = (
    index: number,
    current: number,
    length: number
  ) => {
    let distance = index - current;
    if (distance > length / 2) distance -= length;
    else if (distance < -length / 2) distance += length;
    return distance;
  };

  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const width = 0.7 * window.innerWidth;
        const height = 0.7 * window.innerHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        setCanvasDimensions({ width, height });

        const context = canvasRef.current.getContext("2d");
        if (context) {
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, width, height);

          // Load and draw current background image
          const img = new Image();
          img.src = images[currentImageIndex];
          img.onload = () => {
            context.globalCompositeOperation = "source-over";
            context.drawImage(img, 0, 0, width, height);
          };
        }
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [currentImageIndex]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLastX(x);
    setLastY(y);
    setIsDrawing(true);

    if (isEraser) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.save();
        context.globalCompositeOperation = "destination-out";
        context.beginPath();
        context.arc(x, y, eraserSize / 2, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    const context = canvas.getContext("2d");

    if (context && isDrawing) {
      context.globalCompositeOperation = isEraser
        ? "destination-out"
        : "source-over";
      context.strokeStyle = isEraser ? "rgba(0,0,0,1)" : penColor;
      context.lineWidth = isEraser ? eraserSize : penSize;
      context.lineJoin = "round";
      context.lineCap = "round";

      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(currentX, currentY);
      context.stroke();

      setLastX(currentX);
      setLastY(currentY);
    }
  };

  const handleMouseUpOrLeave = () => setIsDrawing(false);

  const clearCanvas = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.fillStyle = "#ffffff";
        context.fillRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        // Redraw current background image after clear
        const img = new Image();
        img.src = images[currentImageIndex];
        img.onload = () => {
          context.drawImage(
            img,
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height
          );
        };
      }
    }
  };

  const toggleEraser = () => setIsEraser((prev) => !prev);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPenColor(e.target.value);
  };

  const handlePenSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Math.min(50, Math.max(1, Number(e.target.value)));
    setPenSize(size);
  };

  const handleEraserSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Math.min(100, Math.max(5, Number(e.target.value)));
    setEraserSize(size);
  };

  const saveDrawing = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "drawing.png";
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorX(e.clientX - rect.left);
      setCursorY(e.clientY - rect.top);
    }
  };

  const handleImageChange = (direction: "up" | "down") => {
    setCurrentImageIndex(
      (prev) =>
        (prev + (direction === "down" ? 1 : -1) + images.length) % images.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Finish the Drawing
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto px-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="flex">
        {/* Canvas Section */}
        <div className="w-[70%] relative pt-10 pl-10">
          <div
            ref={containerRef}
            className="relative"
            onMouseMove={handleContainerMouseMove}
          >
            <canvas
              ref={canvasRef}
              className={`border border-black ${
                isEraser ? "cursor-none" : "cursor-crosshair"
              } relative z-10`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
            />

            {isEraser && (
              <div
                className="absolute border-2 border-black rounded-full bg-white pointer-events-none z-[10000]"
                style={{
                  left: `${cursorX - eraserSize / 2}px`,
                  top: `${cursorY - eraserSize / 2}px`,
                  width: `${eraserSize}px`,
                  height: `${eraserSize}px`,
                }}
              />
            )}

            <div
              className="mt-4 flex flex-wrap gap-4 items-center"
              style={{ width: canvasDimensions.width }}
            >
              <button
                onClick={clearCanvas}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
              >
                Clear Canvas
              </button>

              <button
                onClick={toggleEraser}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-md"
              >
                {isEraser ? "Drawing Mode" : "Eraser Mode"}
              </button>

              {!isEraser && (
                <label className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md cursor-pointer">
                  Pen Color:
                  <div className="relative">
                    <input
                      type="color"
                      value={penColor}
                      onChange={handleColorChange}
                      className="absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <span
                      className="block w-6 h-6 rounded border border-white"
                      style={{ backgroundColor: penColor }}
                    />
                  </div>
                </label>
              )}

              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg shadow-md">
                <span className="text-gray-700">Pen Size:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPenSize(Math.max(1, penSize - 1))}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={penSize}
                    onChange={handlePenSizeChange}
                    className="w-12 text-center bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    min="1"
                    max="50"
                  />
                  <button
                    onClick={() => setPenSize(Math.min(50, penSize + 1))}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg shadow-md">
                <span className="text-gray-700">Eraser Size:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEraserSize(Math.max(5, eraserSize - 5))}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={eraserSize}
                    onChange={handleEraserSizeChange}
                    className="w-12 text-center bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-red-500"
                    min="5"
                    max="100"
                    step="5"
                  />
                  <button
                    onClick={() => setEraserSize(Math.min(100, eraserSize + 5))}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                onClick={saveDrawing}
              >
                Save Drawing
              </button>
            </div>
          </div>
        </div>

        {/* Image Deck Section */}
        <div className="w-[30%] pr-8 pl-4 pt-10">
          <div className="relative h-[700px] overflow-y-auto">
            <div className="flex flex-col gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 ${
                    index === currentImageIndex
                      ? "ring-4 ring-blue-500"
                      : "ring-1 ring-gray-300"
                  } rounded-lg overflow-hidden`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={img}
                    alt={`Background ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  {index === currentImageIndex && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        Current
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasBoard;
