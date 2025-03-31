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

// this are properties
import { addHeaderTagProperty, addButtonProperty, addInputProperty, addLabelProperty, addAnchorTagProperty, addCheckBoxProperty, addRadioProperty, addTextAreaProperty, addSelectProperty, addImageProperty, addTableProperty, addTableRowProperty, addUlProperty, addOlProperty, addDlProperty } from "./properties"

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
            onStore: async (data) => {
              const imageURL = await getSnapShot();
              console.log(imageURL);

              return { data, imageURL, projectID };
            },
            onLoad: (result) => result.data,
          },
        },
      },
      plugins: [gjsPresetWebpage, basicBlock, formPlugin],
      pluginsOpts: {

        basicBlock: {
          blocks: ["image", "video", "column", "container"],
        },

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



    editor.BlockManager.add("my-div", {
      label: "Div",
      category: "Containers",
      content: () => {
        const uniqueClass = `my-container-${Date.now()}`;
        return {
          tagName: "div",
          classes: [uniqueClass],
          components: [],
          draggable: true,
          droppable: true,
          stylable: true,
          style: {
            display: "flex",
            "flex-direction": "column",
            "align-items": "stretch",
            "justify-content": "flex-start",
            "min-height": "8vh",
            border: "1px solid #ccc",
            padding: "5px"
          },
        };
      }
    });

    editor.BlockManager.add("custom-table", {
      label: "button",
      category: "Containers",
      content: {
        tagName: 'button',
        type:"text",
        stylable: true,
        draggable: true,
        droppable: true,
        style: {
          display: "inline-block", 
          width: "60px",
          height: "30px",
          cursor: "pointer",
        },
      }
    });
    
    

    editor.BlockManager.add("custom-table", {
      label: "Table",
      category: "Containers",
      content: {
        tagName: 'table',
        stylable: true,
        components: [],
        draggable: true,
        droppable: true,
        style:{
          display:"flex",
          "flex-direction": "column",
          "align-items": "stretch",
          "justify-content": "flex-start",
          "min-height": "8vh",
          border: "1px solid #ccc",
          padding: "5px"
        }
      }
    });




    editor.BlockManager.add("custom-ul", {
      label: "ul",
      category: "Containers",
      content: {
        tagName: 'ul',
        stylable: true,
        components: [],
        draggable: true,
        droppable: true,
        style:{
          display:"flex",
          margin:"0px",
          "flex-direction": "column",
          "align-items": "stretch",
          "justify-content": "flex-start",
          "min-height": "8vh",
          border: "1px solid #ccc",
          padding: "5px"
        }
      }
    });

    editor.BlockManager.add("custom-ol", {
      label: "ol",
      category: "Containers",
      content: {
        tagName: 'ol',
        stylable: true,
        components: [],
        draggable: true,
        droppable: true,
        style:{
          display:"flex",
          margin:"0px",
          "flex-direction": "column",
          "align-items": "stretch",
          "justify-content": "flex-start",
          "min-height": "8vh",
          border: "1px solid #ccc",
          padding: "5px"
        }
      }
    });

    editor.BlockManager.add("custom-dl", {
      label: "dl",
      category: "Containers",
      content: {
        tagName: 'dl',
        stylable: true,
        components: [],
        draggable: true,
        droppable: true,
        style:{
          display:"flex",
          margin:"0px",
          "flex-direction": "column",
          "align-items": "stretch",
          "justify-content": "flex-start",
          "min-height": "8vh",
          border: "1px solid #ccc",
          padding: "5px"
        }
      }
    });


    editor.StyleManager.addSector("custom-property", {
      name: "Custom Properties",
      open: false,
    });

    ["h1", "h2", "h3", "h4", "h5", "h6"].forEach((tag) => {
      editor.BlockManager.add(`custom-${tag}`, {
        label: `
          <div class="text-[#b9a5a6] text-3xl font-bold uppercase hover:text-[#DB242EFF]">
            ${tag}
          </div>
        `,
        category: "Typography",
        content: {
          type: "text",
          tagName: `${tag}`,
          stylable: true,
          components: `it is header ${tag}`,
          attributes: { 
            class: [`custom-${tag}`], 
            style: "margin-top: 0px;"
          },
        },
      });
    });



    editor.BlockManager.add("custom-para", {
      label: renderToString(
        <div className="text-[#b9a5a6] mt-[10px] mr-[3px] text-3xl font-bold">
          <FontAwesomeIcon icon={faParagraph} />
        </div>
      ),
      category: "Typography",
      content: {
        type: "text",
        tagName: "p",
        components: "It is a paragraph",
        attributes: { style: "margin-top: 0px;" },
      },
    });

    editor.BlockManager.add("custom-span", {
      label: renderToString(
        <div className="text-[#b9a5a6] mt-[10px] mr-[3px] text-3xl font-bold">
          span
        </div>
      ),
      category: "Typography",
      content: {
        type: "text",
        tagName: "span",
        components: "It is a span",
      },
    });
  
  

    editor.on("load", () => {
      // editor.BlockManager.remove("Form");
      // editor.DomComponents.removeType("checkbox");
      // console.log("Checkbox component removed.");
      editor.BlockManager.getCategories().forEach((category) =>
        category.set("open", false)
      );

const removeBlockByTitle = (editor, blockTitle) => {
    const allBlocks = editor.BlockManager.getAll();

    if (!allBlocks || allBlocks.length === 0) {
        console.error("No blocks");
        return;
    }

    allBlocks.forEach((block) => {
        if (block && block.get("label") === blockTitle) {
            editor.BlockManager.remove(block.get("id"));
            // console.log(Removed block: ${blockTitle});
          }
      });
    };

    // Usage
    removeBlockByTitle(editor, "Form");
    removeBlockByTitle(editor, "Quote")
    removeBlockByTitle(editor, "Link Block")
    removeBlockByTitle(editor, "Button")

    });
  

    editor.on("component:selected", (element) => {

      const type = element.attributes.attributes.type;
      // console.log(type);
      

      const codeData = element.view.el;
      // console.log(codeData.getAttribute("data-gjs-type"));

      const tagName = element.tagName;
      const title = element.title;
      
      console.log(tagName);

      if (tagName == "input") {   
        const typeAttr = element.getAttributes().type;
        // addInputProperty(editor);
        if(typeAttr == "checkbox"){
          addCheckBoxProperty(editor);
        }
        else if(typeAttr == "radio"){
          addRadioProperty(editor);
        }
        else{
          addInputProperty(editor);
        }
      } else if (tagName == "button") {
        addButtonProperty(editor);
      } else if (tagName == "label") {
        addLabelProperty(editor);
      } else if(tagName == "h1" || tagName == "h2" || tagName == "h3" || tagName == "h4" || tagName == "h5" || tagName == "h6") {
        
        addHeaderTagProperty(editor);
      } else if(tagName == "a"){
        addAnchorTagProperty(editor)
      } else if(tagName == "textarea"){
        addTextAreaProperty(editor)
      } else if(tagName == "select"){
        addSelectProperty(editor);
      } else if(tagName == "img"){
        addImageProperty(editor);
      } else if(tagName == "table"){
        addTableProperty(editor);
        console.log("hello");
      } else if(tagName == "tr"){
        addTableRowProperty(editor);
      } else if(tagName  == "ul"){
        addUlProperty(editor);
      } else if(tagName == "ol"){
        addOlProperty(editor);
      } else if(tagName == "dl"){
        addDlProperty(editor);
      }
    });

    


    //getting the html
    const html = editor.getHtml();
    // console.log(html);

    const css = editor.getCss();

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
