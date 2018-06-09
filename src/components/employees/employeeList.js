"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var EmployeeActions = require('../../actions/employeeActions');
var toastr = require('toastr');

var EmployeeList = React.createClass({
	propTypes: {
		employees: React.PropTypes.array.isRequired
	},

	deleteEmployee: function(id, event) {
		event.preventDefault();
		EmployeeActions.deleteEmployee(id);
	},

	render: function() {
		var createEmployeeRow = function(employee) {
			return (
				<tr key={employee.id}>
					<td><a href="#" onClick={this.deleteEmployee.bind(this, employee.id)}>Delete</a></td>
					<td><Link to="manageEmployee" params={{id: employee.id}}>{employee.id}</Link></td>
					<td>{employee.fullName}</td>
				</tr>
			);
		};

		return (
			<div>
				<table className="table">
					<thead>
						<th></th>
						<th>ID</th>
						<th>Name</th>
					</thead>
					<tbody>
						{this.props.employees.map(createEmployeeRow, this)}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = EmployeeList;