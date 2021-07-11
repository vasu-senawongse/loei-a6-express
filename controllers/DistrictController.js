const District = require('../models/districts');
module.exports = {
  async createDistrict(req, res) {
    try {
      const payload = req.body;
      const district = new District(payload);
      await district.save();
      res.status(201).send('Success!');
    } catch (error) {
      console.log(error);
    }
  },

  async getDistricts(req, res) {
    try {
      const districts = await District.find();
      res.json(districts);
    } catch (error) {
      console.log(error);
    }
  },
};
