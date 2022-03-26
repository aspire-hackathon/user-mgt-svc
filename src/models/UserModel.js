const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, require: true },
  username: { type: String, required : true },
  password: { type: String, required : true },
  role: { type: String, required : true },
  contactNo: { type: String, required : true },
  email: { type: String, required : true },
  district: { type: String, required : true },
  state: { type: String, required : true },
  pincode: { type: String, required : true },
  lat: { type: String, required : true },
  lng: { type: String, required : true },
  createdAt: { type: Date, default: Date.now() }
});
    
module.exports = mongoose.model('user', UserSchema);
