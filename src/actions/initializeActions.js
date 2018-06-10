"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
// var EmployeeApi = require('../api/employeeApi');
var API = require('../constants/apis');
var toastr = require('toastr');

var initializeWhoIsIn = function(){

	// API.getData('whoisin')
	// 	.done(function (data) {

	// 		Dispatcher.dispatch({
	// 			type: ActionTypes.INITIALIZE_WHOISIN,
	// 			data: data
	// 		});

	// 	}).fail(function () {
	// 		toastr.error('Failed to load who is in.');
	// 	});

	// TODO: correct API path whoisin
	Dispatcher.dispatch({
		type: ActionTypes.INITIALIZE_WHOISIN,
		data: {
			_embedded: {
				whoisin: []
			}
		}
	});
};

var initializeListView = function () {

	// API.getData('listview')
	// 	.done(function (data) {

	// 		Dispatcher.dispatch({
	// 			type: ActionTypes.INITIALIZE_LISTVIEW,
	// 			data: data
	// 		});

	// 	}).fail(function () {
	// 		toastr.error('Failed to load who is in.');
	// 	});

	// TODO: correct API path listview
	Dispatcher.dispatch({
		type: ActionTypes.INITIALIZE_LISTVIEW,
		data: {
			_embedded: {
				listview: []
			}
		}
	});
};

var initializeEmployees = function () {

	API.getData('employees')
		.done(function (data) {

			// TODO: remove tempCount
			API.tempCount = data.page.totalElements;

			Dispatcher.dispatch({
				type: ActionTypes.INITIALIZE_EMPLOYEES,
				data: data
			});
		}).fail(function () {
			toastr.error('Failed to load employees.');
		});
};

var InitializeActions = {
	initApp: function () {
		initializeListView();
		initializeWhoIsIn();
		initializeEmployees();
	}
};

module.exports = InitializeActions;