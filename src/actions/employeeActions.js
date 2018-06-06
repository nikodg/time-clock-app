"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var EmployeeApi = require('../api/employeeApi');
var ActionTypes = require('../constants/actionTypes');

var EmployeeActions = {
	createEmployee: function(employee) {
		var newEmployee = EmployeeApi.saveEmployee(employee);

		//Hey dispatcher, go tell all the stores that an employee was just created.
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_EMPLOYEE,
			employee: newEmployee
		});
	},

	updateEmployee: function(employee) {
		var updatedEmployee = EmployeeApi.saveEmployee(employee);

		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_EMPLOYEE,
			employee: updatedEmployee
		});
	},

	deleteEmployee: function(id) {
		EmployeeApi.deleteEmployee(id);

		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_EMPLOYEE,
			id: id
		});
	}
};

module.exports = EmployeeActions;