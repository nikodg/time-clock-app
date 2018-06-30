"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var EmployeeStore = require('../../stores/employeeStore');
var EmployeeActions = require('../../actions/employeeActions');
var EmployeeList = require('./employeeList');
var TextInput = require('../common/textInput');
var Paginator = require('../common/paginator');
var ClockLoader = require('../common/clockLoader');

var EmployeePage = React.createClass({
	getInitialState: function () {
		return {
			employees: EmployeeStore.getAllEmployees(),
			pagination: EmployeeStore.getPagination(),
			keyword: '',
			searched: false,
			loader: false
		};
	},

	componentWillMount: function() {
		EmployeeStore.addChangeListener(this._onChange);
		this.getEmployees();
	},

	componentWillUnmount: function() {
		EmployeeStore.removeChangeListener(this._onChange);
	},

	_onChange: function () {

		this.setState({
			employees: EmployeeStore.getAllEmployees(),
			pagination: EmployeeStore.getPagination(),
			loader: EmployeeStore.getLoader()
		});
	},

	getEmployees: function () {
		this.state.loader = true;
		EmployeeActions.getEmployees(this.state.pagination.number, this.state.pagination.size);
	},

	setEmployeePageState: function (event) {
		this.setState({ dirty: true });
		var field = event.target.name;
		var value = event.target.value;
		this.state[field] = value;

		if (this.state.keyword === '') {
			this.setState({ searched: false });
			this.getEmployees();
		}
	},

	searchList: function (event) {
		if (event.keyCode === 13) {
			this.setState({ searched: true });
			EmployeeActions.searchList(event.target.value);
		}
	},

	previousPage: function(){
		this.state.pagination.number--;
		this.getEmployees();
	},

	nextPage: function () {
		this.state.pagination.number++;
		this.getEmployees();
	},

	goToPageNumber: function (pageNumber) {
		EmployeeActions.getEmployees(pageNumber, this.state.pagination.size);
	},

	onAction: function () {
		this.setState({ loader: !this.state.loader });
	},

	render: function() {
		return (
			<div>
				<div className="row">
					<div className="col-lg-6 col-md-6 col-sm-12">
						<h1>
							Employees
							<div className="inline-wrap">
								{this.state.loader ? <ClockLoader /> : ''}
							</div>
						</h1>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12 text-right">
						<Link to="addEmployee"
							className="btn btn-default header-button"
							disabled={this.state.loader}>
							
							Add Employee
						</Link>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-8 col-md-7 col-sm-12">
						{(this.state.pagination.totalElements && !this.state.searched) ? 
							<Paginator 
								previousPage={this.previousPage}
								nextPage={this.nextPage}
								currentPage={this.state.pagination.number}
								totalPages={this.state.pagination.totalPages}
								goToPageNumber={this.goToPageNumber} /> : ''
						}
					</div>
					<div className="col-lg-4 col-md-5 col-sm-12">
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
						<EmployeeList
							employees={this.state.employees}
							onAction={this.onAction}
							loader={this.state.loader} />
					</div>
				</div>
			</div>
		);
	}
});

module.exports = EmployeePage;