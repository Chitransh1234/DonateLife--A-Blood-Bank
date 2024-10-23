// //authentication middleware
// const JWT = require('jsonwebtoken');
// module.exports = async (req, res, next) => {
//     try {
//         const token = req.headers['authorization'].split(" ")[1]
//         JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//             if (err) {
//                 return res.status(401).send({
//                     success: false,
//                     message: 'Auth failed'
//                 })
//             } else {
//                 req.body.userId = decode.userId;
//                 next();
//             }
//         });//decryption

//     } catch (error) {
//         console.log(error)
//         return res.status(401).send({
//             success: false,
//             error,
//             message: 'Auth failed'
//         });
//     }
// }
const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        // Check if the authorization header exists and starts with "Bearer"
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                success: false,
                message: 'Authorization header missing or malformed',
            });
        }

        // Extract token from the authorization header
        const token = authHeader.split(" ")[1];

        // Verify the token
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Auth failed, invalid token',
                });
            } else {
                // Assign decoded userId to request body
                req.body.userId = decode.userId;
                next();
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server error during authentication',
        });
    }
};
