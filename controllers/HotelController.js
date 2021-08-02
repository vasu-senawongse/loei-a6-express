module.exports = {
  async getHotels(req, res) {
    try {
      const result = await sql.query('SELECT * FROM hotels');
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getHotelById(req, res) {
    try {
      const { id } = req.params;
      const result = await sql.query('SELECT * FROM hotels WHERE id = ?', [
        id,
      ]);
      res.json(result[0]);
    } catch (error) {
      console.log(error);
    }
  },


  async getHotelsByFilter(req, res) {
    try {
      const { district, name } = req.query;
      var hotels = [];
      hotels = await sql.query(
          'SELECT * FROM hotels WHERE district LIKE "%"?"%" AND name LIKE "%"?"%"',
          [district, name]
        );
      res.json(hotels);
    } catch (error) {
      console.log(error);
    }
  },


  async createHotel(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'INSERT INTO hotels (id,name,room,district,subDistrict,phone,lat,lon,url) VALUES (0,?,?,?,?,?,?,?,?)',
        [
          payload.name,
          payload.room,
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

  async updateHotelById(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'UPDATE hotels SET name = ?, room = ?,district = ?, subDistrict = ?, phone = ?, lat = ?, lon = ?, url = ? WHERE id = ?',
        [
          payload.name,
          payload.room,
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
