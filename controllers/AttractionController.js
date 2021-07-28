module.exports = {
  async getAttractions(req, res) {
    try {
      const result = await sql.query('SELECT * FROM attractions');
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getAttractionById(req, res) {
    try {
      const { id } = req.params;
      const result = await sql.query('SELECT * FROM attractions WHERE id = ?', [
        id,
      ]);
      res.json(result[0]);
    } catch (error) {
      console.log(error);
    }
  },

  async updateAttractionById(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'UPDATE attractions SET name = ?, category = ?, district = ?, lat = ?, lon = ?, physical = ?, history = ?, nature = ?, culture = ?, updatedAt = ?, org = ?, phone = ? WHERE id = ?',
        [
          payload.name,
          payload.category,
          payload.district,
          payload.lat,
          payload.lon,
          payload.physical,
          payload.history,
          payload.nature,
          payload.culture,
          payload.updatedAt,
          payload.org,
          payload.phone,
          payload.id,
        ]
      );
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
