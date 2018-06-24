"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var EmployeeApi = require('../api/employeeApi');
var ActionTypes = require('../constants/actionTypes');
var API = require('../constants/apis').getApi();
var toastr = require('toastr');

var EmployeeActions = {

	getEmployees: function (pageNumber, pageSize) {

		var url = 'employees?page=' + pageNumber + '&size=' + pageSize;

		API.getData(url)
			.done(function (data) {

				Dispatcher.dispatch({
					type: ActionTypes.INITIALIZE_EMPLOYEES,
					data: data
				});
			}).fail(function () {
				toastr.error('Failed to load employees.');
			});
	},

	createEmployee: function(employee) {

		var fullLink = 'http://time-clock-service.herokuapp.com/api/companies/' + employee.company;
		employee.company = fullLink;

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

	updateEmployee: function (employee) {

		var fullLink = 'http://time-clock-service.herokuapp.com/api/companies/' + employee.company;
		employee.company = fullLink;
		
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

	searchList: function (keyword) {
		toastr.info('Searching employees...');
		API.searchData('employees', keyword)
			.done(function (response) {
				Dispatcher.dispatch({
					type: ActionTypes.SEARCH_EMPLOYEE,
					data: response
				});
			}).fail(function () {
				toastr.remove();
				toastr.error('Failed to search employee.');
			});
	}
};

module.exports = EmployeeActions;