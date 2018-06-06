"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _employees = [];

var EmployeeStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllEmployees: function() {
		return _employees;
	},

	getEmployeeById: function(id) {
		return _.find(_employees, {id: id});
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_employees = action.initialData.employees;
			EmployeeStore.emitChange();
			break;
		case ActionTypes.CREATE_EMPLOYEE:
			_employees.push(action.employee);
			EmployeeStore.emitChange();
			break;
		case ActionTypes.UPDATE_EMPLOYEE:
			var existingEmployee = _.find(_employees, {id: action.employee.id});
			var existingEmployeeIndex = _.indexOf(_employees, existingEmployee); 
			_employees.splice(existingEmployeeIndex, 1, action.employee);
			EmployeeStore.emitChange();
			break;	
		case ActionTypes.DELETE_EMPLOYEE:
			_.remove(_employees, function(employee) {
				return action.id === employee.id;
			});
			EmployeeStore.emitChange();
			break;
		default:
			// no op
	}
});

module.exports = EmployeeStore;