import { connect } from 'mongoose';

const database = connect(
  'mongodb+srv://rennan:rennan@cluster0.sh5jy.mongodb.net/app-memoria?retryWrites=true&w=majority',
  // 'mongodb://localhost:27017/app-memoria',
  {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

module.exports = database;
