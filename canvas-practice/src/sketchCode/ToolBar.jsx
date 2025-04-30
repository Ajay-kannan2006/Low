import React from "react";
import {
  CircleIcon,
  TriangleIcon,
  StackIcon,
  SquareIcon,
  FrameIcon,
  TextIcon,
  Pencil1Icon,
  CursorArrowIcon,
  ChevronDownIcon,
  SlashIcon,
  StarIcon,
  EraserIcon, // Add this import for the eraser icon
} from "sebikostudio-icons";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { ColorLens } from "@mui/icons-material";

const ToolBar = ({
  addRectangle,
  addFrame,
  addText,
  handlePencil,
  handleCursor,
  handleColorChange,
  addTriangle,
  addLine,
  addCircle,
  addStar,
  handleEraser, // Add handleEraser to props
}) => {
  const [shapesToggle, setShapesToggles] = useState(false);
  const [isColor, isSetColor] = useState(true);
  const [shape, setShape] = useState("Rectangle");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [tool, setTool] = useState("Cursor");

  const handleToggle = () => {
    setShapesToggles(!shapesToggle);
    console.log(shapesToggle);
  };

  const handleShapes = (shape) => {
    if (shape == "Rectangle") {
      addRectangle();
      console.log("rectangle");
      isSetColor(true);
      setShape("Rectangle");
      setTool("Shapes");
    } else if (shape == "Line") {
      addLine();
      console.log("line");
      isSetColor(true);
      setShape("Line");
      setTool("Shapes");
    } else if (shape == "Circle") {
      addCircle();
      console.log("Circle");
      isSetColor(true);
      setShape("Circle");
      setTool("Shapes");
    } else if (shape == "Triangle") {
      addTriangle();
      console.log("Triangle");
      isSetColor(true);
      setShape("Triangle");
      setTool("Shapes");
    } else if (shape == "Star") {
      addStar();
      console.log("Star");
      isSetColor(true);
      setShape("Star");
      setTool("Shapes");
    }

    setShapesToggles(!shapesToggle);
  };

  const handleTools = (tool) => {
    if (tool === "Cursor") {
      handleCursor();
      setTool("Cursor");
    } else if (tool === "Shapes") {
      console.log(tool + shape);

      if (shape === "Rectangle") addRectangle();
      else if (shape === "Line") addLine();
      else if (shape === "Circle") addCircle();
      else if (shape === "Triangle") addTriangle();
      else if (shape === "Star") addStar();
      setTool("Shapes");
    } else if (tool === "Line") {
      addLine();
      setTool("Line");
    } else if (tool === "Circle") {
      addCircle();
      setTool("Circle");
    } else if (tool == "Triangle") {
      addTriangle();
      setTool("Triangle");
    } else if (tool == "Star") {
      addStar();
      setTool("Star");
    } else if (tool === "Frame") {
      addFrame();
      setTool("Frame");
    } else if (tool === "Pencil") {
      handlePencil();
      setTool("Pencil");
    } else if (tool === "Text") {
      addText();
      setTool("Text");
    } else if (tool === "Color") {
      setShowColorPicker(!showColorPicker);
    } else if (tool === "Eraser") {
      handleEraser(); // Call the handleEraser function
      setTool("Eraser");
    }
  };

  const handleColorSelection = (e) => {
    const newColor = e.target.value;
    setCurrentColor(newColor);
    handleColorChange(e);
    setShowColorPicker(false);
  };

  return (
    <>
      <div className="flex items-center justify-center select-none">
        {showColorPicker && (
          <div className="fixed left-[720px] bottom-[65px] w-[190px] h-[60px] bg-[#2c2c2c] rounded-[15px] text-[#ffffff] flex items-center justify-center p-4">
            <input
              type="color"
              value={currentColor}
              onChange={handleColorSelection}
              className="w-full h-10 cursor-pointer"
            />
          </div>
        )}
        {shapesToggle && (
          <div className="fixed left-[720px] bottom-[65px] w-[190px] h-[160px] bg-[#2c2c2c] rounded-[15px] text-[#ffffff] flex flex-col items-center text-xs p-2">
            <div
              className="flex items-center gap-3 hover:bg-[#0c8ce9] w-full h-full hover:rounded-[8px] px-3 py-1"
              onClick={() => handleShapes("Rectangle")}
              style={
                shape === "Rectangle" && isColor
                  ? { backgroundColor: "#0c8ce9", borderRadius: "8px" }
                  : {}
              }
            >
              <SquareIcon className="w-3" />
              <p className="my-0">Rectangle</p>
            </div>
            <div
              className="flex items-center gap-3 hover:bg-[#0c8ce9] w-full h-full hover:rounded-[8px] px-2 py-1"
              onClick={() => handleShapes("Line")}
              style={
                shape === "Line" && isColor
                  ? { backgroundColor: "#0c8ce9", borderRadius: "8px" }
                  : {}
              }
            >
              <SlashIcon className="w-4.5 mx-1" />
              <p className="my-0 mx-0">Line</p>
            </div>
            <div
              className="flex items-center gap-3 hover:bg-[#0c8ce9] w-full h-full hover:rounded-[8px] px-3 py-1"
              onClick={() => handleShapes("Circle")}
              style={
                shape === "Circle" && isColor
                  ? { backgroundColor: "#0c8ce9", borderRadius: "8px" }
                  : {}
              }
            >
              <CircleIcon className="w-3" />
              <p className="my-0">Ellipse</p>
            </div>
            <div
              className="flex items-center gap-3 hover:bg-[#0c8ce9] w-full h-full hover:rounded-[8px] px-3 py-1"
              onClick={() => handleShapes("Triangle")}
              style={
                shape === "Triangle" && isColor
                  ? { backgroundColor: "#0c8ce9", borderRadius: "8px" }
                  : {}
              }
            >
              <TriangleIcon className="w-3" />
              <p className="my-0">Polygon</p>
            </div>
            <div
              className="flex items-center gap-3 hover:bg-[#0c8ce9] w-full h-full hover:rounded-[8px] px-3 py-1"
              onClick={() => handleShapes("Star")}
              style={
                shape === "Star" && isColor
                  ? { backgroundColor: "#0c8ce9", borderRadius: "8px" }
                  : {}
              }
            >
              <StarIcon className="w-3" />
              <p className="my-0">Star</p>
            </div>
          </div>
        )}

        <div className="fixed bottom-1.5 bg-[#2c2c2c] rounded-[9px] px-4 py-2 flex gap-4">
          <CursorArrowIcon
            tabIndex="0"
            className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none "
            onClick={() => handleTools("Cursor")}
            style={tool === "Cursor" ? { backgroundColor: "#0c8ce9" } : {}}
          />

          {tool === "Shapes" ? (
            <>
              {shape === "Rectangle" && isColor && (
                <div className="flex items-center justify-between">
                  <SquareIcon
                    tabIndex="0"
                    className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none"
                    onClick={() => handleTools("Shapes")}
                    style={
                      tool === "Shapes" || shape === "Rectangle"
                        ? { backgroundColor: "#0c8ce9" }
                        : {}
                    }
                  />
                  <div
                    className="text-[#ffffff] flex items-center justify-center p-1 w-5 h-9 rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:scale-105 focus:bg-[#383838] focus:outline-none cursor-pointer"
                    onClick={handleToggle}
                  >
                    <ChevronDownIcon className="text-[#ffffff] font-bold text-2xl" />
                  </div>
                </div>
              )}

              {shape === "Line" && isColor && (
                <div className="flex items-center justify-between">
                  <SlashIcon
                    tabIndex="0"
                    className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none"
                    onClick={() => handleTools("Shapes")}
                    style={
                      tool === "Shapes" || shape === "Line"
                        ? { backgroundColor: "#0c8ce9" }
                        : {}
                    }
                  />
                  <div
                    className="text-[#ffffff] flex items-center justify-center p-1 w-5 h-9 rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:scale-105 focus:bg-[#383838] focus:outline-none cursor-pointer"
                    onClick={handleToggle}
                  >
                    <ChevronDownIcon className="text-[#ffffff] font-bold text-2xl" />
                  </div>
                </div>
              )}

              {shape === "Circle" && isColor && (
                <div className="flex items-center justify-between">
                  <CircleIcon
                    tabIndex="0"
                    className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none"
                    onClick={() => handleTools("Shapes")}
                    style={
                      tool === "Shapes" || shape === "Circle"
                        ? { backgroundColor: "#0c8ce9" }
                        : {}
                    }
                  />
                  <div
                    className="text-[#ffffff] flex items-center justify-center p-1 w-5 h-9 rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:scale-105 focus:bg-[#383838] focus:outline-none cursor-pointer"
                    onClick={handleToggle}
                  >
                    <ChevronDownIcon className="text-[#ffffff] font-bold text-2xl" />
                  </div>
                </div>
              )}

              {shape === "Triangle" && isColor && (
                <div className="flex items-center justify-between">
                  <TriangleIcon
                    tabIndex="0"
                    className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none"
                    onClick={() => handleTools("Shapes")}
                    style={
                      tool === "Shapes" || shape === "Triangle"
                        ? { backgroundColor: "#0c8ce9" }
                        : {}
                    }
                  />
                  <div
                    className="text-[#ffffff] flex items-center justify-center p-1 w-5 h-9 rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:scale-105 focus:bg-[#383838] focus:outline-none cursor-pointer"
                    onClick={handleToggle}
                  >
                    <ChevronDownIcon className="text-[#ffffff] font-bold text-2xl" />
                  </div>
                </div>
              )}

              {shape === "Star" && isColor && (
                <div className="flex items-center justify-between">
                  <StarIcon
                    tabIndex="0"
                    className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none"
                    onClick={() => handleTools("Shapes")}
                    style={
                      tool === "Shapes" || shape === "Star"
                        ? { backgroundColor: "#0c8ce9" }
                        : {}
                    }
                  />
                  <div
                    className="text-[#ffffff] flex items-center justify-center p-1 w-5 h-9 rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:scale-105 focus:bg-[#383838] focus:outline-none cursor-pointer"
                    onClick={handleToggle}
                  >
                    <ChevronDownIcon className="text-[#ffffff] font-bold text-2xl" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {shape === "Rectangle" && isColor && (
                <div className="flex items-center justify-between">
                  <SquareIcon
                    tabIndex="0"
                    className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none"
                    onClick={() => handleTools("Shapes")}
                    style={
                      tool === "Shapes" || shape === ""
                        ? { backgroundColor: "#0c8ce9" }
                        : {}
                    }
                  />
                  <div
                    className="text-[#ffffff] flex items-center justify-center p-1 w-5 h-9 rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:scale-105 focus:bg-[#383838] focus:outline-none cursor-pointer"
                    onClick={handleToggle}
                  >
                    <ChevronDownIcon className="text-[#ffffff] font-bold text-2xl" />
                  </div>
                </div>
              )}
              {shape === "Line" && isColor && (
                <div className="flex items-center justify-between">
                  <SlashIcon
                    tabIndex="0"
                    className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none"
                    onClick={() => handleTools("Shapes")}
                    style={
                      tool === "Shapes" || shape === ""
                        ? { backgroundColor: "#0c8ce9" }
                        : {}
                    }
                  />
                  <div
                    className="text-[#ffffff] flex items-center justify-center p-1 w-5 h-9 rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:scale-105 focus:bg-[#383838] focus:outline-none cursor-pointer"
                    onClick={handleToggle}
                  >
                    <ChevronDownIcon className="text-[#ffffff] font-bold text-2xl" />
                  </div>
                </div>
              )}

              {shape === "Circle" && isColor && (
                <div className="flex items-center justify-between">
                  <CircleIcon
                    tabIndex="0"
                    className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none"
                    onClick={() => handleTools("Shapes")}
                    style={
                      tool === "Shapes" || shape === ""
                        ? { backgroundColor: "#0c8ce9" }
                        : {}
                    }
                  />
                  <div
                    className="text-[#ffffff] flex items-center justify-center p-1 w-5 h-9 rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:scale-105 focus:bg-[#383838] focus:outline-none cursor-pointer"
                    onClick={handleToggle}
                  >
                    <ChevronDownIcon className="text-[#ffffff] font-bold text-2xl" />
                  </div>
                </div>
              )}

              {shape === "Triangle" && isColor && (
                <div className="flex items-center justify-between">
                  <TriangleIcon
                    tabIndex="0"
                    className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none"
                    onClick={() => handleTools("Shapes")}
                    style={
                      tool === "Shapes" || shape === ""
                        ? { backgroundColor: "#0c8ce9" }
                        : {}
                    }
                  />
                  <div
                    className="text-[#ffffff] flex items-center justify-center p-1 w-5 h-9 rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:scale-105 focus:bg-[#383838] focus:outline-none cursor-pointer"
                    onClick={handleToggle}
                  >
                    <ChevronDownIcon className="text-[#ffffff] font-bold text-2xl" />
                  </div>
                </div>
              )}

              {shape === "Star" && isColor && (
                <div className="flex items-center justify-between">
                  <StarIcon
                    tabIndex="0"
                    className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none"
                    onClick={() => handleTools("Shapes")}
                    style={
                      tool === "Shapes" || shape === ""
                        ? { backgroundColor: "#0c8ce9" }
                        : {}
                    }
                  />
                  <div
                    className="text-[#ffffff] flex items-center justify-center p-1 w-5 h-9 rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:scale-105 focus:bg-[#383838] focus:outline-none cursor-pointer"
                    onClick={handleToggle}
                  >
                    <ChevronDownIcon className="text-[#ffffff] font-bold text-2xl" />
                  </div>
                </div>
              )}
            </>
          )}
          <ColorLens
            style={{ height: "36px", width: "36px" }}
            className={`text-amber-50 w-9 h-9 rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 ${
              tool === "Color" ? "bg-[#0c8ce9]" : ""
            }`}
            onClick={() => handleTools("Color")}
          />

          <Pencil1Icon
            tabIndex="0"
            className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none"
            onClick={() => handleTools("Pencil")}
            style={tool === "Pencil" ? { backgroundColor: "#0c8ce9" } : {}}
          />

          {/* Add Eraser Icon */}
          <EraserIcon
            tabIndex="0"
            className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none"
            onClick={() => handleTools("Eraser")}
            style={tool === "Eraser" ? { backgroundColor: "#0c8ce9" } : {}}
          />

          <TextIcon
            tabIndex="0"
            className="text-amber-50 w-9 h-9 text-4xl rounded-[8px] transition-all duration-200 hover:bg-[#383838] hover:rounded-[8px] hover:scale-105 cursor-pointer p-2 focus:bg-[#0c8ce9] focus:outline-none"
            onClick={() => handleTools("Text")}
            style={tool === "Text" ? { backgroundColor: "#0c8ce9" } : {}}
          />
        </div>
      </div>
    </>
  );
};

export default ToolBar;
