"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _listView = [];

var ListViewStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAllListView: function () {
        return _listView;
    },

    getRecordById: function (id) {
        // return _.find(_listViews, {id: id});

        // TODO: ask typeof id
        return _listView.find(function (listView) {
            return listView.id.toString() === id;
        });
    }
});

Dispatcher.register(function (action) {
    switch (action.actionType) {

        case ActionTypes.INITIALIZE_LISTVIEW:
            _listView = action.data._embedded.listview;
            ListViewStore.emitChange();
            break;

        case ActionTypes.UPDATE_LISTVIEW:
            var existingRecord = _.find(_listView, { id: action.data.id });
            var existingRecordIndex = _.indexOf(_listView, existingRecord);
            _listView.splice(existingRecordIndex, 1, action.data);
            ListViewStore.emitChange();
            break;

        case ActionTypes.DELETE_LISTVIEW:
            _.remove(_listView, function (record) {
                return action.data === record.id;
            });
            ListViewStore.emitChange();
            break;

        default: // No Op
    }
});

module.exports = ListViewStore;