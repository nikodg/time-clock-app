'use strict';

var API = {
    baseURL: 'https://time-clock-service.herokuapp.com/api/',
    proxy: 'https://cors-anywhere.herokuapp.com/',
    headers: {
        Authorization: "Basic " + localStorage.getItem('tca_auth')
    },
    redirecting: false,
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
            // window.location.assign('/');
        }
    },
    unathorizedHandler: function (xhr) {
        if (xhr.status === 401) {
            // alert('Invalid Credentials');
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
            crossDomain: true,
            headers: this.headers,
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
            crossDomain: true,
            headers: this.headers,
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
            crossDomain: true,
            headers: this.headers,
            success: this.successHandler,
            error: this.errorHandler.bind(this),
            statusCode: {
                401: this.statusCodeHandler.bind(this)
            }
        });
    },
    deleteData: function (path, id) {
        var confirmation = prompt("Are you sure you want to delete? (Yes/No)", "Yes");

        if (confirmation === 'Yes' || confirmation === 'yes') {
            var url = this.proxy + this.baseURL + path + '/' + id;
            return $.ajax({
                url: url,
                method: 'DELETE',
                contentType: 'application/json',
                crossDomain: true,
                headers: this.headers,
                success: this.successHandler,
                error: this.errorHandler.bind(this),
                statusCode: {
                    401: this.statusCodeHandler.bind(this)
                }
            });
        }
    },
    searchData: function (path, keyword) {
        var url = this.proxy + this.baseURL + path + '/search/findByName?name=' + keyword;
        return $.ajax({
            url: url,
            method: 'GET',
            contentType: 'application/json',
            crossDomain: true,
            headers: this.headers,
            success: this.successHandler,
            error: this.errorHandler.bind(this),
            statusCode: {
                401: this.statusCodeHandler.bind(this)
            }
        });
    }
};

module.exports = API;