const checkUser = require('../middleware/authMiddleware');
const Canvas = require('../models/canvas');
const User = require('../models/Register');

const saveCanvas = async (req, res) => {
    try {
        const { canvasObject, canvasImg } = req.body;
        const { id } = req.params;
        const userId = req.userId;

        if (!canvasObject || !id || !userId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const updatedCanvas = await Canvas.findByIdAndUpdate(
            id,
            { $set: { canvas_object: canvasObject, last_updated: Date.now(), img_url: canvasImg } },
            { new: true }
        );

        if (!updatedCanvas) {
            return res.status(404).json({ error: "Canvas not found" });
        }

        res.status(200).json({
            message: "Canvas updated successfully",
            canvas: updatedCanvas,
        });
    } catch (error) {
        console.error("Error saving canvas:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const getCanvas = async (req, res) => {
    console.log("hello");

    const { id } = req.params;
    console.log("id", id);

    if (!id) {
        return res.status(200).json({});
    }
    try {
        const canvasDoc = await Canvas.findById(id);
        if (!canvasDoc) {
            return res.status(404).json({ error: "Canvas state not found" });
        }
        console.log(canvasDoc);

        res.status(200).json({ canvasDoc });
    } catch (error) {
        res.status(500).send("Error retrieving canvas state");
    }
};


const createCanvas = async (req, res) => {
    const userId = req.userId;
    const { title } = req.body;
    try {

        const canvasDoc = new Canvas({
            canvas_object: "",
            title: title,
            last_update: Date.now(),
            img_url: '',
        });


        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { designs: canvasDoc._id } },
            { new: true }
        );
        await canvasDoc.save();
        res.status(200).json({ canvasDoc });
    } catch (err) {
        res.status(404).json({ error: "not able to store canvas state" });
    }

}




module.exports = { saveCanvas, getCanvas, createCanvas };