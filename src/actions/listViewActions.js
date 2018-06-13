"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var API = require('../constants/apis');
var toastr = require('toastr');

var ListViewActions = {

    getListView: function (keyword, dateFrom, dateTo) {
        var url = 'employeeTimes/search/listView?employeeName=' + keyword + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo;

        API.getData(url)
            .done(function (data) {

            Dispatcher.dispatch({
                type: ActionTypes.INITIALIZE_LISTVIEW,
                data: data
            });

            }).fail(function () {
                toastr.error('Failed to load who is in.');
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
        API.deleteData('listview', id)
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