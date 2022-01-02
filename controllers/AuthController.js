var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const config = require('../config/auth');
module.exports = {
    async signup(req, res) {
        try {
            const payload = req.body;

            const password = await bcrypt.hash(payload.password, 10);

            const result = await sql.query(
                "INSERT INTO users (id,username,password,display,role) VALUES (0,?,?,?,?)",
                [
                    payload.username,
                    password,
                    payload.display,
                    payload.role,
                ]
            );
            res.status(200).send('Success')
        } catch (error) {
            console.log(error);
        }
    },

    async signin(req, res) {
        try {
            const payload = req.body;
            const result = await sql.query('SELECT * FROM users WHERE username = ?', [payload.username]
            );

            const user = result[0]
            if (!user) {
                return res.status(401).send('ไม่พบบัญชีผู้ใช้นี้ในระบบ');
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send('รหัสผ่านไม่ถูกต้อง');
            }

            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });
            const date = Date.now();
            await sql.query(
                "INSERT INTO login_logs (id,user,date) VALUES (0,?,?)",
                [
                    user.id,
                    date,
                ]
            );


            res.status(200).send({
                userName: user.username,
                displayName: user.display,
                roles: user.role,
                accessToken: token,
            });
        } catch (error) {
            console.log(error);
        }
    },

};
