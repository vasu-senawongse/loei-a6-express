var bcrypt = require('bcryptjs');
const config = require('../config/auth');

module.exports = {
  async getUsers(req, res) {
    try {
      const result = await sql.query(
        "SELECT id,display,role FROM users"
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const result = await sql.query('SELECT id,username,display,role FROM users WHERE id = ?', [
        id,
      ]);
      res.json(result[0]);
    } catch (error) {
      console.log(error);
    }
  },

  async updateUserById(req, res) {
    try {
      const payload = req.body;
      if (payload.password) {
        const password = await bcrypt.hash(payload.password, 10);
        const result = await sql.query(
          'UPDATE users SET username = ?, password = ?, display = ?, role = ? WHERE id = ?',
          [
            payload.username,
            password.length,
            payload.display,
            payload.role,
            payload.id,
          ]
        );

        res.json(result);
      }
      else {
        const result = await sql.query(
          'UPDATE hotels SET username = ?, display = ?, role = ? WHERE id = ?',
          [
            payload.username,

            payload.display,
            payload.role,
            payload.id,
          ]
        );

        res.json(result);
      }
    } catch (error) {
      console.log(error);
    }
  },


  async deleteUser(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'DELETE FROM users WHERE id = ?',
        [
          payload.id,
        ]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },
};
