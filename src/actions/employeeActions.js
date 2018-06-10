"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var EmployeeApi = require('../api/employeeApi');
var ActionTypes = require('../constants/actionTypes');
var API = require('../constants/apis');
var toastr = require('toastr');

var EmployeeActions = {
	createEmployee: function(employee) {
		API.postData('employees', employee)
			.done(function(response){
				toastr.success('Employee saved.');
				Dispatcher.dispatch({
					type: ActionTypes.CREATE_EMPLOYEE,
					data: employee
				});
			}).fail(function(){
				toastr.error('Failed to save employee.');
			});
	},

	updateEmployee: function(employee) {
		
		API.patchData('employees', employee, employee.id)
			.done(function(response){
				toastr.success('Employee updated.');
				Dispatcher.dispatch({
					type: ActionTypes.UPDATE_EMPLOYEE,
					data: employee
				});
			}).fail(function(){
				toastr.error('Failed to update employee.');
			});
	},

	deleteEmployee: function(id) {
		API.deleteData('employees', id)
			.done(function(response){
				toastr.success('employee deleted.');
				Dispatcher.dispatch({
					type: ActionTypes.DELETE_EMPLOYEE,
					data: id
				});
			}).fail(function(){
				toastr.error('Failed to delete employee.');
			});
	},

	checkEmployee: function (id) {
		Dispatcher.dispatch({
			type: ActionTypes.CHECK_EMPLOYEE,
			data: id
		});
	}
};

module.exports = EmployeeActions;