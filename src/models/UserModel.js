const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('./AddressModel').schema;

const UserSchema = new Schema({
  name: { type: String, require: true },
  username: { type: String, required : true },
  password: { type: String, required : true },
  role: { type: String, required : true },
  contactNo: { type: String, required : true },
  email: { type: String, required : true },
  address: { type: AddressSchema, required:true},
  createdAt: { type: Date, default: Date.now() }
});
    
module.exports = mongoose.model('user', UserSchema);
