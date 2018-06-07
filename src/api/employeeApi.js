"use strict";
var $ = require('jquery');
var _ = require('lodash');
var API = require('../constants/apis');
var window = $;

var employees = [];

var EmployeeApi = {
	getAllEmployees: function() {
		// return _clone(employees);
		return API.getData('employees');
	},

	getEmployeeById: function(id) {
		var employee = _.find(employees, {id: id});
		// return _clone(employee);
	},
	
	saveEmployee: function(employee) {
		//pretend an ajax call to web api is made here
		console.log('Pretend this just saved the employee to the DB via AJAX call...');
		
		if (employee.id) {
			var existingEmployeeIndex = _.indexOf(employees, _.find(employees, {id: employee.id})); 
			employees.splice(existingEmployeeIndex, 1, employee);
		} else {
			// employee.id = _generateId(employee);
			employees.push(employee);
		}

		// return _clone(employee);
	},

	deleteEmployee: function(id) {
		console.log('Pretend this just deleted the employee from the DB via an AJAX call...');
		_.remove(employees, { id: id});
	}
};

module.exports = EmployeeApi;