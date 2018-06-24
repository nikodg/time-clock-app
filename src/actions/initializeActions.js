"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var CompanyActions = require('../actions/companyActions');
var EmployeeActions = require('../actions/employeeActions');
var WhoIsInActions = require('../actions/whoIsInActions');
var ListViewActions = require('../actions/listViewActions');
var moment = require('moment');

var InitializeActions = {
	initApp: function () {
		//
	}
};

module.exports = InitializeActions;