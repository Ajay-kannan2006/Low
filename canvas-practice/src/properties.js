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
  
    editor.StyleManager.addProperty("custom-property", {
      id: "headerClassProperty",
      name: "Class",
      label: "class",
      property: "class",
      type: "text",
      defaults: "",
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ class: value });
        }
      },
    });
  
    editor.StyleManager.addProperty("custom-property", {
      id: "inputIdProperty",
      name: "ID",
      label: "ID",
      property: "id",
      type: "text",
      defaults: "",
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ id: value });
        }
      },
    });
  };

  

  // // it is for anchor
  // export const addAnchorTagProperty = (editor) => {
  //   const sector = editor.StyleManager.getSector("custom-property");

  //   if (sector) {
  //     const properties = sector.get("properties").map((prop) => prop.get("id"));
  //     properties.forEach((id) =>
  //       editor.StyleManager.removeProperty("custom-property", id)
  //     );
  //   }

    
  // //it is for href tag
  // editor.StyleManager.addProperty("custom-property", {
  //   id: "anchorHyperReferenceProperty",
  //   name: "hyper reference",
  //   label: "a",
  //   property: "a",
  //   type: "text",
  //   default: "",
  //   onChange: (value) => {
  //     const selectedComponent = editor.getSelected();
  //     if (selectedComponent) {
  //       selectedComponent.addAttributes({ href: value.value });
  //     }
  //   },
  // });

  // //it is for class for anchor
  // editor.StyleManager.addProperty("custom-property", {
  //   id: "anchorClassProperty",
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

  //   editor.Css.addRules(`
  //     .gjs-sm-input-holder select {
  //       width: 100%;
  //       max-width: 100%;
  //     }
  //   `);
  // };


  
  // it is for input
  export const addInputProperty = (editor) => {
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
    editor.StyleManager.addProperty("custom-property", {
      id: "inputIdProperty",
      name: "ID",
      label: "ID",
      property: "id",
      type: "text",
      defaults: "",
      onChange: (value) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          selectedComponent.addAttributes({ id: value.value });

          const cssRule = editor.CssComposer.getAll();
          console.log(cssRule);
          
        }
      },
    });

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

  // it is for label
  export const addLabelProperty = (editor) => {
    const sector = editor.StyleManager.getSector("custom-property");

    if (sector) {
      const properties = sector.get("properties").map((prop) => prop.get("id"));
      properties.forEach((id) =>
        editor.StyleManager.removeProperty("custom-property", id)
      );
    }

    // Add property for button type
    editor.StyleManager.addProperty("custom-property", {
      id: "buttonLabelProperty",
      name: "Label",
      label: "Label",
      property: "Label",
      type: "select",
      options: [
        { value: "for", name: "For" },
        { value: "title", name: "Title" },
        { value: "id", name: "Id" },
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