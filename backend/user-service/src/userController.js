const userModel = require("./userModel");

const createUser = async (req, res) => {
    const user = req.body;
    try {
        const newUser = new userModel(user);
        await newUser.save();
        return res.json({
            status: 201,
            message: "Create user account successfully",
            data: newUser,
        });
    } catch(error) {
        return res.status(500).json({
            status: 500,
            message: "Mongoose error when trying to create a new user",
            errorDetails: error.message
        });
    }
}

const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findById(userId).lean();
        if(!user) {
            return res.json({
                status: 404,
                message: "User not found",
            });
        }
        return res.json({
            status: 200,
            message: "Retrieve user account successfully",
            data: user
        });
    } catch(error) {
        return res.status(500).json({
            status: 500,
            message: "Mongoose error when trying to retrieve user account",
            errorDetails: error.message
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().lean();
        return res.json({
            status: 200,
            message: "Fetch the list of users successfully",
            data: users,
        });
    } catch(error) {
        return res.status(500).json({
            status: 500,
            message: "Mongoose error when trying to retrieve the list of users",
            errorDetails: error.message
        });
    }
}

const authUser = async (req, res) => {
    const email = req.query.email;
    try {
        const user = await userModel.findOne({ email: email }).lean();
        if(!user) {
            return res.json({
                status: 404,
                message: "User not found",
            });
        }
        return res.json({
            status: 200,
            message: "Retrieve user account successfully",
            data: user
        });
    } catch(error) {
        return res.status(500).json({
            status: 500,
            message: "Mongoose error when trying to retrieve user account",
            errorDetails: error.message
        });
    }
}

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    authUser,
}