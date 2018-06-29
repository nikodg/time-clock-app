'use strict';

var LoginStore = require('../stores/loginStore');
var swal = require('sweetalert2');

var API = {
    baseURL: 'api/',
    proxy: '',
    redirecting: false,
    getHeader: function () {
        return {
            Authorization: 'Basic ' + LoginStore.checkSession()
        };
    },
    errorHandler: function (xhr) {
        if (xhr.status === 401) {
            this.statusCodeHandler();
        } else {
            return false;
        }
    },
    statusCodeHandler: function () {
        if (!this.redirecting) {
            localStorage.removeItem('tca_auth');
            alert('Unathorized. Please login to continue.');
            this.redirecting = true;
            window.location.assign('/');
        }
    },
    unathorizedHandler: function (xhr) {
        if (xhr.status === 401) {
            return;
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
            headers: this.getHeader(),
            success: this.successHandler,
            error: this.errorHandler.bind(this),
            statusCode: {
                401: this.statusCodeHandler.bind(this)
            }
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
            headers: this.getHeader(),
            success: this.successHandler,
            error: this.errorHandler.bind(this),
            statusCode: {
                401: this.statusCodeHandler.bind(this)
            }
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
            headers: this.getHeader(),
            success: this.successHandler,
            error: this.errorHandler.bind(this),
            statusCode: {
                401: this.statusCodeHandler.bind(this)
            }
        });
    },
    deleteData: function (path, id) {
        swal({
            title: '',
            text: 'Are you sure you want to delete this item?',
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        }).then(function (result) {
            var url = this.proxy + this.baseURL + path + '/' + id;
            return $.ajax({
                url: url,
                method: 'DELETE',
                contentType: 'application/json',
                crossDomain: true,
                headers: LoginStore.checkSession(),
                success: this.successHandler,
                error: this.errorHandler.bind(this),
                statusCode: {
                    401: this.statusCodeHandler.bind(this)
                }
            });
        });
    },
    searchData: function (path, keyword) {
        var url = this.proxy + this.baseURL + path + '/search/findByName?name=' + keyword;
        return $.ajax({
            url: url,
            method: 'GET',
            contentType: 'application/json',
            headers: this.getHeader(),
            success: this.successHandler,
            error: this.errorHandler.bind(this),
            statusCode: {
                401: this.statusCodeHandler.bind(this)
            }
        });
    }
};

module.exports = API;