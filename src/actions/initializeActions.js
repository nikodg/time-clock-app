"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var LoginActions = require('../actions/loginActions');

var InitializeActions = {
	initApp: function () {
		var session = localStorage.getItem('tca_auth');

		if (session && session !== 'false') {
			var username = localStorage.getItem('tca_name');
			LoginActions.checkIn(session, username);
		}
	}
};

module.exports = InitializeActions;