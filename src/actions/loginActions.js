"use strict";

var API = require('../constants/apis');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var toastr = require('toastr');

var LoginActions = {

    checkIn: function (credentials) {

        // API.postData('login', credentials)
        //     .done(function (response) {
        //         toastr.success('Logged In Successfully');
        //         Dispatcher.dispatch({
        //             type: ActionTypes.LOG_IN,
        //             data: employee
        //         });
        //     }).fail(function () {
        //         toastr.error('Login Failed.');
        //     });


        Dispatcher.dispatch({
            type: ActionTypes.LOG_IN,
            data: true
        });
    },

    checkOut: function (sessionId) {

        // API.postData('logout', sessionId)
        //     .done(function (response) {
        //         toastr.success('Logged Out Successfully');
        //         Dispatcher.dispatch({
        //             type: ActionTypes.LOG_OUT,
        //             data: employee
        //         });
        //     }).fail(function () {
        //         toastr.error('Logout Failed.');
        //     });

        Dispatcher.dispatch({
            type: ActionTypes.LOG_OUT,
            data: false
        });
    }
};

module.exports = LoginActions;