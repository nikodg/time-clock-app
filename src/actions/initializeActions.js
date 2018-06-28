"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var LoginActions = require('../actions/loginActions');

var InitializeActions = {
	initApp: function () {
		var session = localStorage.getItem('tca_auth');
		if (session && session !== 'false') {
			LoginActions.checkInExisting(session);
		}
	}
};

module.exports = InitializeActions;