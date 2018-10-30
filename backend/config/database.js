/*
 * Database connectivity
 */
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/reddiapp');
//mongoose.connect('mongodb://localhost:27017/reddiapp');
//mongoose.connect('mongodb://reddiapp:reddiapp2780@localhost:27017/reddiapp');

//mongoose.connect('mongodb://user:pass@localhost:port/database')
mongoose.connect('mongodb://reddiapp:reddiapp2780@localhost:27017/reddiapp');
//check if we are connected successfully or not
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

export default db;
