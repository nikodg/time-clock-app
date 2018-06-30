"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';
var toastr = require('toastr');

var _employees = [];
var _pagination = {
	number: 0,
	size: 10
};
var _loader = false;

var EmployeeStore = assign({}, EventEmitter.prototype, {

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function () {
		_loader = false;
		this.emit(CHANGE_EVENT);
	},

	getAllEmployees: function() {
		return _employees;
	},

	getEmployeeById: function(id) {
		return _employees.find(function(employee){
			return employee.id.toString() === id;
		});
	},

	getPagination: function () {
		return _pagination;
	},

	getLoader: function () {
		return _loader;
	},

	setLoader: function (state) {
		_loader = state;
	}
});

Dispatcher.register(function (action) {
	switch(action.type) {
		
		case ActionTypes.INITIALIZE_EMPLOYEES:
			_employees = action.data._embedded.employees;
			
			if (action.data.page) {
				_pagination = action.data.page;
			}
			
			EmployeeStore.emitChange();
			break;

		case ActionTypes.CREATE_EMPLOYEE:
			// _employees.push(action.data);
			EmployeeStore.emitChange();
			break;

		case ActionTypes.UPDATE_EMPLOYEE:
			// var existingEmployee = _.find(_employees, {id: action.data.id});
			// var existingEmployeeIndex = _.indexOf(_employees, existingEmployee); 
			// _employees.splice(existingEmployeeIndex, 1, action.data);
			EmployeeStore.emitChange();
			break;	

		case ActionTypes.DELETE_EMPLOYEE:
			_.remove(_employees, function(employee) {
				return action.data === employee.id;
			});
			EmployeeStore.emitChange();
			break;

		case ActionTypes.SEARCH_EMPLOYEE:
			_employees = action.data._embedded.employees;
			if (action.data.page) {
				_pagination = action.data.page;
			}
			toastr.clear();
			EmployeeStore.emitChange();
			break;

		default:
			// no op
	}
});

module.exports = EmployeeStore;