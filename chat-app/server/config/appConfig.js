const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    URL: process.env.URL,
    KEY: process.env.KEY,
}