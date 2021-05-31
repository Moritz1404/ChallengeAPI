const mongoose = require('mongoose');

const challangeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    kilometers: {type: Number, required: true},
    date: {type: Date, required: true},
    name: {type: String, required: true}
});

module.exports = mongoose.model('ChallangeMong', challangeSchema);