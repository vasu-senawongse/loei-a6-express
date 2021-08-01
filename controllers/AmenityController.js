module.exports = {
  async getAmenities(req, res) {
    try {
      const result = await sql.query('SELECT * FROM amenities');
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getAmenityById(req, res) {
    try {
      const { id } = req.params;
      const result = await sql.query('SELECT * FROM amenities WHERE id = ?', [
        id,
      ]);
      res.json(result[0]);
    } catch (error) {
      console.log(error);
    }
  },


  async createAmenity(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'INSERT INTO amenities (id,name) VALUES (0,?)',
        [
          payload.name,
        ]
      );

      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async updateAmenityById(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'UPDATE amenities SET name = ? WHERE id = ?',
        [
          payload.name,
          payload.id,
        ]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },
};
