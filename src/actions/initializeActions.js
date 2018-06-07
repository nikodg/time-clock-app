"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
// var EmployeeApi = require('../api/employeeApi');
var API = require('../constants/apis');

var InitializeActions = {
	initApp: function () {
		API.getData('employees')
			.done(function(data){
				Dispatcher.dispatch({
					type: ActionTypes.INITIALIZE,
					data: data
				});
			});
	}
};

module.exports = InitializeActions;