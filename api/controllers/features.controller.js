const User = require("../models/Register");

const allProject = async (req, res) => {
    const userId = req.userId;
    try {
        const projects = await User.findOne({ _id: userId }).populate('designs').exec();
        console.log(projects);

        res.status(200).json({
            message: "ok",
            data: projects.designs
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { allProject };
