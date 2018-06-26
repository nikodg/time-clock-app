'use strict';
var config = require('./config.json');
module.exports = {
    getApi: function () {
        console.log('getApi', config);
        switch (config.env.NODE_ENV) {
            case 'production':
            case 'PRODUCTION':
            case 'prod':
            case 'PROD':
                return require("./prodApis");
            case 'developement':
            case 'DEVELOPMENT':
            case 'dev':
            case 'DEV':
            default:
                return require("./devApi");
        }
    }
};
