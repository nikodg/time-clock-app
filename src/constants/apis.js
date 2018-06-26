'use strict';
var LoginStore = require('../stores/loginStore');
var API = {
    baseURL: 'https://time-clock-service.herokuapp.com/api/',
    proxy: 'https://cors-anywhere.herokuapp.com/',
    // proxy: '',
    headers: {
        'Authorization': '1234'
    },
    errorHandler: function (xhr) {
        var error = JSON.parse(xhr.responseText);
        if (error.message === 'Unauthorized') {
            window.location.assign('/');
        } else {
            return false;
        }
    },
    successHandler: function (response){

        return response;
    },
    getData: function (path) {
        var url = this.proxy + this.baseURL + path;
        return $.ajax({
            url: url,
            method: 'GET',
            headers: this.headers,
            contentType: 'application/json',
            crossDomain: true,
            success: this.successHandler,
            error: this.errorHandler
        });
    },
    postData: function (path, data) {
        data.id = this.tempCount++;
        var url = this.proxy + this.baseURL + path;
        var parsedData = JSON.stringify(data);
        return $.ajax({
            url: url,
            method: 'POST',
            headers: this.headers,
            data: parsedData,
            contentType: 'application/json',
            crossDomain: true,
            success: this.successHandler,
            error: this.errorHandler
        });
    },
    patchData: function (path, data, id) {
        var url = this.proxy + this.baseURL + path + '/' + id;
        var parsedData = JSON.stringify(data);
        return $.ajax({
            url: url,
            method: 'PATCH',
            headers: this.headers,
            data: parsedData,
            contentType: 'application/json',
            crossDomain: true,
            success: this.successHandler,
            error: this.errorHandler
        });
    },
    deleteData: function (path, id) {
        var url = this.proxy + this.baseURL + path + '/' + id;
        return $.ajax({
            url: url,
            method: 'DELETE',
            headers: this.headers,
            contentType: 'application/json',
            crossDomain: true,
            success: this.successHandler,
            error: this.errorHandler
        });
    },
    searchData: function (path, keyword) {
        var url = this.proxy + this.baseURL + path + '/search/findByName?name=' + keyword;
        return $.ajax({
            url: url,
            method: 'GET',
            headers: this.headers,
            contentType: 'application/json',
            crossDomain: true,
            success: this.successHandler,
            error: this.errorHandler
        });
    },
    exportReport: function (path) {
        var url = this.proxy + this.baseURL + path;
        return $.ajax({
            url: url,
            method: 'GET',
            headers: this.headers,
            contentType: 'application/json',
            accept: 'text/csv',
            crossDomain: true,
            success: this.successHandler,
            error: this.errorHandler
        });
    }
};

module.exports = API;