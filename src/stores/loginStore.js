"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _session;
var _companyId;

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
    },

    getCompanyID: function () {
        return _companyId;
    }
});

Dispatcher.register(function (action) {

    switch (action.type) {
        case ActionTypes.LOG_IN:

            _session = action.data.session;
            if (action.data.username === 'csi_admin'){
                _companyId = 1;
            } else if (action.data.username === 'ccm_admin') {
                _companyId = 2;
            }

            localStorage.setItem('tca_auth', _session);
            localStorage.setItem('tca_name', action.data.username);
            LoginStore.emitChange();
            break;

        case ActionTypes.LOG_OUT:
            _session = false;
            _companyId = false;
            localStorage.removeItem('tca_auth');
            localStorage.removeItem('tca_name');
            LoginStore.emitChange();
            break;

        default: // No Op
    }
});

module.exports = LoginStore;