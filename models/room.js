const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    building: {
        type: String,
        enum: ['B3', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B13']
    },
    room_status: {
        type: String,
        enum: ['active', 'pending', 'inactive']
    },
    room_price: {
        type: Number,
        enum: [200000, 400000]
    },
    room_size: {
        type: Number,
        max: 30
    },
    room: {
        type: String,
        unique: true
    },
    room_gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    max_student: {
        type: Number,
        default: 8,
        max: 12
    },
    current_student: {
        type: Number,
        default: 0,
        max: 12
    },
    list_student: [{
        student: {
            type: String,
        }
    }]

})

roomSchema.methods.check_number_student = async function (current_student, max_student) {
    if (current_student === max_student) {
        return 'full'
    }
    if (current_student > max_student) {
        return 'full'
    }
    return 'not_full'
}
roomSchema.index({
    building: 1,
    room: 1
})
const roomModel = mongoose.model('Room', roomSchema);
module.exports = roomModel;