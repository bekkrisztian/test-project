const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    DATABASE: process.env.DB_DATABASE
}