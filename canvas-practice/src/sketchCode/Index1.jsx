import { useEffect, useRef, useState } from "react";
import {
  Canvas,
  Rect,
  Circle,
  PencilBrush,
  Polygon,
  IText,
  Triangle,
  Line,
} from "fabric";
import Editor from "./Editor";

const Index1 = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const rectStartRef = useRef({ x: 0, y: 0 });
  const tempRectRef = useRef(null);
  const [drawingShape, setDrawingShape] = useState(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushWidth, setBrushWidth] = useState(5);
  const [selectedObject, setSelectedObject] = useState(null);

  const [isBrush, setIsBrush] = useState(false);
  const [isBrushColor, setIsBrushColor] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (canvas) canvas.dispose();

    const width = 1000;
    const height = 600;

    const initCanvas = new Canvas(canvasRef.current, {
      width,
      height,
      selection: true,
      backgroundColor: "#ffffff",
    });

    setCanvas(initCanvas);

    const frame = new Rect({
      width,
      height,
      fill: "transparent",
      selectable: false,
    });

    initCanvas.add(frame);

    initCanvas.on("object:moving", (e) => {
      const obj = e.target;
      const canvasWidth = initCanvas.getWidth();
      const canvasHeight = initCanvas.getHeight();
      obj.setCoords();
      const boundingRect = obj.getBoundingRect();

      if (boundingRect.left < 0) obj.left = 0;
      if (boundingRect.top < 0) obj.top = 0;
      if (boundingRect.left + boundingRect.width > canvasWidth)
        obj.left = canvasWidth - boundingRect.width;
      if (boundingRect.top + boundingRect.height > canvasHeight)
        obj.top = canvasHeight - boundingRect.height;
    });

    initCanvas.on("selection:created", (e) => {
      setSelectedObject(e.selected[0]);
    });

    initCanvas.on("selection:updated", (e) => {
      setSelectedObject(e.selected[0]);
    });

    initCanvas.on("selection:cleared", () => {
      setSelectedObject(null);
    });

    const handleKeyDown = (e) => {
      if (e.key === "Delete") {
        const activeObject = initCanvas.getActiveObject();
        if (activeObject) {
          initCanvas.remove(activeObject);
          setSelectedObject(null);
          initCanvas.discardActiveObject().renderAll();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      initCanvas.dispose();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Automatically control UI visibility for brush/color
  useEffect(() => {
    if (drawingShape === "Pencil") {
      setIsBrush(true);
      setIsBrushColor(true);
    } else if (drawingShape === "Eraser") {
      setIsBrush(true);
      setIsBrushColor(false);
    } else {
      setIsBrush(false);
      setIsBrushColor(false);
    }
  }, [drawingShape]);

  useEffect(() => {
    if (!isDrawing || !canvas) return;

    if (drawingShape === "Pencil") {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new PencilBrush(canvas);
      canvas.freeDrawingBrush.width = brushWidth;
      canvas.freeDrawingBrush.color = brushColor;
      canvas.defaultCursor = "crosshair";
      return;
    }

    if (drawingShape === "Eraser") {
      canvas.isDrawingMode = true;
      const eraserBrush = new PencilBrush(canvas);
      eraserBrush.width = brushWidth;
      eraserBrush.color = "#ffffff";
      canvas.freeDrawingBrush = eraserBrush;
      canvas.defaultCursor =
        "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22 fill=%22white%22 stroke=%22black%22 stroke-width=%222%22 /></svg>') 12 12, auto";
      return;
    }

    let isDragging = false;

    const startDrawing = (e) => {
      if (drawingShape === "Pencil" || drawingShape === "Eraser") return;

      const pointer = canvas.getPointer(e.e);
      rectStartRef.current = { x: pointer.x, y: pointer.y };
      isDragging = true;

      switch (drawingShape) {
        case "Rect":
          tempRectRef.current = new Rect({
            left: pointer.x,
            top: pointer.y,
            width: 0,
            height: 0,
            fill: "#d9d9d9",
            selectable: false,
          });
          break;
        case "Line":
          tempRectRef.current = new Line(
            [pointer.x, pointer.y, pointer.x, pointer.y],
            {
              stroke: "#000000",
              strokeWidth: 2,
              selectable: false,
              evented: false,
            }
          );
          break;
        case "Frame":
          tempRectRef.current = new Rect({
            left: pointer.x,
            top: pointer.y,
            width: 0,
            height: 0,
            fill: "transparent",
            stroke: "#000",
            strokeWidth: 2,
            selectable: false,
          });
          setIsDrawing(false);
          canvas.defaultCursor = "default";
          canvas.renderAll();
          break;
        case "Circle":
          tempRectRef.current = new Circle({
            left: pointer.x,
            top: pointer.y,
            radius: 0,
            fill: "#d9d9d9",
            selectable: false,
          });
          break;
        case "Triangle":
          tempRectRef.current = new Triangle({
            left: pointer.x,
            top: pointer.y,
            width: 0,
            height: 0,
            fill: "#d9d9d9",
            selectable: false,
          });
          break;
        case "Star":
          const starPoints = [
            { x: 0, y: -50 },
            { x: 14, y: -20 },
            { x: 47, y: -15 },
            { x: 23, y: 7 },
            { x: 29, y: 40 },
            { x: 0, y: 25 },
            { x: -29, y: 40 },
            { x: -23, y: 7 },
            { x: -47, y: -15 },
            { x: -14, y: -20 },
          ];
          tempRectRef.current = new Polygon(starPoints, {
            left: pointer.x,
            top: pointer.y,
            fill: "#d9d9d9",
            selectable: false,
            scaleX: 0.2,
            scaleY: 0.2,
          });
          break;
        case "Text":
          tempRectRef.current = new IText("Type here...", {
            left: pointer.x,
            top: pointer.y,
            fontSize: 16,
            fill: "black",
            selectable: true,
          });
          break;
      }

      canvas.add(tempRectRef.current);
    };

    const drawing = (e) => {
      if (!isDragging || !tempRectRef.current) return;

      const pointer = canvas.getPointer(e.e);
      const startX = rectStartRef.current.x;
      const startY = rectStartRef.current.y;
      const width = pointer.x - startX;
      const height = pointer.y - startY;

      switch (drawingShape) {
        case "Rect":
        case "Triangle":
          tempRectRef.current.set({
            width: Math.abs(width),
            height: Math.abs(height),
            left: width < 0 ? pointer.x : startX,
            top: height < 0 ? pointer.y : startY,
          });
          break;
        case "Circle":
          const radius = Math.sqrt(width ** 2 + height ** 2) / 2;
          tempRectRef.current.set({
            radius,
            scaleX: Math.abs(width) / (2 * radius),
            scaleY: Math.abs(height) / (2 * radius),
            left: width < 0 ? startX + width : startX,
            top: height < 0 ? startY + height : startY,
          });
          break;
        case "Line":
          tempRectRef.current.set({
            x2: pointer.x,
            y2: pointer.y,
          });
          break;
        case "Star":
          const scaleX = Math.abs(width) / 100;
          const scaleY = Math.abs(height) / 100;
          tempRectRef.current.set({
            scaleX,
            scaleY,
            left: width < 0 ? startX + width : startX,
            top: height < 0 ? startY + height : startY,
          });
          break;
      }

      tempRectRef.current.setCoords();
      canvas.renderAll();
    };

    const endDrawing = () => {
      isDragging = false;
      if (tempRectRef.current) {
        tempRectRef.current.set({ selectable: true });
        canvas.setActiveObject(tempRectRef.current);
      }
      setIsDrawing(false);
      canvas.defaultCursor = "default";
      canvas.renderAll();
    };

    canvas.on("mouse:down", startDrawing);
    canvas.on("mouse:move", drawing);
    canvas.on("mouse:up", endDrawing);

    return () => {
      canvas.off("mouse:down", startDrawing);
      canvas.off("mouse:move", drawing);
      canvas.off("mouse:up", endDrawing);
    };
  }, [isDrawing, canvas, drawingShape, brushColor, brushWidth]);

  const handleTool = (shape) => {
    if (canvas) {
      setDrawingShape(shape);
      canvas.defaultCursor = "crosshair";
      setIsDrawing(true);
      canvas.isDrawingMode = false;
    }
  };

  const handlePencil = () => {
    setDrawingShape("Pencil");
    setIsDrawing(true);
  };

  const handleEraser = () => {
    setDrawingShape("Eraser");
    setIsDrawing(true);
  };

  const handleCursor = () => {
    if (canvas) {
      setDrawingShape(null);
      setIsDrawing(false);
      canvas.defaultCursor = "default";
      canvas.isDrawingMode = false;
      canvas.freeDrawingBrush = null;
    }
  };

  const handleClearCanvas = () => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = "white";
      canvas.renderAll();
    }
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setBrushColor(newColor);

    if (
      canvas?.isDrawingMode &&
      canvas.freeDrawingBrush &&
      drawingShape === "Pencil"
    ) {
      canvas.freeDrawingBrush.color = newColor;
    }

    if (selectedObject) {
      if (selectedObject.type === "line") {
        selectedObject.set("stroke", newColor);
      } else if (
        selectedObject.type === "text" ||
        selectedObject.type === "i-text"
      ) {
        selectedObject.set("fill", newColor);
      } else {
        selectedObject.set("fill", newColor);
      }

      canvas.renderAll();
    }
  };

  const handleBrushWidthChange = (e) => {
    const width = parseInt(e.target.value);
    setBrushWidth(width);

    if (canvas?.isDrawingMode && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = width;
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="border-black w-[1000px] h-[600px] flex items-center justify-center bg-white">
        <canvas id="canvas" ref={canvasRef}></canvas>
      </div>

      <div className="mt-4 w-[1000px] flex justify-center">
        <div className="flex items-center gap-6 bg-white shadow-md border border-gray-300 rounded-xl px-6 py-3">
          {/* {isBrushColor && (
            <>
              <label className="font-semibold text-gray-700">Color:</label>
              <input
                type="color"
                value={brushColor}
                onChange={handleColorChange}
                className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
              />
            </>
          )} */}

          {isBrush && (
            <>
              <label className="font-semibold text-gray-700">Width:</label>
              <input
                type="range"
                min="1"
                max="50"
                value={brushWidth}
                onChange={handleBrushWidthChange}
                className="w-40 accent-amber-500"
              />
              <span className="font-medium text-sm text-gray-600">
                {brushWidth}px
              </span>
            </>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Editor
          canvas={canvas}
          addRectangle={() => handleTool("Rect")}
          addFrame={() => handleTool("Frame")}
          addText={() => handleTool("Text")}
          addCircle={() => handleTool("Circle")}
          addTriangle={() => handleTool("Triangle")}
          addStar={() => handleTool("Star")}
          addLine={() => handleTool("Line")}
          handleColorChange={handleColorChange}
          handlePencil={handlePencil}
          handleCursor={handleCursor}
          clearCanvas={handleClearCanvas}
          handleEraser={handleEraser}
          handleBrushWidthChange={handleBrushWidthChange}
        />
      </div>

      {/* <button className="bg-amber-500 fixed right-0" onClick={handleEraser}>
        Erase
      </button> */}
    </div>
  );
};

export default Index1;
