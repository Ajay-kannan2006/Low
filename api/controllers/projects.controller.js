const Project = require("../models/project");
const User = require("../models/Register");

const createProject = async (req, res) => {
    const userId = req.userId;
    const { title } = req.body;

    try {
        const projectDoc = new Project({
            title: title,
            projectData: {},
            projectImg: '',
            lastUpdated: Date.now(),
            isFavourite:false,
        });
        await User.findByIdAndUpdate(userId,
            { $push: { projects: projectDoc._id } },
            { new: true },
        )
        await projectDoc.save();
        res.status(200).json({ projectDoc });
    } catch (err) {
        res.status(404).json({ error: "not able to store canvas state" });
    }
};

const getProject = async (req, res) => {
    const { project_id } = req.params;
    if (!project_id) {
        res.status(400).json({});
    }
    try {
        const projectDoc = await Project.findById(project_id);
        if (!projectDoc) {
            res.status(404).json({ error: 'No Project Found' });
        }
        res.status(200).json({ projectDoc });
    }
    catch (err) {
        res.status(400).json({ error: "Error in retriving the project" });
    }
};

const deleteProject = async (req, res) => {
    const { projectID } = req.params;
    const userID = req.userId;
    if (!projectID) {
        res.status(400).json({ error: "Could not find the Project" });
    }
    try {
        const projectDoc = await Project.findByIdAndDelete(projectID);
        await User.findOneAndUpdate({ _id: userID }, {
            $pull: { projects: projectID }
        });
        console.log(projectDoc);
        res.status(200).json({ message: "Deleted The Project Successfully" });
    } catch (error) {
        res.json(400).json({ error });
    }
}


const getProjectState = async (req, res) => {
    const { projectID } = req.params;
    
    if (!projectID) {
        res.status(400).json({ error: "Project Not Found" });
    }
    try {
        const projectDoc = await Project.findById(projectID);
        console.log("Sent the Project properly");
        
        res.status(200).json({ data: projectDoc.projectData });
    } catch (error) {
        res.status(400).json({ error });
    }
}


const saveProjectState = async (req, res) => {
    const { projectID, data,imageURL } = req.body;
    try {
        const projectDoc = await Project.findByIdAndUpdate(
            projectID,
            {
                $set: {
                    projectData: data,
                    projectImg:imageURL,
                }
                
            }
        );
        res.status(200).json({"success":"success"});
    }
    catch (err) {
        res.status(400).json({ error: 'Error in Saving the project' })
    }
};

const toggleFavourite = async (req, res) => {
    const { projectID } = req.params;
    const { isFavourite } = req.body;
    if (!projectID) {
        res.status(400).json({ error: "Project Not Found" });
    }
    try {
        const projectDoc=await Project.findByIdAndUpdate(projectID, {
            $set: {
                isFavourite: isFavourite
            }
        });
        res.status(200).json({projectDoc});
    } catch (error) {
        res.status(400).json({ error });
    }
};

const allProjects = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        res.status(400).json({ error: 'Log in First' });
    }
    try {
        const projectDatas = await User.findOne({ _id: userId }).populate({
            path: 'projects',
            model:'Project',
        }).exec();
        console.log(projectDatas);
        
        res.status(200).json({ projects:projectDatas.projects});
    } catch (err) {
        res.status(400).json({ error:err});
    }
}

module.exports = { createProject, getProject, saveProjectState,getProjectState ,allProjects,deleteProject,toggleFavourite};