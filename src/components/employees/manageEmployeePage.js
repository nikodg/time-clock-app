"use strict";

var React = require('react');
var Router = require('react-router');
var Redirect = require('react-router').Redirect;
var Dispatcher = require('../../dispatcher/appDispatcher');
var ActionTypes = require('../../constants/actionTypes');
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
			// if (CompanyStore.getAllCompanies().length === 0) {
			// 	alert('Please add a company first.');
			// 	transition.abort();
			// }
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

		// companies.forEach(function(company){
		// 	var option = {
		// 		label: company.name,
		// 		value: company.id
		// 	};

		// 	companyOptions.push(option);
		// });

		return {
			employee: {
				id: '',
				fullName: '',
				fingerprintId: null,
				pin: null,
				createdDate: null
				// company: companyOptions[0].value
			},
			companies: companyOptions,
			errors: {},
			dirty: false,
			saving: false,
			type: 'create'
		};
	},

	componentWillMount: function () {
		EmployeeStore.addChangeListener(this._onChange);
		var employeeId = this.props.params.id;
		if (employeeId) {
			var employee = EmployeeStore.getEmployeeById(employeeId);
			// employee.company = employee.company.id;
			this.setState({employee: employee, type: 'update'});
		}
	},

	componentWillUnmount: function () {
		EmployeeStore.removeChangeListener(this._onChange);
	},

	_onChange: function () {
		this.setState({ saving: false });
		// var employeeId = this.props.params.id;
		if (this.state.type === 'create') {
			this.setState({
				employee: {
					id: '',
					fullName: '',
					fingerprintId: null,
					pin: null,
					createdDate: null
				}
			});
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
		this.state.errors = {};

		if (this.state.employee.id.length < 1) {
			this.state.errors.id = 'Employee ID is required.';
			formIsValid = false;
		}
		
		if (!parseInt(this.state.employee.id) && this.state.employee.id !== '0') {
			this.state.errors.id = 'Employee ID must be a number.';
			formIsValid = false;
		}

		if (this.state.employee.fullName.length < 3) {
			this.state.errors.fullName = 'Name must be at least 3 characters.';
			formIsValid = false;
		}

		// if (this.state.employee.company.length === '') {
		// 	this.state.errors.company = 'Please select a company.';
		// 	formIsValid = false;
		// }

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveEmployee: function(event) {
		event.preventDefault();

		this.setState({
			dirty: false,
			saving: true
		});

		if (!this.employeeFormIsValid()) {
			this.setState({ saving: false });
			return;
		}

		if (this.state.type === 'update') {
			EmployeeActions.updateEmployee(this.state.employee);
		} else {
			EmployeeActions.createEmployee(this.state.employee);
		}
	},

	cancelState: function () {
		this.transitionTo('employees');
	},

	render: function() {
		return (
			<EmployeeForm
				employee={this.state.employee}
				companies={this.state.companies}
				errors={this.state.errors}
				saving={this.state.saving}
				formType={this.state.type}
				onChange={this.setEmployeeState}
				onSave={this.saveEmployee}
				cancel={this.cancelState} />
		);
	}
});

Dispatcher.register(function (action) {

	switch (action.type) {
		case ActionTypes.ERROR_COMPANY:
			ManageEmployeePage._onChange();
			break;

		default: // No Op
	}
});

module.exports = ManageEmployeePage;