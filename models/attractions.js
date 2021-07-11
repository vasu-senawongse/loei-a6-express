const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const attractionSchema = new Schema(
  {
    name: String,
    img: String,
    subDistrict: String,
    district: String,
    lat: String,
    lon: String,
  },
  { timestamps: true, versionKey: false }
);

const Attraction = mongoose.model('Attraction', attractionSchema);
module.exports = Attraction;
