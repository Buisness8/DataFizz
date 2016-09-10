var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './identity.sqlite3'
  }
});
var uuid = require('node-uuid');

var Session = module.exports

Session.create = function (userId) {

  var newSession = { id: uuid(), user_id: userId }


  return knex('sessions').insert(newSession)
    .then(function () {
      return newSession
    })
  }


Session.destroy = function (sessionId) {
  return knex('sessions').where({ id: sessionId }).del()
}
