"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var EmployeeStore = require('../../stores/employeeStore');
var EmployeeActions = require('../../actions/employeeActions');
var EmployeeList = require('./employeeList');
var TextInput = require('../common/textInput');

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

	setEmployeePageState: function (event) {
		this.setState({ dirty: true });
		var field = event.target.name;
		var value = event.target.value;
		this.state[field] = value;
		return this.setState({ employee: this.state.employee });
	},

	searchList: function (event) {
		if (event.keyCode === 13) {
			EmployeeActions.searchList(event.target.value);
		}
	},

	render: function() {
		return (
			<div>
				<div className="row">
					<div className="col-lg-6 col-md-6 col-sm-12">
						<h1>Employees</h1>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12 text-right">
						<Link to="addEmployee" className="btn btn-default header-button">Add employee</Link>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-offset-8 col-md-offset-7 col-lg-4 col-md-5 col-sm-12">
						<TextInput
							name="keyword"
							label=""
							value={this.state.keyword}
							onChange={this.setEmployeePageState}
							onKeyUp={this.searchList}
							placeholder="Search by Name"
							btnIcon="search" />
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12">
						<EmployeeList employees={this.state.employees} />
					</div>
				</div>
			</div>
		);
	}
});

module.exports = EmployeePage;