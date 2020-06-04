var config = require('config');
var jwt = require('jsonwebtoken');
function auth(req, res, next) {
    var token = req.header('auth-token');
    if (!token)
        return res.status(401).json({ msg: "no token unauthorized" });
    jwt.verify(token, config.get("jwtsecret"), function (err, payload) {
        if (err) {
            res.status(400).json("Invalid Token");
        }
        ;
        req.user = payload;
        next();
    });
}
module.exports = auth;
