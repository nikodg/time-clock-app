"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var LoginActions = require('../actions/loginActions');

var InitializeActions = {
	initApp: function () {
		var session = localStorage.getItem('tca_auth');
		console.log('checking session', session);
		if (session && session !== 'false') {

			console.log('authorize');
			LoginActions.checkInExisting(session);
		}
	}
};

module.exports = InitializeActions;