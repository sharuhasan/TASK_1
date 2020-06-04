var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Userschema = new schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    number: { type: String, required: true },
    state: { type: String, required: true }
});
module.exports = mongoose.model('user', Userschema);
