'use strict';

var LoginStore = require('../stores/loginStore');

var API = {
    baseURL: 'api/',
    proxy: '',
    getHeader: function () {
        return {
            Authorization: 'Basic ' + LoginStore.checkSession()
        };
    },
    errorHandler: function (xhr) {
        switch (xhr.status) {

            case 401:
                localStorage.removeItem('tca_auth');
                localStorage.removeItem('tca_name');
                alert('Unathorized. Please login to continue.');
                window.location.assign('/');
                break;

            default:
                return false;
        }
    },
    unathorizedHandler: function (xhr) {
        if (xhr.status === 401) {
            return false;
        }
    },
    successHandler: function (response) {
        return response;
    },
    loginUser: function (session) {
        var url = this.proxy + this.baseURL;
        return $.ajax({
            url: url,
            method: 'GET',
            contentType: 'application/json',
            crossDomain: true,
            headers: {
                Authorization: 'Basic ' + session
            },
            success: this.successHandler,
            error: this.unathorizedHandler
        });
    },
    getData: function (path) {
        var url = this.proxy + this.baseURL + path;
        return $.ajax({
            url: url,
            method: 'GET',
            contentType: 'application/json',
            crossDomain: true,
            headers: this.getHeader(),
            success: this.successHandler,
            error: this.errorHandler.bind(this)
        });
    },
    postData: function (path, data) {
        var url = this.proxy + this.baseURL + path;
        var parsedData = JSON.stringify(data);

        return $.ajax({
            url: url,
            method: 'POST',
            data: parsedData,
            contentType: 'application/json',
            crossDomain: true,
            headers: this.getHeader(),
            success: this.successHandler,
            error: this.errorHandler.bind(this)
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
            headers: this.getHeader(),
            success: this.successHandler,
            error: this.errorHandler.bind(this)
        });
    },
    deleteData: function (path, id) {
        var url = this.proxy + this.baseURL + path + '/' + id;
        return $.ajax({
            url: url,
            method: 'DELETE',
            contentType: 'application/json',
            headers: this.getHeader(),
            success: this.successHandler,
            error: this.errorHandler,
            statusCode: {
                401: this.statusCodeHandler
            }
        });
    },
    searchData: function (path, keyword) {
        var url = this.proxy + this.baseURL + path + '/search/findByName?name=' + keyword;
        return $.ajax({
            url: url,
            method: 'GET',
            contentType: 'application/json',
            crossDomain: true,
            headers: this.getHeader(),
            success: this.successHandler,
            error: this.errorHandler.bind(this)
        });
    }
};

module.exports = API;