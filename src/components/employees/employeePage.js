"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var EmployeeStore = require('../../stores/employeeStore');
var EmployeeActions = require('../../actions/employeeActions');
var EmployeeList = require('./employeeList');

var EmployeePage = React.createClass({
	getInitialState: function() {
		return {
			employees: EmployeeStore.getAllEmployees()
		};
	},

	componentWillMount: function() {
		EmployeeStore.addChangeListener(this._onChange);
	},

	//Clean up when this component is unmounted
	componentWillUnmount: function() {
		EmployeeStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ employees: EmployeeStore.getAllEmployees() });
	},

	render: function() {
		return (
			<div>
				<h1>Employees</h1>
				<Link to="addEmployee" className="btn btn-default">Add employee</Link>
				<EmployeeList employees={this.state.employees} />
			</div>
		);
	}
});

module.exports = EmployeePage;