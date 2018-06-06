"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EmployeeApi = require('../api/employeeApi');

var InitializeActions = {
	initApp: function() {
		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				employees: EmployeeApi.getAllEmployees()
			}
		});
	}
};

module.exports = InitializeActions;