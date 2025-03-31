// it is for header
export const addHeaderTagProperty = (editor) => {
    if (!editor) {
      console.error("Editor instance is required!");
      return;
    }
  
    const sector = editor.StyleManager.getSector("custom-property");
  
    if (sector && sector.get("properties")) {
      const properties = sector.get("properties").map((prop) => prop.get("id"));
      properties.forEach((id) => {
        editor.StyleManager.removeProperty("custom-property", id);
      });
    }
  
    // editor.StyleManager.addProperty("custom-property", {
    //   id: "headerClassProperty",
    //   name: "Class",
    //   label: "class",
    //   property: "class",
    //   type: "text",
    //   defaults: "",
    //   onChange: (value) => {
    //     const selectedComponent = editor.getSelected();
    //     if (selectedComponent) {
    //       selectedComponent.addAttributes({ class: value.value });
    //     }
    //   },
    // });
  
  //   editor.StyleManager.addProperty("custom-property", {
  //     id: "inputIdProperty",
  //     name: "ID",
  //     label: "ID",
  //     property: "id",
  //     type: "text",
  //     defaults: "",
  //     onChange: (value) => {
  //       const selectedComponent = editor.getSelected();
  //       if (selectedComponent) {
  //         selectedComponent.addAttributes({ id: value.value });
  //       }
  //     },
  //   });
  };

  

  // it is for anchor
  export const addAnchorTagProperty = (editor) => {
    const sector = editor.StyleManager.getSector("custom-property");

    if (sector) {
      const properties = sector.get("properties").map((prop) => prop.get("id"));
      properties.forEach((id) =>
        editor.StyleManager.removeProperty("custom-property", id)
      );
    }

    
  //it is for href tag
  editor.StyleManager.addProperty("custom-property", {
    id: "anchorHyperReferenceProperty",
    name: "hyper reference",
    label: "a",
    property: "a",
    type: "text",
    default: "",
    onChange: (value) => {
      const selectedComponent = editor.getSelected();
      if (selectedComponent) {
        selectedComponent.addAttributes({ href: value.value });
      }
    },
  });

  //it is for class for anchor
  // editor.StyleManager.addProperty("custom-property", {
  //   id: "anchorClassProperty",
  //   name: "className",
  //   label: "class",
  //   property: "class",
  //   type: "text",
  //   defaults: "",
  //   onChange: (value) => {
  //     const selectedComponent = editor.getSelected();
  //     if (selectedComponent) {
  //       selectedComponent.addAttributes({ class: value.value });
  //     }
  //   },
  // });

    editor.Css.addRules(`
      .gjs-sm-input-holder select {
        width: 100%;
        max-width: 100%;
      }
    `);
  };


  
  // it is for input
  export const addInputProperty = (editor) => {
    const sector = editor.StyleManager.getSector("custom-property");

    if (sector) {
      // removing the previous before adding new one
      const properties = sector.get("properties").map((prop) => prop.get("id"));
      // console.log(properties);
      properties.forEach((id) =>
        editor.StyleManager.removeProperty("custom-property", id)
      );
    }


    // it is for id
    // editor.StyleManager.addProperty("custom-property", {
    //   id: "inputIdProperty",
    //   name: "ID",
    //   label: "ID",
    //   property: "id",
    //   type: "text",
    //   defaults: "",
    //   onChange: (value) => {
    //     const selectedComponent = editor.getSelected();
    //     if (selectedComponent) {
    //       selectedComponent.addAttributes({ id: value.value });

    //       const cssRule = editor.CssComposer.getAll();
    //       // console.log(cssRule);
          
    //     }
    //   },
    // });

    // it is for class name
    // editor.StyleManager.addProperty("custom-property", {
    //   id: "inputClassProperty",
    //   name: "className",
    //   label: "class",
    //   property: "class",
    //   type: "text",
    //   placeholder:"enter",
    //   defaults: "",
    //   onChange: (value) => {
    //     const selectedComponent = editor.getSelected();
    //     if (selectedComponent) {
    //       selectedComponent.addAttributes({ class: value.value });

    //       const cssRule = editor.CssComposer.getAll();
    //       console.log(cssRule);
          
    //     }
    //   },
    // });

    // it is for value
    editor.StyleManager.addProperty("custom-property", {
      id: "inputValueProperty",
      name: "Value",
      label: "hello",
      property: "value",
      type: "select",
      options: [
        { value: "text", name: "Text" },
        { value: "email", name: "Email" },
        { value: "password", name: "Password" },
        { value: "number", name: "Number" },
        { value: "tel", name: "Telephone" },
        { value: "url", name: "URL" },
      ],
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ value: value.value });
          console.log("nantha", value.value);
        }
      },
    });

    // it is for type
    editor.StyleManager.addProperty("custom-property", {
      id: "inputTypeProperty",
      name: "Type",
      label: "Type",
      property: "type",
      type: "select",
      options: [
        { value: "text", name: "Text" },
        { value: "email", name: "Email" },
        { value: "password", name: "Password" },
        { value: "number", name: "Number" },
        { value: "tel", name: "Telephone" },
        { value: "url", name: "URL" },
      ],
      onChange: (value) => {
        const typeAttr = selectedComponent.getAttributes().type;
        console.log(typeAttr);
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ type: value.value });
        }
      },
    });

    // it is for required
    editor.StyleManager.addProperty("custom-property", {
      id: "inputRequiredProperty",
      name: "required",
      label: "Required",
      property: "required",
      type: "select",
      options: [
        { id: "true", label: "True" },
        { id: "false", label: "False" },
      ],
      default: "false",
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          if (value.value === "true") {
            // console.log("true");
            selectedComponent.addAttributes({ required: true });
          } else {
            // console.log("false");
            selectedComponent.removeAttributes("required");
          }
        }
      },
    });
  };


  // it is for button
  export const addButtonProperty = (editor) => {
    const sector = editor.StyleManager.getSector("custom-property");

    if (sector) {
      const properties = sector.get("properties").map((prop) => prop.get("id"));
      properties.forEach((id) =>
        editor.StyleManager.removeProperty("custom-property", id)
      );
    }
    

    // it is for id
    // editor.StyleManager.addProperty("custom-property", {
    //   id: "buttonIdProperty",
    //   name: "ID",
    //   label: "ID",
    //   property: "id",
    //   type: "text",
    //   defaults: "",
    //   onChange: (value) => {
    //     const selectedComponent = editor.getSelected();
    //     if (selectedComponent) {
    //       selectedComponent.addAttributes({ id: value.value });

    //       const cssRule = editor.CssComposer.getAll();
    //       console.log(cssRule);
          
    //     }
    //   },
    // });


    // Add property for button type
    editor.StyleManager.addProperty("custom-property", {
      id: "buttonTypeProperty",
      name: "Type",
      label: "Type",
      property: "type",
      type: "select",
      options: [
        { value: "button", name: "Button" },
        { value: "submit", name: "Submit" },
        { value: "reset", name: "Reset" },
      ],
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ type: value.value });
        }
      },
    });

    editor.Css.addRules(`
        .gjs-sm-input-holder select {
          width: 100%;
          max-width: 100%;
        }
      `);
  };


  // it is for check property
  export const addCheckBoxProperty = (editor)=>{
    const sector = editor.StyleManager.getSector("custom-property");

    if (sector) {
      // removing the previous before adding new one
      const properties = sector.get("properties").map((prop) => prop.get("id"));
      console.log(properties);
      properties.forEach((id) =>
        editor.StyleManager.removeProperty("custom-property", id)
      );
    }


    // it is for id
    // editor.StyleManager.addProperty("custom-property", {
    //   id: "checkBoxIdProperty",
    //   name: "ID",
    //   label: "ID",
    //   property: "id",
    //   type: "text",
    //   defaults: "",
    //   onChange: (value) => {
    //     const selectedComponent = editor.getSelected();
    //     if (selectedComponent) {
    //       selectedComponent.addAttributes({ id: value.value });

    //       const cssRule = editor.CssComposer.getAll();
    //       console.log(cssRule);
          
    //     }
    //   },
    // });

    // it is for class name
    // editor.StyleManager.addProperty("custom-property", {
    //   id: "checkboxClassProperty",
    //   name: "className",
    //   label: "class",
    //   property: "class",
    //   type: "text",
    //   placeholder:"enter",
    //   defaults: "",
    //   onChange: (value) => {
    //     const selectedComponent = editor.getSelected();
    //     if (selectedComponent) {
    //       selectedComponent.addAttributes({ class: value.value });

    //       const cssRule = editor.CssComposer.getAll();
    //       console.log(cssRule);
          
    //     }
    //   },
    // });

    editor.Css.addRules(`
      .gjs-sm-input-holder select {
        width: 100%;
        max-width: 100%;
      }
    `);
  }

  export const addRadioProperty = (editor)=>{
    const sector = editor.StyleManager.getSector("custom-property");

    if (sector) {
      // removing the previous before adding new one
      const properties = sector.get("properties").map((prop) => prop.get("id"));
      console.log(properties);
      properties.forEach((id) =>
        editor.StyleManager.removeProperty("custom-property", id)
      );
    }


    // it is for id
    // editor.StyleManager.addProperty("custom-property", {
    //   id: "radioIdProperty",
    //   name: "ID",
    //   label: "ID",
    //   property: "id",
    //   type: "text",
    //   defaults: "",
    //   onChange: (value) => {
    //     const selectedComponent = editor.getSelected();
    //     if (selectedComponent) {
    //       selectedComponent.addAttributes({ id: value.value });

    //       const cssRule = editor.CssComposer.getAll();
    //       console.log(cssRule);
          
    //     }
    //   },
    // });

    // it is for class name
    // editor.StyleManager.addProperty("custom-property", {
    //   id: "radioClassProperty",
    //   name: "className",
    //   label: "class",
    //   property: "class",
    //   type: "text",
    //   placeholder:"enter",
    //   defaults: "",
    //   onChange: (value) => {
    //     const selectedComponent = editor.getSelected();
    //     if (selectedComponent) {
    //       selectedComponent.addAttributes({ class: value.value });

    //       const cssRule = editor.CssComposer.getAll();
    //       console.log(cssRule);
          
    //     }
    //   },
    // });

    editor.Css.addRules(`
      .gjs-sm-input-holder select {
        width: 100%;
        max-width: 100%;
      }
    `);
  }


  // it is for text area
  export const addTextAreaProperty = (editor)=>{
    const sector = editor.StyleManager.getSector("custom-property");

    if (sector) {
      const properties = sector.get("properties").map((prop) => prop.get("id"));
      console.log(properties);
      properties.forEach((id) =>
        editor.StyleManager.removeProperty("custom-property", id)
      );
    }


    // it is for id
    // editor.StyleManager.addProperty("custom-property", {
    //   id: "textareaIdProperty",
    //   name: "ID",
    //   label: "ID",
    //   property: "id",
    //   type: "text",
    //   defaults: "",
    //   onChange: (value) => {
    //     const selectedComponent = editor.getSelected();
    //     if (selectedComponent) {
    //       selectedComponent.addAttributes({ id: value.value });

    //       const cssRule = editor.CssComposer.getAll();
    //       console.log(cssRule);
          
    //     }
    //   },
    // });

    // it is for name
    editor.StyleManager.addProperty("custom-property", {
      id: "textareaNameProperty",
      name: "name",
      label: "name",
      property: "name",
      type: "text",
      placeholder:"enter",
      defaults: "",
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ name: value.value });

          const cssRule = editor.CssComposer.getAll();
          console.log(cssRule);
          
        }
      },
    });

    // it is for rows
    editor.StyleManager.addProperty("custom-property", {
      id: "textareaRowsProperty",
      name: "Rows",
      label: "Rows",
      property: "Rows",
      type: "text",
      defaults: "",
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ rows: value.value });

          const cssRule = editor.CssComposer.getAll();
          console.log(cssRule);
          
        }
      },
    });

    // it is for cols
    editor.StyleManager.addProperty("custom-property", {
      id: "textareaColsProperty",
      name: "cols",
      label: "cols",
      property: "cols",
      type: "text",
      defaults: "",
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ cols: value.value });

          const cssRule = editor.CssComposer.getAll();
          console.log(cssRule);
          
        }
      },
    });

    // it is for placeHolder
    editor.StyleManager.addProperty("custom-property", {
      id: "inputPlaceHolderProperty",
      name: "placeholder",
      label: "placeholder",
      property: "placeholder",
      type: "text",
      defaults: "",
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ placeholder: value.value });

          const cssRule = editor.CssComposer.getAll();
          console.log(cssRule);
          
        }
      },
    });

    editor.Css.addRules(`
      .gjs-sm-input-holder select {
        width: 100%;
        max-width: 100%;
      }
    `);
  }


  // it is for label
  export const addLabelProperty = (editor) => {
    const sector = editor.StyleManager.getSector("custom-property");

    if (sector) {
      const properties = sector.get("properties").map((prop) => prop.get("id"));
      properties.forEach((id) =>
        editor.StyleManager.removeProperty("custom-property", id)
      );
    }

     // it is for label id
    editor.StyleManager.addProperty("custom-property", {
      id: "labelIdProperty",
      name: "ID",
      label: "id",
      property: "id",
      type: "text",
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ id: value.value });

          const cssRule = editor.CssComposer.getAll();
          console.log(cssRule);
          
        }
      },
    });

    // it is for in label
    editor.StyleManager.addProperty("custom-property", {
      id: "labelForProperty",
      name: "For",
      label: "For",
      property: "For",
      type: "text",
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ for: value.value });

          const cssRule = editor.CssComposer.getAll();
          console.log(cssRule);
          
        }
      },
    });

    editor.Css.addRules(`
      .gjs-sm-input-holder select {
        width: 100%;
        max-width: 100%;
      }
    `);
  };


  // it is for select
  export const addSelectProperty = (editor) => {
    const sector = editor.StyleManager.getSector("custom-property");

    if (sector) {
      const properties = sector.get("properties").map((prop) => prop.get("id"));
      properties.forEach((id) =>
        editor.StyleManager.removeProperty("custom-property", id)
      );
    }

     // it is for label id
    editor.StyleManager.addProperty("custom-property", {
      id: "selectIdProperty",
      name: "ID",
      label: "id",
      property: "id",
      type: "text",
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ id: value.value });

          const cssRule = editor.CssComposer.getAll();
          console.log(cssRule);
          
        }
      },
    });

    // it is for name
    editor.StyleManager.addProperty("custom-property", {
      id: "selectNameProperty",
      name: "name",
      label: "name",
      property: "name",
      type: "text",
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ name: value.value });

          const cssRule = editor.CssComposer.getAll();
          console.log(cssRule);
          
        }
      },
    });


    editor.Css.addRules(`
      .gjs-sm-input-holder select {
        width: 100%;
        max-width: 100%;
      }
    `);
  };


    // // it is for div
    // export const addDivProperty = (editor) => {
    //   const sector = editor.StyleManager.getSector("custom-property");
  
    //   if (sector) {
    //     const properties = sector.get("properties").map((prop) => prop.get("id"));
    //     properties.forEach((id) =>
    //       editor.StyleManager.removeProperty("custom-property", id)
    //     );
    //   }
  
    //    // it is for div id
    //   editor.StyleManager.addProperty("custom-property", {
    //     id: "divIdProperty",
    //     name: "ID",
    //     label: "id",
    //     property: "id",
    //     type: "text",
    //     onChange: (value) => {
    //       const selectedComponent = editor.getSelected();
    //       if(!selectedComponent) return;

    //       const oldClasses = selectedComponent.getClasses
    //       console.log(selectedComponent.attributes.attrsOrig);

          
    //       // if (selectedComponent) {
    //       //   selectedComponent.addAttributes({ id: value.value });
  
    //       //   const cssRule = editor.CssComposer.getAll();
    //       //   console.log(cssRule);
            
    //       // }
    //     },
    //   });
  
    //   // it is for class
    //   editor.StyleManager.addProperty("custom-property", {
    //     id: "divClassProperty",
    //     name: "class",
    //     label: "class",
    //     property: "class",
    //     type: "text",
    //     onChange: (value) => {
    //       const selectedComponent = editor.getSelected();
    //       if (selectedComponent) {
    //         selectedComponent.addAttributes({ class: value.value });
  
    //         const cssRule = editor.CssComposer.getAll();
    //         console.log(cssRule);
            
    //       }
    //     },
    //   });
  
  
    //   editor.Css.addRules(`
    //     .gjs-sm-input-holder select {
    //       width: 100%;
    //       max-width: 100%;
    //     }
    //   `);
    // };
    

    // it is for image
    export const addImageProperty = (editor) => {
      const sector = editor.StyleManager.getSector("custom-property");
  
      if (sector) {
        const properties = sector.get("properties").map((prop) => prop.get("id"));
        properties.forEach((id) =>
          editor.StyleManager.removeProperty("custom-property", id)
        );
      }
  
  
      editor.Css.addRules(`
        .gjs-sm-input-holder select {
          width: 100%;
          max-width: 100%;
        }
      `);
    };

    export const addTableProperty = (editor) => {

      const sector = editor.StyleManager.getSector("custom-property");

      if (sector) {
        const properties = sector.get("properties").map((prop) => prop.get("id"));
        console.log(properties);
        properties.forEach((id) =>
          editor.StyleManager.removeProperty("custom-property", id)
        );
      }

      editor.StyleManager.addType("button", {
        create({ props }) {
          const el = document.createElement("button");
          el.innerText = props.label || "Modify Rows";
          el.style.padding = "5px 10px";
          el.style.cursor = "pointer";
          el.style.background = "#007bff";
          el.style.color = "#fff";
          el.style.border = "none";
          el.style.borderRadius = "4px";
          el.style.marginTop = "5px";
    
          el.onclick = () => {
            const selectedComponent = editor.getSelected();
            console.log(selectedComponent.tagName);
            
            
            if (selectedComponent && selectedComponent.get('tagName') === "table") {
            
              const components = selectedComponent.components();
            
              const newRow = {
                tagName: "tr",
                components: [],
                draggable: true,
                droppable: true, 
                stylable: true,
                style: {
                  display: "flex",
                  "flex-direction": "row", 
                  "align-items": "stretch",
                  "justify-content": "flex-start",
                  "min-height": "8vh",
                  border: "1px solid #ccc",
                  padding: "5px"
                },
              };
            
              components.add(newRow);
            }
            
          };
    
          return el;
        },
      });


      // Add the button inside the "custom-property" section of the Style Manager
      editor.StyleManager.addProperty("custom-property", {
        id: "trButtonProperty",
        name: "Add tr",
        label: "tr",
        property: "tr-button",
        type: "button", 
      });
    };

    export const addTableRowProperty = (editor) => {

      const sector = editor.StyleManager.getSector("custom-property");

      if (sector) {
        const properties = sector.get("properties").map((prop) => prop.get("id"));
        console.log(properties);
        properties.forEach((id) =>
          editor.StyleManager.removeProperty("custom-property", id)
        );
      }

      editor.StyleManager.addType("button", {
        create({ props }) {
          const el = document.createElement("button");
          el.innerText = props.label || "Modify Rows";
          el.style.padding = "5px 10px";
          el.style.cursor = "pointer";
          el.style.background = "#007bff";
          el.style.color = "#fff";
          el.style.border = "none";
          el.style.borderRadius = "4px";
          el.style.marginTop = "5px";
    
          el.onclick = () => {
            const selectedComponent = editor.getSelected();
            console.log(selectedComponent.tagName);
            
            
            if (selectedComponent && selectedComponent.get("tagName") === "tr") {
              const components = selectedComponent.components();
              const newCell = {
                tagName: props.property === "td-button" ? "td" : "th", // Selects type based on button property
                type: "text",
                content: props.property === "td-button" ? "Click to edit" : "Header",
                draggable: true,
                droppable: true,
                stylable: true,
                editable: true,
                style: {
                  border: "1px solid #ccc",
                  padding: "5px",
                  "min-height": "8vh",
                  "text-align": "left",
                  "background-color": props.property === "th-button" ? "#f4f4f4" : "transparent",
                  "font-weight": props.property === "th-button" ? "bold" : "normal",
                },
              };
    
              components.add(newCell);
            }
            
          };
    
          return el;
        },
      });


      editor.StyleManager.addProperty("custom-property", {
        id: "tdButtonProperty",
        name: "Add td",
        label: "Add TD",
        property: "td-button",
        type: "button",
      });
    
      // Add 'Add th' button
      editor.StyleManager.addProperty("custom-property", {
        id: "thButtonProperty",
        name: "Add th",
        label: "Add TH",
        property: "th-button",
        type: "button",
      });
    };
    

    export const addUlProperty = (editor) => {

      const sector = editor.StyleManager.getSector("custom-property");

      if (sector) {
        const properties = sector.get("properties").map((prop) => prop.get("id"));
        console.log(properties);
        properties.forEach((id) =>
          editor.StyleManager.removeProperty("custom-property", id)
        );
      }

      editor.StyleManager.addType("button", {
        create({ props }) {
          const el = document.createElement("button");
          el.innerText = props.label || "Modify Rows";
          el.style.padding = "5px 10px";
          el.style.cursor = "pointer";
          el.style.background = "#007bff";
          el.style.color = "#fff";
          el.style.border = "none";
          el.style.borderRadius = "4px";
          el.style.marginTop = "5px";
    
          el.onclick = () => {
            const selectedComponent = editor.getSelected();
            console.log(selectedComponent.tagName);
            
            
            if (selectedComponent && selectedComponent.get("tagName") === "ul") {
              const components = selectedComponent.components();
              const newCell = {
                tagName: "li", 
                type: "text",
                content: "item",
                draggable: true,
                droppable: true,
                stylable: true,
                editable: true,
                style: {
                  padding: "5px",
                  "text-align": "left",
                }
                
              };
    
              components.add(newCell);
            }
            
          };
    
          return el;
        },
      });


      editor.StyleManager.addProperty("custom-property", {
        id: "liButtonProperty",
        name: "Add List",
        label: "Add List",
        property: "li-button",
        type: "button",
      });
    
    };

    export const addOlProperty = (editor) => {

      const sector = editor.StyleManager.getSector("custom-property");

      if (sector) {
        const properties = sector.get("properties").map((prop) => prop.get("id"));
        console.log(properties);
        properties.forEach((id) =>
          editor.StyleManager.removeProperty("custom-property", id)
        );
      }

      editor.StyleManager.addType("button", {
        create({ props }) {
          const el = document.createElement("button");
          el.innerText = props.label || "Modify Rows";
          el.style.padding = "5px 10px";
          el.style.cursor = "pointer";
          el.style.background = "#007bff";
          el.style.color = "#fff";
          el.style.border = "none";
          el.style.borderRadius = "4px";
          el.style.marginTop = "5px";
    
          el.onclick = () => {
            const selectedComponent = editor.getSelected();
            console.log(selectedComponent.tagName);
            
            
            if (selectedComponent && selectedComponent.get("tagName") === "ol") {
              const components = selectedComponent.components();
              const newCell = {
                tagName: "li", 
                type: "text",
                content: "item",
                draggable: true,
                droppable: true,
                stylable: true,
                editable: true,
                style: {
                  padding: "5px",
                  "text-align": "left",
                }
                
              };
    
              components.add(newCell);
            }
            
          };
    
          return el;
        },
      });


      editor.StyleManager.addProperty("custom-property", {
        id: "liButtonProperty",
        name: "Add List",
        label: "Add List",
        property: "li-button",
        type: "button",
      });
    
    };

    export const addDlProperty = (editor) => {

      const sector = editor.StyleManager.getSector("custom-property");

      if (sector) {
        const properties = sector.get("properties").map((prop) => prop.get("id"));
        console.log(properties);
        properties.forEach((id) =>
          editor.StyleManager.removeProperty("custom-property", id)
        );
      }

      editor.StyleManager.addType("button", {
        create({ props }) {
          const el = document.createElement("button");
          el.innerText = props.label || "Modify Rows";
          el.style.padding = "5px 10px";
          el.style.cursor = "pointer";
          el.style.background = "#007bff";
          el.style.color = "#fff";
          el.style.border = "none";
          el.style.borderRadius = "4px";
          el.style.marginTop = "5px";
    
          el.onclick = () => {
            const selectedComponent = editor.getSelected();
            console.log(selectedComponent.tagName);
            
            
            if (selectedComponent && selectedComponent.get("tagName") === "dl") {
              const components = selectedComponent.components();
              const newCell = {
                tagName: props.property === "dt-button" ? "dt" : "dd", 
                type: "text",
                content: props.property === "dt-button" ? "d-title" : "d-data",
                draggable: true,
                droppable: true,
                stylable: true,
                editable: true,
                style: {
                  padding: "5px",
                  "text-align": "left",
                },
              };
    
              components.add(newCell);
            }
            
          };
    
          return el;
        },
      });


      editor.StyleManager.addProperty("custom-property", {
        id: "tdButtonProperty",
        name: "Add td",
        label: "Add TD",
        property: "dt-button",
        type: "button",
      });
    
      // Add 'Add th' button
      editor.StyleManager.addProperty("custom-property", {
        id: "thButtonProperty",
        name: "Add th",
        label: "Add TH",
        property: "dd-button",
        type: "button",
      });
    };