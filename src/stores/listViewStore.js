"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _listView = [];
var _leaveOptions = [
    { label: 'Present', value: '' },
    { label: 'Holiday', value: 'Holiday' },
    { label: 'Sick', value: 'Sick' },
    { label: 'Vacation', value: 'Vacation' },
    { label: 'Personal', value: 'Personal' },
    { label: 'Other', value: 'Other' }
];
var _pagination = {
    number: 0,
    size: 10
};

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
    
    getLeaveOptions: function () {
        return _leaveOptions;
    },

    getRecordById: function (id) {
        return _listView.find(function (listView) {
            return listView.id === id;
        });
    },

    getPagination: function () {
        return _pagination;
    }
});

Dispatcher.register(function (action) {
    switch (action.type) {

        case ActionTypes.INITIALIZE_LISTVIEW:
            _listView = action.data;

            if (action.data.page) {
                _pagination = action.data.page;
            }
            
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