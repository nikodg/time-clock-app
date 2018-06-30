"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');

var LoginActions = {

    checkIn: function (session, username) {
        Dispatcher.dispatch({
            type: ActionTypes.LOG_IN,
            data: {
                session: session,
                username: username
            }
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