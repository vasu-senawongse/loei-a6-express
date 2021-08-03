const hotels = require("../routes/routes/hotels");

module.exports = {
  index(req, res) {
    res.send('LOEI-A6 API V 1.0.0');
  },
  async getSystemOverview(req, res) {
    try {
      const attraction = await sql.query('SELECT count(distinct id) as count FROM attractions');
      const hotel = await sql.query('SELECT count(distinct id) as count FROM hotels');
      const restaurant = await sql.query('SELECT count(distinct id) as count FROM restaurants');
      const search = await sql.query('SELECT count(distinct id) as count FROM search_logs');
      const topAttraction = await sql.query('SELECT name,view FROM attractions ORDER BY view DESC LIMIT 5');
      const topSearch = await sql.query('SELECT count(distinct id) as count FROM search_logs GROUP BY type');

      var result = {
        attraction : attraction[0].count,
        hotel : hotel[0].count,
        restaurant : restaurant[0].count,
        search : search[0].count,
        topAttraction : topAttraction,
        topSearch : topSearch,
      }
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getTopAttraction(req, res) {
    try {
      const result = await sql.query('SELECT name,view FROM attractions ORDER BY view DESC LIMIT 10');
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getTopSearchDate(req, res) {
    try {
      const result = await sql.query('SELECT CONVERT_TZ(date(searchAt),"SYSTEM","Asia/Bangkok") as date, count(distinct id) as count FROM search_logs GROUP BY date(searchAt) ORDER BY searchAt LIMIT 10');
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },


  async getTopSearch(req, res) {
    try {
      const result = await sql.query('SELECT type,count(distinct id) as count FROM search_logs GROUP BY type ORDER BY count DESC');
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getLatestSearch(req, res) {
    try {
      const result = await sql.query('SELECT type,count(distinct id) as count FROM search_logs GROUP BY type ORDER BY count DESC');
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

};
