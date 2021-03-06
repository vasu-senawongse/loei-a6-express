const csv = require('csvtojson')

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

      await sql.query(
        'INSERT INTO search_logs (id,type,name,district,category,searchAt) VALUES (0,"ที่พัก",?,?,null,CONVERT_TZ(NOW(),"SYSTEM","Asia/Bangkok"))',
        [
          name != '' ? name : null,
          district != '' ? district : null,
        ]
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


  async deleteHotel(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'DELETE FROM hotels WHERE id = ?',
        [
          payload.id,
        ]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async importHotel(req, res) {
    try {
      const json = await csv().fromFile('public/import/hotels.csv');
      for (var i = 0; i < json.length; i++) {
        const result = await sql.query(
          'INSERT INTO hotels (id,name,district,subDistrict,phone,lat,lon,url) VALUES (0,?,?,?,?,?,?,?)',
          [
            json[i].name,
            json[i].district,
            json[i].subDistrict,
            json[i].phone,
            json[i].latitude,
            json[i].longitude,
            json[i].website
          ]
        );
      }
      console.log(json)
      res.send('Success');
    } catch (error) {
      console.log(error);
    }
  },
};
