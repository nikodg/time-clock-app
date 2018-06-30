"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var API = require('../constants/apis').getApi();
var toastr = require('toastr');
var LoginStore = require('../stores/loginStore');

var EmployeeActions = {
	errorHandler: function (message) {
		toastr.remove();
		toastr.error(message);
		Dispatcher.dispatch({
			type: ActionTypes.ERROR_EMPLOYEES,
			data: false
		});
	},
	getEmployees: function (pageNumber, pageSize) {

		// var url = 'employees?page=' + pageNumber + '&size=' + pageSize;
		var url = 'companies/' + LoginStore.getCompanyID() + '/employees?page=' + pageNumber + '&size=' + pageSize;

		var _this = this;
		API.getData(url)
			.done(function (data) {

				Dispatcher.dispatch({
					type: ActionTypes.INITIALIZE_EMPLOYEES,
					data: data
				});

			}).fail(function () {
				_this.errorHandler('Failed to load employees.');
			});
	},

	createEmployee: function(employee) {

		// var fullLink = 'http://time-clock-service.herokuapp.com/api/companies/' + employee.company;
		// employee.company = fullLink;
		var employeeCopy = JSON.parse(JSON.stringify(employee));
		var fullLink = API.baseURL + 'companies/' + LoginStore.getCompanyID();
		employeeCopy.company = fullLink;

		var _this = this;
		API.postData('employees', employeeCopy)
			.done(function (response) {
				toastr.success('Employee saved.');
				Dispatcher.dispatch({
					type: ActionTypes.CREATE_EMPLOYEE,
					data: employeeCopy
				});
			}).fail(function (error) {
				if(error.status === 409) {
					_this.errorHandler('Employee ID already exist.');
				} else {
					_this.errorHandler('Failed to save employee.');
				}
			});
	},

	updateEmployee: function (employee) {

		var employeeCopy = JSON.parse(JSON.stringify(employee));
		var fullLink = API.baseURL + 'companies/' + LoginStore.getCompanyID();
		employeeCopy.company = fullLink;
		
		var _this = this;
		API.patchData('employees', employeeCopy, employeeCopy.id)
			.done(function(response){
				toastr.success('Employee updated.');
				Dispatcher.dispatch({
					type: ActionTypes.UPDATE_EMPLOYEE,
					data: employeeCopy
				});
			}).fail(function(){
				_this.errorHandler('Failed to update employee.');
			});
	},

	deleteEmployee: function(id) {
		var _this = this;
		API.deleteData('employees', id)
			.done(function(response){
				toastr.success('employee deleted.');
				Dispatcher.dispatch({
					type: ActionTypes.DELETE_EMPLOYEE,
					data: id
				});
			}).fail(function(){
				_this.errorHandler('Failed to delete employee.');
			});
	},

	searchList: function (keyword) {
		toastr.info('Searching employees...');
		var _this = this;
		API.searchData('employees', keyword)
			.done(function (response) {
				Dispatcher.dispatch({
					type: ActionTypes.SEARCH_EMPLOYEE,
					data: response
				});
			}).fail(function (error) {
				_this.errorHandler('Failed to search employee.');
			});
	}
};

module.exports = EmployeeActions;