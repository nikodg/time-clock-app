"use strict";

var API = require('../constants/apis');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var toastr = require('toastr');

var LoginActions = {

    checkInExisting: function (session) {
        console.log('checkInExisting');
        Dispatcher.dispatch({
            type: ActionTypes.LOG_IN_EXIST,
            data: session
        });
    },

    checkIn: function (credentials) {

        var session = window.btoa(credentials.username + ':' + credentials.password);
        console.log(session);

        Dispatcher.dispatch({
            type: ActionTypes.LOG_IN,
            data: session
        });
    },

    checkOut: function (sessionId) {
        Dispatcher.dispatch({
            type: ActionTypes.LOG_OUT,
            data: false
        });
    }
};

module.exports = LoginActions;