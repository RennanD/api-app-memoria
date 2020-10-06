import { connect } from 'mongoose';

const database = connect('mongodb://localhost:27017/teste2', {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = database;
