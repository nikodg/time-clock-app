'use strict';

var API = {
    baseURL: 'api/',
    proxy: '',
    headers: {
        Authorization: localStorage.getItem('tca_auth')
    },
    errorHandler: function (xhr) {
        var error = JSON.parse(xhr.responseText);
        if (error.message === 'Unauthorized') {
            localStorage.removeItem('tca_auth');
            alert('Unathorized. Please login to continue.');
            window.location.assign('/');
        } else {
            return false;
        }
    },
    successHandler: function (response) {
        return response;
    },
    getData: function (path) {
        var url = this.proxy + this.baseURL + path;
        return $.ajax({
            url: url,
            method: 'GET',
            contentType: 'application/json',
            headers: this.headers,
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
            data: parsedData,
            contentType: 'application/json',
            headers: this.headers,
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
            data: parsedData,
            contentType: 'application/json',
            headers: this.headers,
            success: this.successHandler,
            error: this.errorHandler
        });
    },
    deleteData: function (path, id) {
        var url = this.proxy + this.baseURL + path + '/' + id;
        return $.ajax({
            url: url,
            method: 'DELETE',
            contentType: 'application/json',
            headers: this.headers,
            success: this.successHandler,
            error: this.errorHandler
        });
    },
    searchData: function (path, keyword) {
        var url = this.proxy + this.baseURL + path + '/search/findByName?name=' + keyword;
        return $.ajax({
            url: url,
            method: 'GET',
            contentType: 'application/json',
            headers: this.headers,
            success: this.successHandler,
            error: this.errorHandler
        });
    }
};

module.exports = API;