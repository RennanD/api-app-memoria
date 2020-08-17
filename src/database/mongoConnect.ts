import { connect } from 'mongoose';

const database = connect(
  `mongodb://app-memoria:app-memoria-test@localhost:27027/app-memoria`,
  {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

module.exports = database;
