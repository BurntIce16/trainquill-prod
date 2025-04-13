"use client";
import React, { useRef, useEffect, useState } from "react";

const CanvasBoard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [penSize, setPenSize] = useState(5);
  const [eraserSize, setEraserSize] = useState(20);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(2);

  const images = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
    "/images/5.png",
  ];

  // Save drawing state for canvas preservation
  const tempCanvasRef = useRef(document.createElement("canvas"));

  const getVisibleImages = () => {
    const length = images.length;
    return [
      (currentImageIndex - 1 + length) % length,
      currentImageIndex,
      (currentImageIndex + 1) % length,
    ];
  };

  const preserveDrawing = () => {
    if (
      drawingCanvasRef.current &&
      tempCanvasRef.current &&
      backgroundCanvasRef.current
    ) {
      tempCanvasRef.current.width = drawingCanvasRef.current.width;
      tempCanvasRef.current.height = drawingCanvasRef.current.height;
      const tempCtx = tempCanvasRef.current.getContext("2d");
      const drawCtx = drawingCanvasRef.current.getContext("2d");
      if (tempCtx && drawCtx) {
        tempCtx.drawImage(drawingCanvasRef.current, 0, 0);
      }
    }
  };

  const restoreDrawing = () => {
    if (
      drawingCanvasRef.current &&
      tempCanvasRef.current &&
      backgroundCanvasRef.current
    ) {
      const drawCtx = drawingCanvasRef.current.getContext("2d");
      if (drawCtx) {
        drawCtx.drawImage(
          tempCanvasRef.current,
          0,
          0,
          drawingCanvasRef.current.width,
          drawingCanvasRef.current.height
        );
      }
    }
  };

  useEffect(() => {
    const updateCanvasSize = () => {
      if (
        containerRef.current &&
        backgroundCanvasRef.current &&
        drawingCanvasRef.current
      ) {
        // Preserve current drawings before resize
        preserveDrawing();

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        // Update canvas dimensions
        backgroundCanvasRef.current.width = width;
        backgroundCanvasRef.current.height = height;
        drawingCanvasRef.current.width = width;
        drawingCanvasRef.current.height = height;

        // Redraw background
        const bgCtx = backgroundCanvasRef.current.getContext("2d");
        if (bgCtx) {
          bgCtx.fillStyle = "#ffffff";
          bgCtx.fillRect(0, 0, width, height);
          const img = new Image();
          img.src = images[currentImageIndex];
          img.onload = () => {
            bgCtx.drawImage(img, 0, 0, width, height);
          };
        }

        // Restore drawings after resize
        restoreDrawing();
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [currentImageIndex]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingCanvasRef.current) return;
    const rect = drawingCanvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLastX(x);
    setLastY(y);
    setIsDrawing(true);

    if (isEraser) {
      const ctx = drawingCanvasRef.current.getContext("2d");
      if (ctx) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, eraserSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingCanvasRef.current || !isDrawing) return;
    const rect = drawingCanvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    const ctx = drawingCanvasRef.current.getContext("2d");

    if (ctx) {
      ctx.globalCompositeOperation = isEraser
        ? "destination-out"
        : "source-over";
      ctx.strokeStyle = isEraser ? "rgba(0,0,0,1)" : penColor;
      ctx.lineWidth = isEraser ? eraserSize : penSize;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();

      setLastX(currentX);
      setLastY(currentY);
    }
  };

  const handleMouseUpOrLeave = () => setIsDrawing(false);

  const clearCanvas = () => {
    if (drawingCanvasRef.current) {
      const ctx = drawingCanvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(
          0,
          0,
          drawingCanvasRef.current.width,
          drawingCanvasRef.current.height
        );
      }
    }
  };

  const toggleEraser = () => setIsEraser((prev) => !prev);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPenColor(e.target.value);
  };

  const handlePenSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPenSize(Math.min(50, Math.max(1, Number(e.target.value))));
  };

  const handleEraserSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEraserSize(Math.min(100, Math.max(5, Number(e.target.value))));
  };

  const saveDrawing = () => {
    if (backgroundCanvasRef.current && drawingCanvasRef.current) {
      const combinedCanvas = document.createElement("canvas");
      const width = backgroundCanvasRef.current.width;
      const height = backgroundCanvasRef.current.height;
      combinedCanvas.width = width;
      combinedCanvas.height = height;
      const ctx = combinedCanvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(backgroundCanvasRef.current, 0, 0);
        ctx.drawImage(drawingCanvasRef.current, 0, 0);
        const link = document.createElement("a");
        link.download = "drawing.png";
        link.href = combinedCanvas.toDataURL();
        link.click();
      }
    }
  };

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorX(e.clientX - rect.left);
      setCursorY(e.clientY - rect.top);
    }
  };

  const handleImageNavigation = (direction: "up" | "down") => {
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

      <div className="flex gap-8 px-8 mt-8">
        <div className="w-[60%] flex flex-col">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Be Creative!
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Express your creativity on the canvas below
            </p>
          </div>

          <div
            ref={containerRef}
            className="relative h-[650px] border border-black bg-white"
            onMouseMove={handleContainerMouseMove}
          >
            <canvas
              ref={backgroundCanvasRef}
              className="absolute w-full h-full z-0"
            />
            <canvas
              ref={drawingCanvasRef}
              className={`absolute w-full h-full ${
                isEraser ? "cursor-none" : "cursor-crosshair"
              } z-10`}
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
          </div>

          <div className="mt-4 flex flex-wrap gap-4 items-center">
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

        <div className="w-[40%] pr-4">
          {/* New heading section */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Choose your background!
            </h2>
            <p className="text-sm text-gray-500">
              Click on images below to select different backgrounds
            </p>
          </div>

          {/* Image deck container */}
          <div className="relative h-[700px] flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200 p-4">
            <button
              onClick={() => handleImageNavigation("up")}
              className="mb-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors shadow-md"
            >
              ↑
            </button>

            <div className="relative h-[600px] w-4/5 overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {getVisibleImages().map((imageIndex, position) => (
                  <div
                    key={imageIndex}
                    className={`w-full transition-all duration-300 cursor-pointer ${
                      position === 1
                        ? "scale-100 opacity-100 z-10"
                        : "scale-90 opacity-80 z-0"
                    }`}
                    style={{
                      transform: `translateY(${(position - 1) * 100}px)`,
                    }}
                    onClick={() => setCurrentImageIndex(imageIndex)}
                  >
                    <img
                      src={images[imageIndex]}
                      alt={`Background ${imageIndex + 1}`}
                      className="pl-6 w-full h-70 object-contain rounded-lg border-2 border-gray-200 bg-white shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleImageNavigation("down")}
              className="mt-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors shadow-md"
            >
              ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasBoard;
