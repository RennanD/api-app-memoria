import { connect } from 'mongoose';

const database = connect(`${process.env.MONGO_URL}`, {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = database;
