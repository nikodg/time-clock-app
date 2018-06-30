"use strict";

var React = require('react');
var Router = require('react-router');
var Dispatcher = require('../../dispatcher/appDispatcher');
var ActionTypes = require('../../constants/actionTypes');
var CompanyForm = require('./companyForm');
var CompanyActions = require('../../actions/companyActions');
var CompanyStore = require('../../stores/companyStore');

var ManageCompanyPage = React.createClass({
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionFrom: function(transition, component) {
			if (component.state.dirty && !confirm('Leave without saving?')) {
				transition.abort();
			}
		}
	},

	getInitialState: function() {
		return {
			company: {
				name: ''
			},
			saving: false,
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		CompanyStore.addChangeListener(this._onChange);
		
		var companyId = this.props.params.id;
		if (companyId) {
			this.setState({company: CompanyStore.getCompanyById(companyId) });
		}
	},

	componentWillUnmount: function () {
		CompanyStore.removeChangeListener(this._onChange);
	},

	_onChange: function () {

		this.setState({saving: false});

		var companyId = this.props.params.id;
		if (!companyId) {
			this.setState({
				company: {
					name: ''
				} 
			});
		}
	},

	setCompanyState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.company[field] = value;
		return this.setState({company: this.state.company});
	},

	companyFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {};

		if (this.state.company.name.length < 3) {
			this.state.errors.name = 'Company name must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveCompany: function(event) {
		event.preventDefault();
		
		this.setState({ 
			dirty: false,
			saving: true
		});

		if (!this.companyFormIsValid()) {
			this.setState({ saving: false });
			return;
		}

		if (this.state.company.id) {
			CompanyActions.updateCompany(this.state.company);
		} else {
			CompanyActions.createCompany(this.state.company);
		}
	},

	cancelState: function(){
		this.transitionTo('companies');
	},

	render: function() {
		return (
			<CompanyForm
				company={this.state.company}
				errors={this.state.errors}
				saving={this.state.saving}
				onSave={this.saveCompany}
				onChange={this.setCompanyState}
				cancel={this.cancelState} />
		);
	}
});

Dispatcher.register(function (action) {

	switch (action.type) {
		case ActionTypes.ERROR_COMPANY:
			ManageCompanyPage._onChange();
			break;

		default: // No Op
	}
});

module.exports = ManageCompanyPage;