"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var EmployeeActions = require('../../actions/employeeActions');

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
					<td><Link to="manageEmployee" params={{id: employee.id}}>{employee.id}</Link></td>
					<td>{employee.fullName}</td>
					<td className="text-center action">
						<Link to="manageEmployee" params={{ id: employee.id }}>Edit</Link>
						<a href="#" onClick={this.deleteEmployee.bind(this, employee.id)}>Delete</a>
					</td>
				</tr>
			);
		};

		return (
			<div>
				<table className="table">
					<thead>
						<th>ID</th>
						<th>Name</th>
						<th className="text-center action">Actions</th>
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