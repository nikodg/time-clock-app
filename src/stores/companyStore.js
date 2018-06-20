"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';
var toastr = require('toastr');

var _companies = [];

var CompanyStore = assign({}, EventEmitter.prototype, {

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAllCompanies: function () {
        return _companies;
    },

    getCompanyById: function (id) {
        // return _.find(_companies, {id: id});

        // TODO: ask typeof id
        return _companies.find(function (company) {
            return company.id.toString() === id;
        });
    }
});

Dispatcher.register(function (action) {
    switch (action.type) {

        case ActionTypes.INITIALIZE_COMPANIES:
            _companies = action.data._embedded.companies;
            CompanyStore.emitChange();
            break;

        case ActionTypes.CREATE_COMPANY:
            _companies.push(action.data);
            CompanyStore.emitChange();
            break;

        case ActionTypes.UPDATE_COMPANY:
            var existingCompany = _.find(_companies, { id: action.data.id });
            var existingCompanyIndex = _.indexOf(_companies, existingCompany);
            _companies.splice(existingCompanyIndex, 1, action.data);
            CompanyStore.emitChange();
            break;

        case ActionTypes.DELETE_COMPANY:
            _.remove(_companies, function (company) {
                return action.data === company.id;
            });
            CompanyStore.emitChange();
            break;

        case ActionTypes.SEARCH_COMPANY:
            _companies = action.data._embedded.companies;
            toastr.clear();
            CompanyStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = CompanyStore;