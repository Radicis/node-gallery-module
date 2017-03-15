module.exports = {
    secret: 'foobar',
    database: process.env.MONGODB_URI || 'mongodb://127.0.0.1/tate',
    port: process.env.PORT || 3030, // used to create, sign, and verify tokens
    baseUrl: process.env.HEROKU_URL || "http://localhost:3030/"
};
