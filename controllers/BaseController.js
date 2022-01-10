const fs = require("fs");

module.exports = {
  index(req, res) {
    res.send("LOEI-A6 API V 1.0.0");
  },
  async getSystemOverview(req, res) {
    try {
      const attraction = await sql.query(
        "SELECT count(distinct id) as count FROM attractions"
      );
      const hotel = await sql.query(
        "SELECT count(distinct id) as count FROM hotels"
      );
      const restaurant = await sql.query(
        "SELECT count(distinct id) as count FROM restaurants"
      );
      const search = await sql.query(
        "SELECT count(distinct id) as count FROM search_logs"
      );
      const topAttraction = await sql.query(
        "SELECT name,view FROM attractions ORDER BY view DESC LIMIT 5"
      );
      const topSearch = await sql.query(
        "SELECT count(distinct id) as count FROM search_logs GROUP BY type"
      );

      var result = {
        attraction: attraction[0].count,
        hotel: hotel[0].count,
        restaurant: restaurant[0].count,
        search: search[0].count,
        topAttraction: topAttraction,
        topSearch: topSearch,
      };
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getTopAttraction(req, res) {
    try {
      const result = await sql.query(
        "SELECT name,view FROM attractions ORDER BY view DESC LIMIT 10"
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getTopSearchDate(req, res) {
    try {
      const result = await sql.query(
        'SELECT CONVERT_TZ(date(searchAt),"SYSTEM","Asia/Bangkok") as date, count(distinct id) as count FROM search_logs GROUP BY date(searchAt) ORDER BY searchAt LIMIT 10'
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getTopSearch(req, res) {
    try {
      const result = await sql.query(
        "SELECT type,count(distinct id) as count FROM search_logs GROUP BY type ORDER BY count DESC"
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getLatestSearch(req, res) {
    try {
      const result = await sql.query(
        "SELECT type,count(distinct id) as count FROM search_logs GROUP BY type ORDER BY count DESC"
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getOrganizations(req, res) {
    try {
      const result = await sql.query(
        "SELECT * FROM organizations"
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteOrganization(req, res) {
    try {
      const payload = req.body;
      const org = await sql.query(
        "SELECT * FROM organizations WHERE id = ?", [
        payload.id,
      ]);
      if (fs.existsSync("public/images/organizations/" + org[0].img)) {
        fs.unlinkSync("public/images/organizations/" + org[0].img);
      }
      const result = await sql.query("DELETE FROM organizations WHERE id = ?", [
        payload.id,
      ]);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async createOrganization(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        "INSERT INTO organizations (id,org,img,url,type) VALUES (0,?,?,?,?)",
        [
          payload.org,
          payload.img,
          payload.url,
          payload.type,
        ]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getProducts(req, res) {
    try {
      const result = await sql.query(
        "SELECT * FROM products"
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async createProduct(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        "INSERT INTO products (id,name,img,description,shop,phone) VALUES (0,?,?,?,?,?)",
        [
          payload.name,
          payload.img,
          payload.description,
          payload.shop,
          payload.phone,
        ]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteProduct(req, res) {
    try {
      const payload = req.body;
      const product = await sql.query(
        "SELECT * FROM products WHERE id = ?", [
        payload.id,
      ]);
      if (fs.existsSync("public/images/products/" + product[0].img)) {
        fs.unlinkSync("public/images/products/" + product[0].img);
      }
      const result = await sql.query("DELETE FROM products WHERE id = ?", [
        payload.id,
      ]);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },
};
