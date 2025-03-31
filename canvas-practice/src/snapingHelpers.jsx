const snappingDistance = 10;

const SnapingHelpers = ({ canvas, obj, guidelines, setGuidelines }) => {
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;

    const left = obj.left;
    const top = obj.top;
    const right = obj.left + obj.width * obj.scaleX;
    const bottom = obj.top + obj.height * obj.scaleY;

    const centreX = left + (obj.width * obj.scaleX) / 2;
    const centreY = top + (obj.height * obj.scaleY) / 2;

    let newGuidelines = [];
    clearGuidelines(canvas);

    let snapped = false;
    if (Math.abs(left) < snappingDistance) {
        obj.set({ left: 0 });
        if (!guidelineExists(canvas, "vertical-left")) {
            const line = createVerticalGuideline(canvas, 0, "vertical-left");
            newGuidelines.push(line);
            canvas.add(line);
        }
    }

    // if(Math.abs(right-))

}
export default SnapingHelpers;