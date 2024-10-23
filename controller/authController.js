const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        //validation
        if (existingUser) {
            return res.status(200).send({
                message: 'User already exists',
                success: false
            });
        }
        //hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        //rest data
        const user = new userModel(req.body);
        await user.save();
        return res.status(201).send({
            message: 'User registered successfully',
            success: true,
            user,
        });
    }
    catch (error) {
        console.log(`Register Controller Error: ${error}`.bgRed.white);
        res.status(500).send({
            success: false,
            message: 'error in register api',
            error
        });
    }
};
//login call back
const loginControler = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (!existingUser) {
            return res.status(404).send({
                message: 'Invalid Credentials',
                success: false
            });
        }
        //check role
        if (existingUser.role !== req.body.role) {
            return res.status(500).send({
                message: 'role not matched',
                success: false
            });
        }
        //compare password
        const comparePassword = await bcrypt.compare(req.body.password, existingUser.password);
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials",

            });
        }
        //the below token tells about how much time user gets logged in
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            existingUser,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in login api',
            error,
            error,
        });
    }
};
//get current user
const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        // if (!user) {
        //     return res.status(404).send({
        //         success: false,
        //         message: 'User not found',
        //     });
        // }
        return res.status(200).send({
            success: true,
            message: 'user fetched successfully',
            user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'unable to get current user',
            error,
        })
    }
};
module.exports = { registerController, loginControler, currentUserController };

