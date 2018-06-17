"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var API = require('../constants/apis');
var toastr = require('toastr');

var employeeId = function(id){
    return {id: id};
};

var ListViewActions = {

    createListView: function (record, employees) {

        record.employeeList = employees;
        console.log(record);
        API.postData('employeeTimes/addEntry', record)
            .done(function (data) {

                Dispatcher.dispatch({
                    type: ActionTypes.INITIALIZE_LISTVIEW,
                    data: data
                });

            }).fail(function () {
                toastr.error('Failed to load list view.');
            });
    },

    getListView: function (keyword, dateFrom, dateTo, leaveType) {
        var url = 'employeeTimes/search/listView?employeeName=' + keyword;
        url += '&dateFrom=' + dateFrom;
        url += '&dateTo=' + dateTo;
        url += '&leaveType=' + leaveType;

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

        API.patchData('listview', listView, listView.id)
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