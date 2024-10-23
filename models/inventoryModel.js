const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    inventoryType: {
        type: String,
        required: [true, 'Please enter the inventory type'],
        enum: ['in', 'out']
    },
    bloodGroup: {
        type: String,
        required: [true, 'Please enter the blood group'],
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    quantity: {
        type: Number,
        required: [true, 'Please enter the quantity']
    },
    donarEmail: {
        type: String,
        required: [true, "Donar Email is required"],
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Please enter the organisation']
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: function () {
            return this.inventoryType === 'out';
        }
    },
    donar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        // required: function () {
        //     return this.inventoryType === 'in';
        // }
    }
}, Timestamps = true);
//timestamps is used to store the time when the data is created and updated


module.exports = mongoose.model('inventory', inventorySchema);