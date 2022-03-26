const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    district: { type: String, required : true },
    state: { type: String, required : true },
    pincode: { type: String, required : true },
    lat: { type: String, required : true },
    lng: { type: String, required : true },
});

module.exports = mongoose.model('address',AddressSchema);
