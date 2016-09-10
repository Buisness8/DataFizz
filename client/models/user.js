var bcrypt = require('bcrypt-nodejs');

var User = module.exports

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './identity.sqlite3'
  }
});


User.findByUsername = function (username) {
  return knex('users').where({ username: username })
    .then( user => {
      return user
    })
}

User.create = function (incomingAttrs) {


  // Copy object to avoid mutation
  var attrs = Object.assign({}, incomingAttrs);


  return hashPassword(attrs.password)
    .then(function (passwordHash) {
      attrs.password_hash = passwordHash
      delete attrs.password
      return knex('users').insert(attrs)
    })
    .then(function (result) {
      // Prepare new user for the outside world
      attrs.id = result[0];
      return attrs;
    });
  };

User.comparePassword = function (passwordHashFromDatabase, attemptedPassword) {


  return new Promise(function (resolve, reject) {

    bcrypt.compare(attemptedPassword, passwordHashFromDatabase, function(err, res) {
      if (err) reject(err)
      else     resolve(res)
    });
  })
  };

function hashPassword (password) {

  return new Promise(function (resolve, reject) {

    bcrypt.hash(password, null, null, function(err, hash) {
      if (err) reject(err)
      else     resolve(hash)
    });
  })
  };
