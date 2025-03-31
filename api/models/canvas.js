const mongoose = require('mongoose');

const canvasSchema = new mongoose.Schema({
    canvas_object: {
        type: String,
        require: true,
    },
    title: { type: String },
    last_update: {
        type: Date,
    },
    img_url: {
        type: String,
    }
});

const Canvas = mongoose.model('Canvas', canvasSchema);
module.exports = Canvas;