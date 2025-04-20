import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import basicBlock from "grapesjs-blocks-basic";
import formPlugin from "grapesjs-plugin-forms";
import "./App.css";
import { addToolbarButton } from "./saveToComponentsList";
import Cookies from "js-cookie";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faParagraph } from "@fortawesome/free-solid-svg-icons";
// this are properties
import {
  addHeaderTagProperty,
  addInputProperty,
  addLabelProperty,
  addAnchorTagProperty,
  addCheckBoxProperty,
  addRadioProperty,
  addTextAreaProperty,
  addSelectProperty,
  addImageProperty,
  addTableProperty,
  addTableRowProperty,
  addUlProperty,
  addOlProperty,
  addDlProperty,
} from "./properties";

function GrapeApp() {
  const [editor, setEditor] = useState(null);
  const [reactComponent, setReactComponent] = useState("");

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
  const projectEndpoint = `https://low-0msq.onrender.com/api/project/save-project/${projectID}`;

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
        "grapesjs-preset-webpage": { flexGrid: true },
        "grapesjs-blocks-basic": {},
        "grapesjs-plugin-forms": {},
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
        scale: 4,
        width: window.innerWidth * 0.7,
        height: window.innerHeight * 0.7, // High resolution
      });
      return canvas.toDataURL("image/png");
    }

    editor.on("load", () => {
      editor.Panels.removeButton("options", "gjs-open-import-template");
      // editor.Commands.remove("gjs-open-import-template");

      const iframeDoc = editor.Canvas.getDocument();
      const head = iframeDoc.head || iframeDoc.getElementsByTagName("head")[0];

      const tailwindLink = document.createElement("link");
      tailwindLink.rel = "stylesheet";
      tailwindLink.href =
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
      head.appendChild(tailwindLink);

      editor.Panels.addButton("options", [
        {
          id: "import-code-btn",
          className: "fa fa-upload",
          command: "open-import-modal",
          attributes: { title: "Import React JSX" },
        },
      ]);

      editor.Commands.add("open-import-modal", {
        run(editor) {
          const modal = editor.Modal;
          const content = `
        <div style="padding: 10px;">
          <textarea id="import-area" style="width:100%; height: 250px;" placeholder="Paste your React + Tailwind JSX here"></textarea>
          <button id="import-confirm" style="margin-top:10px;">Import Code</button>
        </div>
      `;
          modal.setTitle("Import JSX Code");
          modal.setContent(content);
          modal.open();

          setTimeout(() => {
            const confirmBtn = document.getElementById("import-confirm");
            confirmBtn.addEventListener("click", () => {
              const rawCode = document.getElementById("import-area").value;

              const jsxToHtml = rawCode
                .replace(/className=/g, "class=")
                .replace(/<Fragment>|<\/Fragment>/g, "")
                .replace(/<>|<\/>/g, "")
                .replace(/\{[^}]+\}/g, "")
                .replace(/<\/?[\w\d]+\s*\/>/g, (m) => {
                  const tag = m.match(/<\/?([\w\d]+)/)[1];
                  return `<${tag}></${tag}>`;
                });

              editor.addComponents(jsxToHtml);
              modal.close();
            });
          }, 0);
        },
      });
    });

    editor.BlockManager.add("custom-image-block", {
      label: "Images",
      category: "Basic",
      content: {
        type: "my-image",
      },
      media: `
        <div style="
          background-color: #bfa5a7;
          border-radius: 8px;
          width: 75px;
          height: 60px;
          display: flex;
          margin-top: 10px;
          align-items: center;
          justify-content: center;
        ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="36" style="fill: #463a3c;">
            <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM8.5 13l2.5 3.01L14.5 12l4.5 6H5l3.5-5ZM7 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"/>
          </svg>
        </div>
        <style>
          @media (max-width: 768px) {
            div {
              width: 60px;
              height: 40px;
            }
            svg {
              width: 28px;
              height: 32px;
            }
          }
          @media (max-width: 480px) {
            div {
              width: 50px;
              height: 35px;
            }
            svg {
              width: 24px;
              height: 28px;
            }
          }
        </style>
      `,
    });

    editor.DomComponents.addType("my-image", {
      model: {
        defaults: {
          tagName: "img",
          attributes: {
            src: "/images/placeholder.png",
            style: "width: 100px; height: 100px; cursor: pointer;",
          },
          droppable: false,
          resizable: true,
        },
      },

      view: {
        events: {
          dblclick: "openFilePicker",
        },

        openFilePicker() {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.style.display = "none";

          input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            // Add loading overlay
            const wrapper = this.el.parentNode;
            const { offsetWidth, offsetHeight } = this.el;

            const loading = document.createElement("div");
            loading.innerText = "Uploading...";
            loading.style.cssText = `
              position: absolute;
              top: 0;
              left: 0;
              width: ${offsetWidth}px;
              height: ${offsetHeight}px;
              background: rgba(0, 0, 0, 0.5);
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              z-index: 10;
              pointer-events: none;
            `;

            wrapper.style.position = "relative";
            wrapper.appendChild(loading);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "No_Code_Low_Code_Images"); // 🔁 Replace with your upload preset
            formData.append("cloud_name", "drndpok2m"); // 🔁 Replace with your cloud name

            try {
              const res = await fetch(
                "https://api.cloudinary.com/v1_1/drndpok2m/image/upload",
                {
                  method: "POST",
                  body: formData,
                }
              );

              const data = await res.json();

              if (data.secure_url) {
                this.model.set("attributes", {
                  ...this.model.get("attributes"),
                  src: data.secure_url,
                });
              } else {
                alert("Upload failed");
              }
            } catch (err) {
              console.error("Cloudinary upload error:", err);
              alert("Something went wrong uploading the image");
            } finally {
              wrapper.removeChild(loading);
            }
          };

          document.body.appendChild(input);
          input.click();
          document.body.removeChild(input);
        },
      },
    });

    addToolbarButton(editor);

    editor.Panels.getButton("options", "export-template").set({
      command: () => {
        // Display your existing React component in the modal
        editor.Modal.setTitle("React Component")
          .setContent(
            <pre style="white-space: pre-wrap;">${reactComponent}</pre>
          )
          .open();
      },
    });

    editor.Panels.addButton("options", [
      {
        id: "sketch-code-btn",
        className: "fa fa-bolt",
        command: function () {
          window.location.href = "/canvas";
        },
        attributes: { title: "Open Sketch Canvas" },
      },
    ]);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    editor.BlockManager.add("custom-div", {
      label: "Div",
      category: "Containers",
      content: {
        tagName: "div",
        stylable: true,
        components: [],
        draggable: true,
        droppable: true,
        style: {
          display: "flex",
          "flex-direction": "column",
          "align-items": "stretch",
          "justify-content": "flex-start",
          "min-height": "8vh",
          border: "1px solid #ccc",
          padding: "5px",
        },
      },
    });

    editor.BlockManager.add("custom-button", {
      label: "button",
      category: "Containers",
      content: {
        tagName: "button",
        stylable: true,
        draggable: true,
        droppable: false,
        components: [
          {
            type: "text",
            content: "Button", // default button text
            editable: true,
          },
        ],
        style: {
          display: "inline-block",
          width: "80px",
          height: "35px",
          cursor: "pointer",
        },
      },
    });

    editor.BlockManager.add("custom-table", {
      label: "Table",
      category: "Containers",
      content: {
        tagName: "table",
        stylable: true,
        components: [],
        draggable: true,
        droppable: true,
        style: {
          display: "flex",
          "flex-direction": "column",
          "align-items": "stretch",
          "justify-content": "flex-start",
          "min-height": "8vh",
          border: "1px solid #ccc",
          padding: "5px",
        },
      },
    });

    editor.BlockManager.add("custom-ul", {
      label: "ul",
      category: "Containers",
      content: {
        tagName: "ul",
        stylable: true,
        components: [],
        draggable: true,
        droppable: true,
        style: {
          display: "flex",
          margin: "0px",
          "flex-direction": "column",
          "align-items": "stretch",
          "justify-content": "flex-start",
          "min-height": "8vh",
          border: "1px solid #ccc",
          padding: "5px",
        },
      },
    });

    editor.BlockManager.add("custom-ol", {
      label: "ol",
      category: "Containers",
      content: {
        tagName: "ol",
        stylable: true,
        components: [],
        draggable: true,
        droppable: true,
        style: {
          display: "flex",
          margin: "0px",
          "flex-direction": "column",
          "align-items": "stretch",
          "justify-content": "flex-start",
          "min-height": "8vh",
          border: "1px solid #ccc",
          padding: "5px",
        },
      },
    });

    editor.BlockManager.add("custom-dl", {
      label: "dl",
      category: "Containers",
      content: {
        tagName: "dl",
        stylable: true,
        components: [],
        draggable: true,
        droppable: true,
        style: {
          display: "flex",
          margin: "0px",
          "flex-direction": "column",
          "align-items": "stretch",
          "justify-content": "flex-start",
          "min-height": "8vh",
          border: "1px solid #ccc",
          padding: "5px",
        },
      },
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
            style: "margin-top: 0px;",
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
          }
        });
      };

      // Usage
      removeBlockByTitle(editor, "Form");
      removeBlockByTitle(editor, "Quote");
      removeBlockByTitle(editor, "Link Block");
      removeBlockByTitle(editor, "Button");
      removeBlockByTitle(editor, "Video");
      removeBlockByTitle(editor, "Map");
      removeBlockByTitle(editor, "Image");
    });

    editor.on("component:selected", (element) => {
      const type = element.attributes.attributes.type;

      const codeData = element.view.el;

      const tagName = element.tagName;

      const title = element.title;

      if (tagName == "input") {
        const typeAttr = element.getAttributes().type;
        // addInputProperty(editor);
        if (typeAttr == "checkbox") {
          addCheckBoxProperty(editor);
        } else if (typeAttr == "radio") {
          addRadioProperty(editor);
        } else {
          addInputProperty(editor);
        }
      } else if (tagName == "button") {
        console.log("button");

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
      } else if (tagName == "a") {
        addAnchorTagProperty(editor);
      } else if (tagName == "textarea") {
        addTextAreaProperty(editor);
      } else if (tagName == "select") {
        addSelectProperty(editor);
      } else if (tagName == "img") {
        addImageProperty(editor);
      } else if (tagName == "table") {
        addTableProperty(editor);
      } else if (tagName == "tr") {
        addTableRowProperty(editor);
      } else if (tagName == "ul") {
        addUlProperty(editor);
      } else if (tagName == "ol") {
        addOlProperty(editor);
      } else if (tagName == "dl") {
        addDlProperty(editor);
      }
    });

    editor.Panels.getButton("options", "export-template").set({
      command: async () => {
        if (!editor) {
          console.error("Editor is not initialized.");
          return;
        }

        const html = editor.getHtml();
        const css = editor.getCss();

        // Show loader modal
        editor.Modal.setTitle("Converting...")
          .setContent(
            `
            <div style="text-align: center; padding: 20px;">
              <div class="loader"></div>
              <p style="margin-top: 15px; font-size: 16px; color: #ffffff;">Please wait while we convert your template...</p>
            </div>
          `
          )
          .open();

        try {
          const response = await fetch("https://low-1.onrender.com/convert", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ html, css }),
          });

          if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
          }

          const data = await response.json();

          let reactComponent = data.component || "";

          if (!reactComponent.trim()) {
            console.error("Received an empty React component!");
            reactComponent = "// Error: React component is empty!";
          }

          const escaped = escapeHTML(reactComponent);

          editor.Modal.setTitle("React Component")
            .setContent(
              `
              <div class="top-buttons">
                <button class="copy-btn" onclick="copyReactCode()">Copy</button>
                <button class="download-btn" onclick="downloadReactCode()">Download</button>
              </div>
              <div class="code-container">
                <pre id="react-code-block">${escaped}</pre>
              </div>
            `
            )
            .open();
        } catch (error) {
          console.error("Conversion failed:", error);
          editor.Modal.setTitle("Error")
            .setContent(
              <p style="color: red; padding: 20px;">
                Failed to convert the component. Please try again later.
              </p>
            )
            .open();
        }
      },
    });

    function escapeHTML(str) {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // Add styles
    const style = document.createElement("style");
    style.innerHTML = `
      .loader {
        border: 6px solid #f3f3f3;
        border-top: 6px solid #3498db;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
      }
    
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    
      .top-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-bottom: 10px;
      }
    
      .copy-btn,
      .download-btn {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 6px 12px;
        font-size: 12px;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.3s ease;
      }
    
      .copy-btn:hover,
      .download-btn:hover {
        background-color: #2980b9;
      }
    
      .code-container {
        background-color: #1e1e1e;
        padding: 0 20px;
        border-radius: 10px;
        max-height: 500px;
        overflow: auto;
        font-family: 'Fira Code', monospace;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        color: #dcdcdc;
        white-space: pre;
        overflow-x: auto;
      }
    
      .code-container pre {
        margin: 0;
        font-size: 14px;
        white-space: pre-wrap;
        line-height: 1.4;
      }
    `;
    document.head.appendChild(style);

    // Copy functionality
    window.copyReactCode = async function () {
      const codeBlock = document.getElementById("react-code-block");
      if (!codeBlock) return;

      try {
        await navigator.clipboard.writeText(codeBlock.innerText);
        const btn = document.querySelector(".copy-btn");
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = "Copy"), 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    };

    // Download functionality
    window.downloadReactCode = function () {
      const codeBlock = document.getElementById("react-code-block");
      if (!codeBlock) return;

      const blob = new Blob([codeBlock.innerText], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Component.jsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    //getting the html
    const html = editor.getHtml();

    const css = editor.getCss();

    setEditor(editor);
  }, []);

  // const convertToReact = async () => {
  //   if (!editor) {
  //     console.error("Editor is not initialized.");
  //     return;
  //   }

  //   const html = editor.getHtml();
  //   const css = editor.getCss();

  //   try {
  //     const response = await fetch("http://localhost:5000/convert", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ html, css }),
  //     });

  //     const data = await response.json();

  //     if (data.error) {
  //       console.error("Conversion error:", data.error);
  //     } else {
  //       setReactComponent(data.component);
  //     }
  //   } catch (error) {
  //     console.error("Conversion failed:", error);
  //   }
  // };

  return (
    <div className="App">
      <div id="editor"></div>
    </div>
  );
}

export default GrapeApp;
