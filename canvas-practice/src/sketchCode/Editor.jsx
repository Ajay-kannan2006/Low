import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToolBar from "./ToolBar";
import axios from "axios";

const Editor = ({
  canvas,
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
}) => {
  const navigate = useNavigate();
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCodeWindow, setShowCodeWindow] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    setImageDataUrl(dataUrl);
    setLoading(true);
    setGeneratedCode("");
    setShowCodeWindow(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/generate-code", {
        image: dataUrl,
      });

      setGeneratedCode(response.data.component);
      console.log(generatedCode);
    } catch (error) {
      console.error("Error sending image to backend:", error);
      setGeneratedCode("// Error generating code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <>
      {/* Back button */}
      <div
        className="bg-gradient-to-r from-teal-400 to-blue-500 w-[80px] h-[40px] cursor-pointer fixed top-4 left-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center"
        onClick={() => navigate("/works/all-projects")}
      >
        <button className="text-white font-semibold text-lg">Back</button>
      </div>

      {/* Generate button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          className="group bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-transform duration-300 ease-in-out flex items-center gap-2"
          onClick={handleGenerate}
        >
          {loading ? "Generating..." : "Generate"}
          <span className="transition-all duration-500 ease-in-out group-hover:rotate-12 group-hover:scale-115 group-hover:translate-x-2">
            ✨
          </span>
        </button>
      </div>

      {/* Clear Canvas Button */}
      <div className="fixed top-20 right-4 z-50">
        <button
          className="group bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-transform duration-300 ease-in-out flex items-center gap-2"
          onClick={() => {
            if (canvas) {
              canvas.clear();
              canvas.setBackgroundColor(
                "#ffffff",
                canvas.renderAll.bind(canvas)
              );
            }
          }}
        >
          Clear
          <span className="transition-all duration-500 ease-in-out group-hover:rotate-12 group-hover:scale-115 group-hover:translate-x-1">
            🧹
          </span>
        </button>
      </div>

      {/* Toolbar */}
      <div>
        <ToolBar
          addRectangle={addRectangle}
          addCircle={addCircle}
          addLine={addLine}
          addStar={addStar}
          addTriangle={addTriangle}
          addFrame={addFrame}
          addText={addText}
          handlePencil={handlePencil}
          handleCursor={handleCursor}
          handleColorChange={handleColorChange}
        />
      </div>

      {/* Generated Code Output */}
      {showCodeWindow && (
        <div className="fixed bottom-0 left-0 right-0 max-h-[300px] overflow-y-auto bg-white p-4 shadow-lg border-t border-gray-300 z-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">
              Generated React + Tailwind Code
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
              >
                {copied ? "Copied!" : "Copy"}
              </button>

              <button
                onClick={() => setShowCodeWindow(false)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
            {generatedCode}
          </pre>
        </div>
      )}
    </>
  );
};

export default Editor;
