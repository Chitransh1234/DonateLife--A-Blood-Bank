const express = require('express');
const { createInventoryController, getInventoryController } = require('../controller/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//routes
//add inventory || POST
router.post('/create-inventory', authMiddleware, createInventoryController);
//get all inventory || GET
router.get('/get-inventory', authMiddleware, getInventoryController);
// router.post('/create-inventory', (req, res) => {
//     res.send('create inventory');
// });

module.exports = router;