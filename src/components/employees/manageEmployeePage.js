"use strict";

var React = require('react');
var Router = require('react-router');
var EmployeeForm = require('./employeeForm');
var EmployeeActions = require('../../actions/employeeActions');
var EmployeeStore = require('../../stores/employeeStore');

var ManageEmployeePage = React.createClass({
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
			employee: {
				id: null,
				fullName: '',
				fingerprintId: null,
				pin: null,
				createdDate: null
			},
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		var employeeId = this.props.params.id; //from the path '/employee:id'
		if (employeeId) {
			this.setState({employee: EmployeeStore.getEmployeeById(employeeId) });
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
				onChange={this.setEmployeeState}
				onSave={this.saveEmployee}
				errors={this.state.errors} />
		);
	}
});

module.exports = ManageEmployeePage;