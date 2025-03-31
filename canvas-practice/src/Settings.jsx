import { useState, useEffect } from 'react';

const Settings = ({ canvas }) => {
    var [selectedObject, setSelectedObject] = useState(null);
    var [height, setHeight] = useState("");
    var [width, setWidth] = useState("");
    var [diameter, setDiameter] = useState("");
    var [color, setColor] = useState("");
    useEffect(() => {
        if (canvas) {
            // console.log(canvas);
            canvas.on("selection:created", (event) => {
                handleObjectSelection(event.selected[0]);
            })
            canvas.on("selection:updated", (event) => {
                handleObjectSelection(event.selected[0]);
            })
            canvas.on("selection:cleared", (event) => {
                setSelectedObject(null);
                clearSettings();
            })
            canvas.on("object:modified", (event) => {
                handleObjectSelection(event.target);
            })
            canvas.on("object:scaling", (event) => {
                handleObjectSelection(event.target);
            })
        }
    }, [canvas]);

    const clearSettings = () => {
        setColor("");
        setDiameter("");
        setHeight("");
        setWidth("");
    }
    const handleObjectSelection = (object) => {
        if (!object) return;
        setSelectedObject(object);
        if (object.type == 'rect') {
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleY));
            setColor(object.fill);
            setDiameter("");
        } else if (object == 'circle') {
            setDiameter(Math.round(object.radius * 2 * object.scaleX));
            setColor(object.fill);
            setWidth("");
            setHeight("");
        }
    }

    const handleHeightChange = (e) => {
        console.log(canvas);
        let intValue = 0;
        if (e.target.value == "") {
            setHeight(0);
            // const intValue = 0;
        } else {
            const value = e.target.value.replace(/,/g, "");
            intValue = parseInt(value, 10);
            setHeight(intValue);
        }

        if (selectedObject && selectedObject.type === 'rect' && intValue >= 0) {
            selectedObject.set({ height: intValue / selectedObject.scaleY });
            canvas.renderAll();
        }
    }

    const handleWidthChange = (e) => {
        console.log(canvas);
        let intValue = 0;
        if (e.target.value == "") {
            setWidth(0);
        }
        else {
            const value = e.target.value.replace(/,/g, "");
            intValue = parseInt(value, 10);
            setWidth(intValue);
        }


        if (selectedObject && selectedObject.type === 'rect' && intValue >= 0) {
            selectedObject.set({ width: intValue / selectedObject.scaleY });
            canvas.renderAll();
        }
    }
    const handleColorChange = (e) => {
        const value = e.target.value;
        console.log(canvas);

        setColor(value);

        if (selectedObject && selectedObject.type === 'rect') {
            selectedObject.set({ fill: value });
            canvas.renderAll();
        }
    }
    const handleDiameterChange = (e) => {
        console.log(canvas);
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);

        setDiameter(intValue);

        if (selectedObject && selectedObject.type === 'circle' && intValue >= 0) {
            selectedObject.set({ radius: value / 2 / selectedObject.scaleX });
            canvas.renderAll();
        }
    }

    return (

        <div className="settings darkmode">
            {
                selectedObject && selectedObject.type === 'rect' &&
                (
                    <>
                        <form >

                        </form>
                        <input type="text" value={height} onChange={handleHeightChange} placeholder='height' />
                        <input type="text" value={width} onChange={(handleWidthChange)} placeholder='width' />
                        <input type="color" value={color} onChange={handleColorChange} placeholder='colro' />
                    </>

                )
            }
        </div>
    );
}

export default Settings;
