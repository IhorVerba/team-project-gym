const mongoose = require('mongoose');
const config = require('./config');

/**
 * Connects to the MongoDB database
 * @returns {Promise<void>} A promise that resolves when the connection is established
 * @throws {Error} Throws an error if the connection fails
 * @see {@link https://mongoosejs.com/docs/api/connection.html#connection_Connection-readyState|mongoose.Connection.readyState}
 */
const connectDb = async () => {
  try {
    await mongoose.connect(config.default.MONGO_URI);
    console.log('MongoDB connection has been started');
  } catch (MongooseError) {
    console.log('Error connecting to MongoDB', MongooseError);
  }
};

mongoose.connection.on('connected', () => console.log('MongoDB connected'));
mongoose.connection.on('disconnected', () =>
  console.log('MongoDB disconnected'),
);
mongoose.connection.on('reconnected', () => console.log('MongoDB reconnected'));
mongoose.connection.on('disconnecting', () =>
  console.log('MongoDB disconnecting'),
);
mongoose.connection.on('close', () => console.log('MongoDB connection closed'));

connectDb();

module.exports = mongoose;
