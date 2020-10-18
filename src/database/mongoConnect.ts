import { connect } from 'mongoose';

const database = connect(
  'mongodb+srv://rennan:rennan@cluster0.sh5jy.mongodb.net/app-memoria?retryWrites=true&w=majority',
  {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

module.exports = database;
