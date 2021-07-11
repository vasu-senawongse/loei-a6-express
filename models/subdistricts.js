const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subDistrictSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true, versionKey: false }
);

const SubDistrict = mongoose.model('SubDistrict', subDistrictSchema);
module.exports = SubDistrict;
