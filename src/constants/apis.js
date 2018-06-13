'use strict';

var API = {
    baseURL: 'https://time-clock-service.herokuapp.com/api/',
    //proxy: 'https://cors-anywhere.herokuapp.com/',
    proxy: '',
    tempCount: 0, // TODO: remove tempCount
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
            success: function (response, status) {
                return response;
            },
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
            data: parsedData,
            contentType: 'application/json',
            crossDomain: true,
            success: function (response, status) {
                return response;
            },
            error: this.errorHandler
        });
    },
    patchData: function (path, data, id) {
        var url = this.proxy + this.baseURL + path + '/' + id;
        var parsedData = JSON.stringify(data);
        return $.ajax({
            url: url,
            method: 'PATCH',
            data: parsedData,
            contentType: 'application/json',
            crossDomain: true,
            success: function (response, status) {
                return response;
            },
            error: this.errorHandler
        });
    },
    deleteData: function (path, id) {
        var url = this.proxy + this.baseURL + path + '/' + id;
        return $.ajax({
            url: url,
            method: 'DELETE',
            contentType: 'application/json',
            crossDomain: true,
            success: function (response, status) {
                return response;
            },
            error: this.errorHandler
        });
    },
    searchData: function (path, keyword) {
        var url = this.proxy + this.baseURL + path + 'search/findByName?name=' + keyword;
        return $.ajax({
            url: url,
            method: 'GET',
            contentType: 'application/json',
            crossDomain: true,
            success: function (response, status) {
                return response;
            },
            error: this.errorHandler
        });
    }
};

module.exports = API;