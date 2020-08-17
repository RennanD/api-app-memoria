import { connect } from 'mongoose';

const database = connect(
  'mongodb+srv://rennan:ld2b3rwi@cluster0.sh5jy.mongodb.net/app-memoria?retryWrites=true&w=majority',
  {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

module.exports = database;
