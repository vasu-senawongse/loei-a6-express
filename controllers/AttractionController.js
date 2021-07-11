const Attraction = require('../models/attractions');
module.exports = {
  async createAttraction(req, res) {
    try {
      const payload = req.body;
      const attraction = new Attraction(payload);
      await attraction.save();
      res.status(201).send('Success!');
    } catch (error) {
      console.log(error);
    }
  },

  async getAttractions(req, res) {
    try {
      const attractions = await Attraction.find();
      res.json(attractions);
    } catch (error) {
      console.log(error);
    }
  },

  async getAttractionsByFilter(req, res) {
    try {
      const { district } = req.query;
      var attractions = [];
      if (district == 'ทุกอำเภอ') attractions = await Attraction.find();
      else attractions = await Attraction.find({ district: district });
      res.json(attractions);
    } catch (error) {
      console.log(error);
    }
  },
};
