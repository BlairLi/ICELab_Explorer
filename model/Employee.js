const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    downlog: [
        {
            fileName: String,
            time: String,
            device: String,
            _id: false
        }
    ],
});

module.exports = mongoose.model('Employee', employeeSchema);