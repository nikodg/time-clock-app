"use strict";

var API = require('../constants/apis').getApi();
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var toastr = require('toastr');

var WhoIsInActions = {
    
    getWhoIsIn: function (pageNumber, pageSize) {

        var url = 'whoIsIn?page=' + pageNumber + '&size=' + pageSize;

        API.getData(url)
            .done(function (data) {
                Dispatcher.dispatch({
                    type: ActionTypes.INITIALIZE_WHOISIN,
                    data: data
                });

            }).fail(function () {
                toastr.error('Failed to load who is in.');
            });
    }
};

module.exports = WhoIsInActions;