"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _whoIsIns = [];
var _pagination = {
    number: 0,
    size: 10
};
var _loader = false;

var WhoIsInStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        _loader = false;
        this.emit(CHANGE_EVENT);
    },

    getAllWhoIsIn: function () {
        return _whoIsIns;
    },

    getPagination: function () {
        return _pagination;
    },

    getLoader: function () {
        return _loader;
    },

    setLoader: function (state) {
        _loader = state;
    }
});

Dispatcher.register(function (action) {
    
    switch (action.type) {
        case ActionTypes.INITIALIZE_WHOISIN:
            if (Object.keys(action.data).length) {
                _whoIsIns = action.data._embedded.whoIsIns;
            }

            if (action.data.page) {
                _pagination = action.data.page;
            }
            
            WhoIsInStore.emitChange();
            break;

        default: // No Op
    }
});

module.exports = WhoIsInStore;