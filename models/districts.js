const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const districtSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true, versionKey: false }
);

const Districts = mongoose.model('Districts', districtSchema);
module.exports = Districts;
