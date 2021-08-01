module.exports = {
  async getActivities(req, res) {
    try {
      const result = await sql.query('SELECT * FROM activities');
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getActivityById(req, res) {
    try {
      const { id } = req.params;
      const result = await sql.query('SELECT * FROM activities WHERE id = ?', [
        id,
      ]);
      res.json(result[0]);
    } catch (error) {
      console.log(error);
    }
  },


  async createActivity(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'INSERT INTO activities (id,name) VALUES (0,?)',
        [
          payload.name,
        ]
      );

      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async updateActivityById(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'UPDATE activities SET name = ? WHERE id = ?',
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
