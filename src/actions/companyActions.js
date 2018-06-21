"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var API = require('../constants/apis');
var toastr = require('toastr');

var CompanyActions = {

    getCompanies: function (pageNumber, pageSize) {

        var url = 'companies?page=' + pageNumber + '&size=' + pageSize;

        API.getData(url)
            .done(function (data) {

                Dispatcher.dispatch({
                    type: ActionTypes.INITIALIZE_COMPANIES,
                    data: data
                });
            }).fail(function () {
                toastr.error('Failed to load companies.');
            });
    },

    createCompany: function (company) {
        API.postData('companies', company)
            .done(function (response) {
                toastr.success('Company saved.');
                Dispatcher.dispatch({
                    type: ActionTypes.CREATE_COMPANY,
                    data: company
                });
            }).fail(function () {
                toastr.error('Failed to save company.');
            });
    },

    updateCompany: function (company) {

        API.patchData('companies', company, company.id)
            .done(function (response) {
                toastr.success('Company updated.');
                Dispatcher.dispatch({
                    type: ActionTypes.UPDATE_COMPANY,
                    data: company
                });
            }).fail(function () {
                toastr.error('Failed to update company.');
            });
    },

    deleteCompany: function (id) {
        API.deleteData('companies', id)
            .done(function (response) {
                toastr.success('company deleted.');
                Dispatcher.dispatch({
                    type: ActionTypes.DELETE_COMPANY,
                    data: id
                });
            }).fail(function () {
                toastr.error('Failed to delete company.');
            });
    },

    searchList: function (keyword) {
        toastr.info('Searching companies...');
        API.searchData('companies', keyword)
            .done(function (response) {
                Dispatcher.dispatch({
                    type: ActionTypes.SEARCH_COMPANY,
                    data: response
                });
            }).fail(function () {
                toastr.remove();
                toastr.error('Failed to search company.');
            });
    }
};

module.exports = CompanyActions;