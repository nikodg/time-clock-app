"use strict";

var React = require('react');
var Router = require('react-router');
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
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		var companyId = this.props.params.id; //from the path '/company:id'
		if (companyId) {
			this.setState({company: CompanyStore.getCompanyById(companyId) });
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
		this.state.errors = {}; //clear any previous errors.

		if (this.state.company.name.length < 3) {
			this.state.errors.name = 'Company name must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveCompany: function(event) {
		event.preventDefault();

		if (!this.companyFormIsValid()) {
			return;
		}

		if (this.state.company.id) {
			CompanyActions.updateCompany(this.state.company);
		} else {
			CompanyActions.createCompany(this.state.company);
		}
		
		this.setState({dirty: false});
		this.transitionTo('companies');
	},

	render: function() {
		return (
			<CompanyForm
				company={this.state.company}
				onChange={this.setCompanyState}
				onSave={this.saveCompany}
				errors={this.state.errors} />
		);
	}
});

module.exports = ManageCompanyPage;