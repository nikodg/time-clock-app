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
			employees: EmployeeStore.getAllEmployees(),
			keyword: '',
			pageNumber: 0,
			pageSize: 10
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

	getEmployees: function() {
		EmployeeActions.getEmployees(this.state.pageNumber, this.state.pageSize);
	},

	setEmployeePageState: function (event) {
		this.setState({ dirty: true });
		var field = event.target.name;
		var value = event.target.value;
		this.state[field] = value;

		if (this.state.keyword === '') {
			this.getEmployees();
		}
	},

	searchList: function (event) {
		if (event.keyCode === 13) {
			EmployeeActions.searchList(event.target.value);
		}
	},

	previousPage: function(){
		this.state.pageNumber--;
		console.log('prev page', this.state.pageNumber);
	},

	nextPage: function () {
		this.state.pageNumber++;
		console.log('next page', this.state.pageNumber);
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
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12">
						<div class="btn-group" role="group" aria-label="...">
							<button type="button" class="btn btn-default" onClick={this.previousPage}>Prev</button>
							<button type="button" class="btn btn-default" onClick={this.nextPage}>Next</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = EmployeePage;