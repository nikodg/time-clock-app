"use strict";

var React = require('react');
var Router = require('react-router');
var Redirect = require('react-router').Redirect;
var EmployeeForm = require('./employeeForm');
var EmployeeActions = require('../../actions/employeeActions');
var EmployeeStore = require('../../stores/employeeStore');
var CompanyStore = require('../../stores/companyStore');

var ManageEmployeePage = React.createClass({
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionTo: function (transition, component) {
			if (CompanyStore.getAllCompanies().length === 0) {
				alert('Please add a company first.');
				transition.abort();
			}
		},
		willTransitionFrom: function(transition, component) {
			if (component.state.dirty && !confirm('Leave without saving?')) {
				transition.abort();
			}
		}
	},

	getInitialState: function() {

		var companyOptions = [];
		var companies = CompanyStore.getAllCompanies();

		companies.forEach(function(company){
			var option = {
				label: company.name,
				value: company.id
			};

			companyOptions.push(option);
		});

		return {
			employee: {
				id: null,
				fullName: '',
				fingerprintId: null,
				pin: null,
				createdDate: null,
				company: companyOptions[0].value
			},
			companies: companyOptions,
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		var employeeId = this.props.params.id; //from the path '/employee:id'
		if (employeeId) {
			var employee = EmployeeStore.getEmployeeById(employeeId);
			employee.company = employee.company.id;
			this.setState({employee: employee});
		}
	},

	setEmployeeState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.employee[field] = value;
		return this.setState({employee: this.state.employee});
	},

	employeeFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {}; //clear any previous errors.

		if (this.state.employee.fullName.length < 3) {
			this.state.errors.fullName = 'First name must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.employee.company.length === '') {
			this.state.errors.company = 'Please select a company.';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveEmployee: function(event) {
		event.preventDefault();

		if (!this.employeeFormIsValid()) {
			return;
		}

		if (this.state.employee.id) {
			EmployeeActions.updateEmployee(this.state.employee);
		} else {
			EmployeeActions.createEmployee(this.state.employee);
		}
		
		this.setState({dirty: false});
		this.transitionTo('employees');
	},

	render: function() {
		return (
			<EmployeeForm
				employee={this.state.employee}
				companies={this.state.companies}
				onChange={this.setEmployeeState}
				onSave={this.saveEmployee}
				errors={this.state.errors} />
		);
	}
});

module.exports = ManageEmployeePage;