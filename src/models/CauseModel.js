const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('./AddressModel').schema;

const CauseSchema = new Schema({
  title: { type: String, require: true },
  aimDescription: { type: String, required : true },
  causeImage: { type: String, required : true },
  address: { type: AddressSchema, required:true},
  causeOwner: {type: Schema.Types.ObjectId, ref: 'user'},
  volunteers: {type: [Schema.Types.ObjectId], ref: 'user'},
  causeStatus: { type: String, required :false },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('cause',CauseSchema);
