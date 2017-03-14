module.exports = {

    secret: 'robotmonkeylaserexplosion',
    database: 'mongodb://127.0.0.1/tate',
    port: process.env.PORT || 3030, // used to create, sign, and verify tokens
    baseUrl: "http://localhost:3030",
};
