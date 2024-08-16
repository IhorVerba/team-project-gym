import AppConfig from '../types/AppConfig';
require('dotenv').config();

/**
 * Configuration object for the application
 * @type {AppConfig}
 * @property {string} MONGO_URI - The connection string for the MongoDB database
 * @property {string} CONNECTION_STRING - The connection string for the MongoDB database
 * @see {@link CONNECTION_STRING} from the .env file
 */
const config: AppConfig = {
  MONGO_URI: process.env.CONNECTION_STRING as string,
};

export default config;
