const express = require('express');
const { registerController, loginControler, currentUserController } = require('../controller/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//routes
//REGISTER || POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginControler);
// router.post('/api/v1/auth/login', async (req, res) => {
//     try {
//         console.log('Login request received:', req.body);  // Log the request body
//         // Your logic here (e.g., find user, compare passwords, etc.)
//         res.status(200).send('Login successful');
//     } catch (error) {
//         console.error('Login error:', error);  // Log any errors
//         res.status(500).send({ success: false, message: 'Internal Server Error' });
//     }
// });

//get current user|| get
router.get('/current-user', authMiddleware, currentUserController);

module.exports = router;
