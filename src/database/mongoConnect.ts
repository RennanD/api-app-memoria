import { connect } from 'mongoose';

const database = connect(`${process.env.MONGO_URL}`, {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = database;
