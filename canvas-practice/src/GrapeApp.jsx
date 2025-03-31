import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import gjsPresetWebpage from "grapesjs-plugin-forms";
import basicBlock from "grapesjs-blocks-basic";
import formPlugin from "grapesjs-plugin-forms";
import "./App.css";
import { addToolbarButton } from "./saveToComponentsList";
import Cookies from "js-cookie";
import html2canvas from 'html2canvas';
import { useLocation } from "react-router-dom";
import {
  addHeaderTagProperty,
  addButtonProperty,
  addInputProperty,
  addLabelProperty,
} from "./properties";

function GrapeApp() {
  const [editor, setEditor] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    model: null,
    type: "",
  });
  const location = useLocation();
  const projectDetails = location.state;
  const projectID = projectDetails["_id"];
  const projectEndpoint = `http://localhost:8080/api/project/save-project/${projectID}`;

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      height: "100vh",
      width: "100%",
      fromElement: false,
      storageManager: {
        type: "remote",
        stepsBeforeSave: 1,
        autosave: true,
        options: {
          remote: {
            urlLoad: projectEndpoint,
            urlStore: projectEndpoint,
            fetchOptions: (opts) =>
              opts.method === "POST" ? { method: "PATCH" } : {},
            onStore: async(data) => {
              const imageURL =await  getSnapShot();
              console.log(imageURL);
              
              return { data, imageURL, projectID };
            },
            onLoad: (result) => result.data,
          },
        },
      },
      plugins: [gjsPresetWebpage, basicBlock, formPlugin],
      pluginsOpts: {
        "grapesjs-preset-webpage": { flexGrid: true },
        "grapesjs-blocks-basic": { flexGrid: true },
        "grapesjs-plugin-forms": { flexGrid: true },
      },
      open: false,
    });
    addToolbarButton(editor);
    async function getSnapShot() {
      const iframe = editor.Canvas.getFrameEl();
      if (!iframe) {
        console.log("Canvas not loaded");
        return null;
      }

      const canvasDocument =
        iframe.contentDocument || iframe.contentWindow.document;
      const canvas = await html2canvas(canvasDocument.body, {
        useCORS: true,
        scale:4,
        width: window.innerWidth*0.7,
        height: window.innerHeight*0.7, // High resolution
      });
      return canvas.toDataURL("image/png");
    }
    editor.BlockManager.add("custom-button", {
      label: "Button",
      category: "Basic",
      content: {
        tagName: "button",
        attributes: { type: "button" },
        content: "Click Me",
      },
      open: false,
    });

    editor.BlockManager.add("custom-text", {
      label: "Text",
      category: "Basic",
      content: {
        tagName: "p",
        content: "This is a paragraph.",
      },
    });

    editor.BlockManager.add("custom-image", {
      label: "Image",
      category: "Basic",
      content: {
        tagName: "img",
        attributes: { src: "https://via.placeholder.com/150", alt: "Image" },
      },
    });

    editor.BlockManager.add("custom-div", {
      label: "Div",
      category: "Containers",
      content: {
        tagName: "div",
        attributes: { class: "container" },
        content: "Div Container",
      },
    });

    editor.BlockManager.add("custom-table", {
      label: "Table",
      category: "Containers",
      content: {
        tagName: "table",
        content: (
          <tr>
            <td>Row 1</td>
            <td>Row 2</td>
          </tr>
        ),
      },
    });

    editor.BlockManager.add("custom-list", {
      label: "List",
      category: "Containers",
      content: {
        tagName: "ul",
        content: "<li>Item 1</li><li>Item 2</li>",
      },
    });

    editor.StyleManager.addSector("custom-property", {
      name: "Custom Properties", // This is your new category name
      open: false, // Whether the category should be expanded by default
    });

    editor.StyleManager.addProperty("custom-property", {
      name: "type",
      label: "Type",
      property: "type",
      type: "text", // You can also use 'color', 'select', 'number', etc.
    });

    ["h1", "h2", "h3", "h4", "h5", "h6"].forEach((tag) => {
      editor.BlockManager.add(`custom-${tag}`, {
        label: tag.toUpperCase(),
        category: "Typography",
        content: {
          tagName: tag,
          content: `This is a ${tag.toUpperCase()} heading`,
        },
      });
    });

    // editor.BlockManager.add("custom-para", {
    //     label: renderToString(
    //       <div className="text-[#b9a5a6] mt-[10px] mr-[3px] text-3xl font-bold">
    //         <FontAwesomeIcon icon={faParagraph} />
    //       </div>
    //     ),
    //     category: "Typography",
    //     content: {
    //       type: "text",
    //       tagName: "p",
    //       components: "It is a paragraph",
    //       attributes: { style: "margin-top: 0px;" },
    //     },
    //   });

    editor.on("load", () => {
      editor.BlockManager.getCategories().forEach((category) =>
        category.set("open", false)
      );
    });

    editor.on("component:selected", (element) => {
      const type = element.attributes.attributes.type;

      const codeData = element.view.el;
      // console.log(codeData);

      const tagName = element.tagName;
      console.log(tagName);

      if (tagName == "input") {
        // console.log("hello");
        addInputProperty(editor);
      } else if (tagName == "button") {
        addButtonProperty(editor);
      } else if (tagName == "label") {
        addLabelProperty(editor);
      } else if (
        tagName == "h1" ||
        tagName == "h2" ||
        tagName == "h3" ||
        tagName == "h4" ||
        tagName == "h5" ||
        tagName == "h6"
      ) {
        addHeaderTagProperty(editor);
      }
    });

    setEditor(editor);
  }, []);

  useEffect(() => {
    window.addEventListener("pagehide", function () {
      console.log("Page is being hidden. Perform your operation here.");
    });
  });

  return (
    <div className="App">
      <div id="editor"></div>
    </div>
  );
}

export default GrapeApp;
