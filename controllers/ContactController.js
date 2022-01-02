module.exports = {
  async createContact(req, res) {
    try {
      const payload = req.body;
      const result = await sql.query(
        "INSERT INTO messages (id,name,type,phone,title,message,status,createdAt) VALUES (0,?,?,?,?,?,?,?)",
        [
          payload.name,
          payload.type,
          payload.phone,
          payload.title,
          payload.message,
          payload.status,
          payload.createdAt,
        ]
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async getPendingContacts(req, res) {
    try {
      const result = await sql.query(
        "SELECT * FROM messages WHERE status = 'PENDING' ORDER BY id DESC"
      );
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

  async doneTask(req, res) {
    try {

      const payload = req.body;

      const contact = await sql.query(
        "UPDATE messages SET status = 'DONE' WHERE id = ?",
        [
          payload.id
        ]
      );
      res.json(contact);
    } catch (error) {
      console.log(error);
    }
  },
};
