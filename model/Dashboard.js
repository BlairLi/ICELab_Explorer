const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dashboardSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    plotGraph: {
        
    }
});

module.exports = mongoose.model('Dashboard', dashboardSchema);