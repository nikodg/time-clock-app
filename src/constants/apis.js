'use strict';
(function () {
    module.exports = {
        getApi: function () {
            switch (process.env.NODE_ENV) {
                case 'developement':
                case 'DEVELOPMENT':
                case 'dev':
                case 'DEV':
                    return require("./devApi");
                case 'production':
                case 'PRODUCTION':
                case 'prod':
                case 'PROD':
                    return require("./prodApis");
            }
        }
    };
})();