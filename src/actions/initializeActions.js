"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
// var EmployeeApi = require('../api/employeeApi');
var API = require('../constants/apis');
var toastr = require('toastr');

var InitializeActions = {
	initApp: function () {
		API.getData('employees')
			.done(function(data){

				// TODO: remove tempCount
				API.tempCount = data.page.totalElements;

				Dispatcher.dispatch({
					type: ActionTypes.INITIALIZE,
					data: data
				});
			}).fail(function(){
				toastr.error('Failed to load employees.');
			});
	}
};

module.exports = InitializeActions;