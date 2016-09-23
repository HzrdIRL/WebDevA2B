var db = require('db');

var Users_Schema = new Schema({
  firstName: String,
  lastName: String,
  email: {type: Schema.Types.Email, required: true},
  password: {type: String, required: true},
  google_id: Number
});

Users_Schema.plugin(autoIncrement.plugin, 'User');

var User = db.model('User', Users_Schema);

module.exports = User;