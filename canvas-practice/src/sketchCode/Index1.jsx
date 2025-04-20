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
  const [brushWidth, setBrushWidth] = useState(2);
  const [selectedObject, setSelectedObject] = useState(null);

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

    // Prevent objects from moving outside the canvas
    initCanvas.on("object:moving", (e) => {
      const obj = e.target;
      const canvasWidth = initCanvas.getWidth();
      const canvasHeight = initCanvas.getHeight();

      obj.setCoords();

      const boundingRect = obj.getBoundingRect();

      if (boundingRect.left < 0) {
        obj.left = 0;
      }
      if (boundingRect.top < 0) {
        obj.top = 0;
      }
      if (boundingRect.left + boundingRect.width > canvasWidth) {
        obj.left = canvasWidth - boundingRect.width;
      }
      if (boundingRect.top + boundingRect.height > canvasHeight) {
        obj.top = canvasHeight - boundingRect.height;
      }
    });

    // Object selection
    initCanvas.on("selection:created", (e) => {
      setSelectedObject(e.selected[0]);
    });

    initCanvas.on("selection:updated", (e) => {
      setSelectedObject(e.selected[0]);
    });

    initCanvas.on("selection:cleared", () => {
      setSelectedObject(null);
    });

    // Handle delete key
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

    let isDragging = false;

    const startDrawing = (e) => {
      if (drawingShape === "Pencil") return;

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
          const points = [pointer.x, pointer.y, pointer.x, pointer.y];
          tempRectRef.current = new Line(points, {
            stroke: "#000000",
            strokeWidth: 2,
            selectable: false,
            evented: false,
          });
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
    if (canvas) {
      setDrawingShape("Pencil");
      setIsDrawing(true);
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.width = brushWidth;
      canvas.freeDrawingBrush.color = brushColor;
      canvas.defaultCursor = "cell";
    }
  };

  const handleClearCanvas = () => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = "white";
      canvas.renderAll();
    }
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

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setBrushColor(newColor);

    // Update pencil brush color
    if (canvas?.isDrawingMode && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = newColor;
    }

    // Change color of selected object
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

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="border-black w-[1000px] h-[600px] flex items-center justify-center bg-white">
        <canvas id="canvas" ref={canvasRef}></canvas>
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
        />
      </div>
    </div>
  );
};

export default Index1;
