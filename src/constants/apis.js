'use strict';

var API = {
    baseURL: 'https://time-clock-service.herokuapp.com/api/',
    proxy: 'https://cors-anywhere.herokuapp.com/',
    errorHandler: function (xhr, status, error) {
        console.log('Failed ajax call status', status);
        console.log('Failed ajax call error', error);
        return false;
    },
    getData: function (path) {
        var url = this.proxy + this.baseURL + path;
        return $.ajax({
            url: url,
            method: 'GET',
            contentType: 'application/json',
            crossDomain: true,
            success: function (data, status) {
                return data;
            },
            error: this.errorHandler
        });
    }
};

module.exports = API;