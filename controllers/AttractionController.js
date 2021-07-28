module.exports = {
  async getAttractions(req, res) {
    try {
      const result = await sql.query('SELECT * FROM attractions');
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getAttractionsByFilter(req, res) {
    try {
      const { district, category, name } = req.query;
      var attractions = [];
      if (district == 'ทุกอำเภอ')
        attractions = await sql.query('SELECT * FROM attractions');
      else
        attractions = await sql.query(
          'SELECT * FROM attractions WHERE district LIKE "%"?"%" AND category LIKE "%"?"%" AND name LIKE "%"?"%"',
          [district, category, name]
        );
      res.json(attractions);
    } catch (error) {
      console.log(error);
    }
  },
};
