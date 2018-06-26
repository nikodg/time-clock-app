"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _session;

var LoginStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    checkSession: function () {
        return _session;
    }
});

Dispatcher.register(function (action) {

    switch (action.type) {
        case ActionTypes.LOG_IN_EXIST:
            console.log('LoginStore login exist');
            _session = action.data;
            localStorage.setItem('tca_auth', _session);
            LoginStore.emitChange();
            break;

        case ActionTypes.LOG_IN:
            _session = action.data;
            localStorage.setItem('tca_auth', _session);
            LoginStore.emitChange();
            break;

        case ActionTypes.LOG_OUT:
            _session = false;
            localStorage.setItem('tca_auth', _session);
            LoginStore.emitChange();
            break;

        default: // No Op
    }
});

module.exports = LoginStore;