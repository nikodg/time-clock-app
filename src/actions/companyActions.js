"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var API = require('../constants/apis').getApi();
var toastr = require('toastr');
var CompanyStore = require('../stores/companyStore');

var CompanyActions = {
    errorHandler: function (message) {
        toastr.remove();
        toastr.error(message);
        Dispatcher.dispatch({
            type: ActionTypes.ERROR_EMPLOYEES,
            data: false
        });
    },

    getCompanies: function (pageNumber, pageSize) {
        CompanyStore.setLoader(true);
        var url = 'companies?page=' + pageNumber + '&size=' + pageSize;

        var _this = this;
        API.getData(url)
            .done(function (data) {

                Dispatcher.dispatch({
                    type: ActionTypes.INITIALIZE_COMPANIES,
                    data: data
                });
            }).fail(function () {
                _this.errorHandler('Failed to load companies.');
            });
    },

    createCompany: function (company) {
        var _this = this;
        API.postData('companies', company)
            .done(function (response) {
                toastr.success('Company saved.');
                Dispatcher.dispatch({
                    type: ActionTypes.CREATE_COMPANY,
                    data: company
                });
            }).fail(function () {
                _this.errorHandler('Failed to save company.');
            });
    },

    updateCompany: function (company) {

        var _this = this;
        API.patchData('companies', company, company.id)
            .done(function (response) {
                toastr.success('Company updated.');
                Dispatcher.dispatch({
                    type: ActionTypes.UPDATE_COMPANY,
                    data: company
                });
            }).fail(function () {
                _this.errorHandler('Failed to update company.');
            });
    },

    deleteCompany: function (id) {
        var _this = this;
        API.deleteData('companies', id)
            .done(function (response) {
                toastr.success('company deleted.');
                Dispatcher.dispatch({
                    type: ActionTypes.DELETE_COMPANY,
                    data: id
                });
            }).fail(function () {
                _this.errorHandler('Failed to delete company.');
            });
    },

    searchList: function (keyword) {
        toastr.info('Searching companies...');
        var _this = this;
        API.searchData('companies', keyword)
            .done(function (response) {
                Dispatcher.dispatch({
                    type: ActionTypes.SEARCH_COMPANY,
                    data: response
                });
            }).fail(function () {
                _this.errorHandler('Failed to search company.');
            });
    }
};

module.exports = CompanyActions;