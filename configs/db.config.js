const { connect, connection } = require('mongoose');
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const prodMongoURI = 'mongodb+srv://'+mongoUser+':'+mongoPassword+'@cluster0.0hzv7.mongodb.net/?retryWrites=true&w=majority'
// const prodMongoURI = process.env.PROD_DATABASE_URL || '';
const devMongoURI = process.env.DEV_DATABASE_URL || '';

const configDB = _ => {
  const mongoURI = (process.env.NODE_ENV === 'production')
    ? prodMongoURI
    : devMongoURI;

  try {
    connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error('Initial Database Connection Error!', err);
  }

  connection.on('connected', _ =>
    console.log('Database connected ==> ', mongoURI)
  );

  connection.on('error', err =>
    console.error('Database Connection Error!\n', err)
  );

};

module.exports = {
  configDB
};