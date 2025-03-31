const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    time: {
        type: Date,
        default: Date.now
    },
    isFavorite:{
        type:Boolean,
        default:false
    }
});

const allProject = mongoose.model("allprojects", featureSchema)
const recents = mongoose.model("recents", featureSchema)
const Favorite = mongoose.model("recents", featureSchema)

module.exports = mongoose.model("allprojects", featureSchema);
