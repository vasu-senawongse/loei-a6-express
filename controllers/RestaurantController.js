module.exports = {
  async getRestaurants(req, res) {
    try {
      const result = await sql.query('SELECT * FROM restaurants');
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getRestaurantById(req, res) {
    try {
      const { id } = req.params;
      const result = await sql.query('SELECT * FROM restaurants WHERE id = ?', [
        id,
      ]);
      res.json(result[0]);
    } catch (error) {
      console.log(error);
    }
  },


  async getRestaurantsByFilter(req, res) {
    try {
      const { district, name } = req.query;
      var hotels = [];
      hotels = await sql.query(
          'SELECT * FROM restaurants WHERE district LIKE "%"?"%" AND name LIKE "%"?"%"',
          [district, name]
        );
      res.json(hotels);
    } catch (error) {
      console.log(error);
    }
  },


  async createRestaurant(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'INSERT INTO restaurants (id,name,district,subDistrict,phone,lat,lon,url) VALUES (0,?,?,?,?,?,?,?)',
        [
          payload.name,
          payload.district,
          payload.subDistrict,
          payload.phone,
          payload.lat,
          payload.lon,
          payload.url
        ]
      );

      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async updateRestaurantById(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'UPDATE restaurants SET name = ?,district = ?, subDistrict = ?, phone = ?, lat = ?, lon = ?, url = ? WHERE id = ?',
        [
          payload.name,
          payload.district,
          payload.subDistrict,
          payload.phone,
          payload.lat,
          payload.lon,
          payload.url,
          payload.id,
        ]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },
};
