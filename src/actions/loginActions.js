"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');

var LoginActions = {

    checkInExisting: function (session) {
        Dispatcher.dispatch({
            type: ActionTypes.LOG_IN_EXIST,
            data: session
        });
    },

    checkIn: function (session) {

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