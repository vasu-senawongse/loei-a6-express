const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');

module.exports = {
  async getAttractions(req, res) {
    try {
      const result = await sql.query('SELECT * FROM attractions');
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getAttractionNextId(req, res) {
    try {
      const result = await sql.query(
        'SELECT * FROM attractions ORDER BY id DESC LIMIT 1'
      );
      res.json(result[0].id + 1);
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

  async getAttractionGalleryById(req, res) {
    try {
      const { id } = req.params;
      const result = await sql.query(
        'SELECT * FROM galleries WHERE attraction = ? ORDER BY img_order,id',
        [id]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getAttractionByName(req, res) {
    try {
      var { name } = req.params;
      name = name.replace('-', ' ');
      const result = await sql.query(
        'SELECT * FROM attractions WHERE name = ?',
        [name]
      );
      if (result.length == 0) {
        res.status(404).send('ATTRACTION NOT FOUND!');
      } else {
        await sql.query('UPDATE attractions SET view = ? WHERE id = ?', [
          (result[0].view += 1),
          result[0].id,
        ]);
        res.json(result[0]);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async createAttraction(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'INSERT INTO attractions (id,name,img,category,district,subDistrict,lat,lon,physical,history,nature,culture,attraction,accessibility,accommodation,activities,amenities,month,updatedAt,createdAt,org,phone,view) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0)',
        [
          payload.id,
          payload.name,
          payload.img,
          payload.category,
          payload.district,
          payload.subDistrict,
          payload.lat,
          payload.lon,
          payload.physical,
          payload.history,
          payload.nature,
          payload.culture,
          payload.attraction,
          payload.accessibility,
          payload.accommodation,
          payload.activities,
          payload.amenities,
          payload.month,
          payload.updatedAt,
          payload.createdAt,
          payload.org,
          payload.phone,
        ]
      );
      if (payload.img != null) {
        const gallery = await sql.query(
          'INSERT INTO galleries (id,img,attraction,img_order) VALUES (0,?,?,?)',
          [payload.img, payload.id, 1]
        );
      }
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async updateAttractionById(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'UPDATE attractions SET name = ?, category = ?, district = ?, subDistrict = ?, lat = ?, lon = ?, physical = ?, history = ?, nature = ?, culture = ?, attraction = ?, accessibility = ?, accommodation = ?, activities = ?, amenities = ?, month = ?, updatedAt = ?, org = ?, phone = ? WHERE id = ?',
        [
          payload.name,
          payload.category,
          payload.district,
          payload.subDistrict,
          payload.lat,
          payload.lon,
          payload.physical,
          payload.history,
          payload.nature,
          payload.culture,
          payload.attraction,
          payload.accessibility,
          payload.accommodation,
          payload.activities,
          payload.amenities,
          payload.month,
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
      attractions = await sql.query(
        'SELECT * FROM attractions WHERE district LIKE "%"?"%" AND category LIKE "%"?"%" AND name LIKE "%"?"%"',
        [district, category, name]
      );
      await sql.query(
        'INSERT INTO search_logs (id,type,name,district,category,searchAt) VALUES (0,"แหล่งท่องเที่ยว",?,?,?,CONVERT_TZ(NOW(),"SYSTEM","Asia/Bangkok"))',
        [
          name != '' ? name : null,
          district != '' ? district : null,
          category != '' ? category : null,
        ]
      );
      res.json(attractions);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteAttractionImage(req, res) {
    try {
      const payload = req.body;
      if (fs.existsSync('public/images/' + payload.img)) {
        fs.unlinkSync('public/images/' + payload.img);
      }
      await sql.query('DELETE FROM galleries WHERE id = ?', [payload.id]);
      console.log(payload);
      res.status(200).send('IMG DELETED');
    } catch (error) {
      console.log(error);
    }
  },

  async selectAttractionThumbnail(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'UPDATE attractions SET img = ? WHERE id = ?',
        [payload.img, payload.id]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async insertAttractionImage(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        'INSERT INTO galleries (id,img,attraction,img_order) VALUES (0,?,?,?)',
        [payload.img, payload.attraction, payload.order]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteAttraction(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query('DELETE FROM attractions WHERE id = ?', [
        payload.id,
      ]);

      await sql.query('DELETE FROM galleries WHERE attraction = ?', [
        payload.id,
      ]);
      fs.rmSync('public/images/attractions/' + payload.id, { recursive: true });
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async export(req, res) {
    try {
      const result = await sql.query('SELECT * FROM attractions');
      const csv = new ObjectsToCsv(result);
      await csv.toDisk('./public/export/attractions.csv', { bom: true });
      res.status(200).send('Attraction Exported');
    } catch (error) {
      console.log(error);
    }
  },
};
