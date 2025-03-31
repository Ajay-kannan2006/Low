const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    projectData: {
        type: Object,
        required:true,
    },
    projectImg: {
        type: String,
        
    },
    lastUpdated: {
        type: Date,
        required:true,
    },
    isFavourite:Boolean
})

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;