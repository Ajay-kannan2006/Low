export function addToolbarButton(editor) {
    editor.on('component:selected', (component) => {
        let toolbar = component.get('toolbar') || [];

        // Check if the button already exists to avoid duplicates
        const buttonExists = toolbar.some(btn => btn.command === 'save-to-blocks');
        if (!buttonExists) {
            toolbar.push({
                attributes: { class: 'fa fa-save', title: 'Save Component' }, // Save icon
                command: 'save-to-blocks',
            });

            component.set({ toolbar });
        }
    });

    // Define the command to save the component
    editor.Commands.add('save-to-blocks', {
        run(editor) {
            const selected = editor.getSelected();
            if (!selected) {
                alert("No component selected!");
                return;
            } 

            let compType = selected.get('tagName').toLowerCase();
            let blockManager = editor.BlockManager.getAll();

            // Check if the component type already exists
            let existingBlock = blockManager.filter(block => block.id.startsWith(compType));
            if (existingBlock.length > 0) {
                compType = `${compType}-${existingBlock.length + 1}`;
            }

            // ✅ Get the full HTML (including all nested children)
            const componentHTML = selected.toHTML(); 

            // ✅ Extract applied CSS styles
            const componentCSS = editor.CssComposer.getAll().map(rule => rule.toCSS()).join("\n");

            // ✅ Save to BlockManager (for dragging later)
            editor.BlockManager.add(compType, {
                label: `Saved ${selected.get('tagName')} (${compType})`,
                content: `<style>${componentCSS}</style>${componentHTML}`, // Save full HTML + CSS
                category: 'Saved Components',
            });

            alert(`Component "${compType}" (with all nested children) saved successfully!`);
        }
    });
}

