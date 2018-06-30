"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var API = require('../constants/apis').getApi();
var toastr = require('toastr');

var employeeId = function(id){
    return {id: id};
};

var ListViewActions = {

    createListView: function (record, employees) {

        record.employeeList = employees;
        API.postData('employeeTimes/addEntry', record)
            .done(function (data) {

                Dispatcher.dispatch({
                    type: ActionTypes.CREATE_LISTVIEW,
                    data: data
                });

            }).fail(function () {
                toastr.error('Failed to save record.');
            });
    },

    createAbsence: function (record) {

        API.postData('employeeTimes/addAbsence', record)
            .done(function (data) {

                Dispatcher.dispatch({
                    type: ActionTypes.CREATE_ABSENCE,
                    data: data
                });

            }).fail(function () {
                toastr.error('Failed to save absence.');
            });
    },

    getListView: function (keyword, dateFrom, dateTo, leaveType, pageNumber, pageSize) {

        var url = 'employeeTimes/search/listView';
        url += '?employeeName=' + keyword;
        url += '&dateFrom=' + dateFrom;
        url += '&dateTo=' + dateTo;
        url += '&leaveType=' + leaveType;
        url += '&page=' + pageNumber;
        url += '&size=' + pageSize;

        API.getData(url)
            .done(function (data) {

            Dispatcher.dispatch({
                type: ActionTypes.INITIALIZE_LISTVIEW,
                data: data
            });

            }).fail(function () {
                toastr.error('Failed to load list view.');
            });
    },

    updateListView: function (listView) {

        API.patchData('employeeTimes', listView, listView.id)
            .done(function (response) {
                toastr.success('Record updated.');
                Dispatcher.dispatch({
                    type: ActionTypes.UPDATE_LISTVIEW,
                    data: listView
                });
            }).fail(function () {
                toastr.error('Failed to update record.');
            });
    },

    deleteListView: function (id) {
        API.deleteData('employeeTimes', id)
            .done(function (response) {
                toastr.success('Record deleted.');
                Dispatcher.dispatch({
                    type: ActionTypes.DELETE_LISTVIEW,
                    data: id
                });
            }).fail(function () {
                toastr.error('Failed to delete record.');
            });
    }
};

module.exports = ListViewActions;