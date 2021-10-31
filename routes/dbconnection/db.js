
const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://localhost:27017";

var db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true, useUnifiedTopology: true, }, function( err, client ) {
      db  = client.db('apartments');
      return callback( err );
    } );
  },

  getDb: function() {
    return db;
  }
};
