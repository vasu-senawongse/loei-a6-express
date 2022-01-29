const ObjectsToCsv = require("objects-to-csv");
const fs = require("fs");
const convertCsvToXlsx = require("@aternus/csv-to-xlsx");

module.exports = {
  async getAttractions(req, res) {
    try {
      const result = await sql.query("SELECT * FROM attractions");
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getAttractionTypes(req, res) {
    try {
      const result = await sql.query("SELECT * FROM attraction_types");
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getAttractionNextId(req, res) {
    try {
      const result = await sql.query(
        "SELECT * FROM attractions ORDER BY id DESC LIMIT 1"
      );
      res.json(result[0].id + 1);
    } catch (error) {
      console.log(error);
    }
  },

  async getAttractionById(req, res) {
    try {
      const { id } = req.params;
      const result = await sql.query("SELECT * FROM attractions WHERE id = ?", [
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
        "SELECT * FROM galleries WHERE attraction = ? ORDER BY img_order,id",
        [id]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getAttractionMaterialById(req, res) {
    try {
      const { id } = req.params;
      const result = await sql.query(
        "SELECT * FROM materials WHERE attraction = ? ORDER BY m_order,id",
        [id]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getAttractionMaterialById(req, res) {
    try {
      const { id } = req.params;
      const result = await sql.query(
        "SELECT * FROM materials WHERE attraction = ? ORDER BY m_order,id",
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
      name = name.replace(/-/g, " ");
      const result = await sql.query(
        "SELECT * FROM attractions WHERE name = ?",
        [name]
      );
      if (result.length == 0) {
        res.status(404).send("ATTRACTION NOT FOUND!");
      } else {
        await sql.query("UPDATE attractions SET view = ? WHERE id = ?", [
          (result[0].view += 1),
          result[0].id,
        ]);
        res.json(result[0]);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async addOptions(req, res) {
    try {
      const payload = req.body;
      if (payload.type == "TYPE") {
        result = await sql.query(
          "INSERT INTO attraction_types (id,name) VALUES (0,?)",
          [payload.name]
        );
        res.json(result);
      } else if (payload.type == "AMEN") {
        result = await sql.query(
          "INSERT INTO amenities (id,name,type) VALUES (0,?,1)",
          [payload.name]
        );
        res.json(result);
      }
      else if (payload.type == "AMENFA") {
        result = await sql.query(
          "INSERT INTO amenities (id,name,type) VALUES (0,?,2)",
          [payload.name]
        );
        res.json(result);
      }

      else if (payload.type == "ACT") {
        result = await sql.query(
          "INSERT INTO activities (id,name) VALUES (0,?)",
          [payload.name]
        );
        res.json(result);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async editOptions(req, res) {
    try {
      const payload = req.body;
      if (payload.type == "TYPE") {
        const type = await sql.query(
          'SELECT * FROM attraction_types WHERE id = ?',
          [payload.id]
        );

        const attractions = await sql.query(
          'SELECT * FROM attractions WHERE category LIKE "%"?"%"',
          [type[0].name]
        );

        for (var i = 0; i < attractions.length; i++) {
          var array = attractions[i].category.split(',')
          const index = array.indexOf(type[0].name)
          array[index] = payload.name
          var category = array.filter(i => i != '').join()
          await sql.query(
            "UPDATE attractions SET category = ? WHERE id = ?",
            [
              category,
              attractions[i].id,
            ]
          );
        }
        result = await sql.query(
          "UPDATE attraction_types SET name = ? WHERE id = ?",
          [payload.name, payload.id]
        );
        res.send('DELETED TYPE AND UPDATED ' + attractions.length + ' ATTRACTIONS');
      } else if (payload.type == "AMEN") {

        const amen = await sql.query(
          'SELECT * FROM amenities WHERE id = ?',
          [payload.id]
        );

        const attractions = await sql.query(
          'SELECT * FROM attractions WHERE amenities LIKE "%"?"%"',
          [amen[0].name]
        );

        for (var i = 0; i < attractions.length; i++) {
          var array = attractions[i].amenities.split(',')
          const index = array.indexOf(amen[0].name)
          array[index] = payload.name
          var amenity = array.filter(i => i != '').join()
          await sql.query(
            "UPDATE attractions SET amenities = ? WHERE id = ?",
            [
              amenity,
              attractions[i].id,
            ]
          );
        }

        result = await sql.query(
          "UPDATE amenities SET name = ? WHERE id = ?",
          [payload.name, payload.id]
        );
        res.json(result);
      }
      else if (payload.type == "AMENFA") {

        const amen = await sql.query(
          'SELECT * FROM amenities WHERE id = ?',
          [payload.id]
        );

        const attractions = await sql.query(
          'SELECT * FROM attractions WHERE amenitiesForAll LIKE "%"?"%"',
          [amen[0].name]
        );

        for (var i = 0; i < attractions.length; i++) {
          var array = attractions[i].amenitiesForAll.split(',')
          const index = array.indexOf(amen[0].name)
          array[index] = payload.name
          var amenity = array.filter(i => i != '').join()
          await sql.query(
            "UPDATE attractions SET amenitiesForAll = ? WHERE id = ?",
            [
              amenity,
              attractions[i].id,
            ]
          );
        }

        result = await sql.query(
          "UPDATE amenities SET name = ? WHERE id = ?",
          [payload.name, payload.id]
        );
        res.json(result);
      }

      else if (payload.type == "ACT") {
        const act = await sql.query(
          'SELECT * FROM activities WHERE id = ?',
          [payload.id]
        );

        const attractions = await sql.query(
          'SELECT * FROM attractions WHERE activities LIKE "%"?"%"',
          [act[0].name]
        );

        for (var i = 0; i < attractions.length; i++) {
          var array = attractions[i].activities.split(',')
          const index = array.indexOf(act[0].name)
          array[index] = payload.name
          var activity = array.filter(i => i != '').join()
          await sql.query(
            "UPDATE attractions SET activities = ? WHERE id = ?",
            [
              activity,
              attractions[i].id,
            ]
          );
        }

        result = await sql.query(
          "UPDATE activities SET name = ? WHERE id = ?",
          [payload.name, payload.id]
        );
        res.send('Success');
      }
    } catch (error) {
      console.log(error);
    }
  },

  async deleteOptions(req, res) {
    try {
      const payload = req.body;
      if (payload.type == "TYPE") {
        const type = await sql.query(
          'SELECT * FROM attraction_types WHERE id = ?',
          [payload.id]
        );

        const attractions = await sql.query(
          'SELECT * FROM attractions WHERE category LIKE "%"?"%"',
          [type[0].name]
        );

        for (var i = 0; i < attractions.length; i++) {
          var array = attractions[i].category.split(',')
          const index = array.indexOf(type[0].name)
          var category = array.filter((value, i) => value != '' && i != index).join()
          await sql.query(
            "UPDATE attractions SET category = ? WHERE id = ?",
            [
              category,
              attractions[i].id,
            ]
          );
        }
        result = await sql.query(
          "DELETE FROM attraction_types WHERE id = ?",
          [payload.id]
        );
        res.send('DELETED TYPE AND UPDATED ' + attractions.length + ' ATTRACTIONS');
      } else if (payload.type == "AMEN") {

        const amen = await sql.query(
          'SELECT * FROM amenities WHERE id = ?',
          [payload.id]
        );

        const attractions = await sql.query(
          'SELECT * FROM attractions WHERE amenities LIKE "%"?"%"',
          [amen[0].name]
        );

        for (var i = 0; i < attractions.length; i++) {
          var array = attractions[i].amenities.split(',')
          const index = array.indexOf(amen[0].name)
          var amenity = array.filter((value, i) => value != '' && i != index).join()
          await sql.query(
            "UPDATE attractions SET amenities = ? WHERE id = ?",
            [
              amenity,
              attractions[i].id,
            ]
          );
        }

        result = await sql.query(
          "DELETE FROM amenities WHERE id = ?",
          [payload.id]
        );
        res.json(result);
      }

      else if (payload.type == "AMENFA") {

        const amen = await sql.query(
          'SELECT * FROM amenities WHERE id = ?',
          [payload.id]
        );

        const attractions = await sql.query(
          'SELECT * FROM attractions WHERE amenitiesForAll LIKE "%"?"%"',
          [amen[0].name]
        );

        for (var i = 0; i < attractions.length; i++) {
          var array = attractions[i].amenitiesForAll.split(',')
          const index = array.indexOf(amen[0].name)
          var amenity = array.filter((value, i) => value != '' && i != index).join()
          await sql.query(
            "UPDATE attractions SET amenitiesForAll = ? WHERE id = ?",
            [
              amenity,
              attractions[i].id,
            ]
          );
        }

        result = await sql.query(
          "DELETE FROM amenities WHERE id = ?",
          [payload.id]
        );
        res.json(result);
      }

      else if (payload.type == "ACT") {
        const act = await sql.query(
          'SELECT * FROM activities WHERE id = ?',
          [payload.id]
        );

        const attractions = await sql.query(
          'SELECT * FROM attractions WHERE activities LIKE "%"?"%"',
          [act[0].name]
        );

        for (var i = 0; i < attractions.length; i++) {
          var array = attractions[i].activities.split(',')
          const index = array.indexOf(act[0].name)
          var activity = array.filter((value, i) => value != '' && i != index).join()
          await sql.query(
            "UPDATE attractions SET activities = ? WHERE id = ?",
            [
              activity,
              attractions[i].id,
            ]
          );
        }

        result = await sql.query(
          "DELETE FROM activities WHERE id = ?",
          [payload.id]
        );
        res.send('Success');
      }
    } catch (error) {
      console.log(error);
    }
  },

  async createAttraction(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        "INSERT INTO attractions (id,name,img,category,district,subDistrict,lat,lon,updatedAt,createdAt,view) VALUES (?,?,?,?,?,?,?,?,?,?,0)",
        [
          payload.id,
          payload.name,
          payload.img,
          payload.category,
          payload.district,
          payload.subDistrict,
          payload.lat,
          payload.lon,
          payload.updatedAt,
          payload.createdAt,
        ]
      );
      if (payload.img != null) {
        const gallery = await sql.query(
          "INSERT INTO galleries (id,img,attraction,img_order) VALUES (0,?,?,?)",
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
        "UPDATE attractions SET name = ?, category = ?, district = ?, subDistrict = ?, lat = ?, lon = ?, physical = ?, history = ?, nature = ?, culture = ?, attraction = ?, accessibility = ?, accommodation = ?, activities = ?, amenities = ?, amenitiesForAll = ?, month = ?, updatedAt = ?, org = ?, phone = ?, register = ?, geo = ?, eco = ?, biodiversity = ?, myth = ?, festival = ?, creativetourism = ?, storytelling = ?, etc = ? WHERE id = ?",
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
          payload.amenitiesForAll,
          payload.month,
          payload.updatedAt,
          payload.org,
          payload.phone,
          payload.register,
          payload.geo,
          payload.eco,
          payload.biodiversity,
          payload.myth,
          payload.festival,
          payload.creativetourism,
          payload.storytelling,
          payload.etc,
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
          name != "" ? name : null,
          district != "" ? district : null,
          category != "" ? category : null,
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
      if (payload.img) {
        if (fs.existsSync("public/images/" + payload.img)) {
          fs.unlinkSync("public/images/" + payload.img);
        }
      }
      await sql.query("DELETE FROM galleries WHERE id = ?", [payload.id]);
      res.status(200).send("IMG DELETED");
    } catch (error) {
      console.log(error);
    }
  },

  async deleteAttractionDocument(req, res) {
    try {
      const payload = req.body;
      if (fs.existsSync("public/images/" + payload.path)) {
        fs.unlinkSync("public/images/" + payload.path);
      }
      await sql.query("DELETE FROM materials WHERE id = ?", [payload.id]);
      res.status(200).send("MATERIAL DELETED");
    } catch (error) {
      console.log(error);
    }
  },

  async selectAttractionThumbnail(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        "UPDATE attractions SET img = ? WHERE id = ?",
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
        "INSERT INTO galleries (id,img,attraction,img_order) VALUES (0,?,?,?)",
        [payload.img, payload.attraction, payload.order]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async insertAttractionDocument(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        "INSERT INTO materials  (id,file,path,attraction,m_order) VALUES (0,?,?,?,?)",
        [payload.file, payload.path, payload.attraction, payload.order]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteAttraction(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query("DELETE FROM attractions WHERE id = ?", [
        payload.id,
      ]);

      await sql.query("DELETE FROM galleries WHERE attraction = ?", [
        payload.id,
      ]);
      fs.rmSync("public/images/attractions/" + payload.id, { recursive: true });
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async export(req, res) {
    try {
      const result = await sql.query("SELECT * FROM attractions");
      const csv = new ObjectsToCsv(result);
      await csv.toDisk("public/export/attractions.csv", { bom: true });
      let source = "public/export/attractions.csv";
      if (fs.existsSync("public/export/attractions.xlsx")) {
        fs.unlinkSync("public/export/attractions.xlsx");
      }
      let destination = "public/export/attractions.xlsx";
      convertCsvToXlsx(source, destination);
      if (fs.existsSync("public/export/attractions.csv")) {
        fs.unlinkSync("public/export/attractions.csv");
      }
      res.status(200).send("Attraction Exported");
    } catch (error) {
      console.log(error);
    }
  },
};
