const InventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

//create inventory
const createInventoryController = async (req, res) => {
    try {
        const { donarEmail, inventoryType } = req.body;
        // validation
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error('User not found');
        }
        if (inventoryType === 'in' && user.role !== 'donar') {
            return new Error('You are not a donar');
        }
        if (inventoryType === 'out' && user.role !== 'hospital') {
            return new Error('You are not a hospital');
        }
        //save record
        const inventory = new InventoryModel(req.body)
        // res.send(inventory)
        await inventory.save()
        return res.status(201).send({
            success: true,
            message: 'New Blood record Added',
            // inventory,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'error in create inventory api',
            error,
        });
    }
};

//get all blood records
const getInventoryController = async (req, res) => {
    try {
        const inventory = await InventoryModel.find({ organisation: req.body.userId }).populate('donar').populate('hospital').sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: 'All Blood records',
            inventory,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'error in get all inventory',
            error,
        });
    }
}

module.exports = { createInventoryController, getInventoryController };