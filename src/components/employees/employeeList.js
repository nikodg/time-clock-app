"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var swal = require('sweetalert2');
var EmployeeActions = require('../../actions/employeeActions');

var EmployeeList = React.createClass({
	propTypes: {
		employees: React.PropTypes.array.isRequired
	},

	deleteEmployee: function(id, event) {
		event.preventDefault();
		var _this = this;
		swal({
			title: '',
			text: 'Are you sure you want to delete this employee?',
			type: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false
		}).then(function (result) {
			if (result.value) {
				_this.props.onAction();
				EmployeeActions.deleteEmployee(id);
			}
		});
	},

	render: function() {
		var createEmployeeRow = function(employee) {
			return (
				<tr key={employee.id}>
					<td><Link to="manageEmployee" params={{id: employee.id}}>{employee.id}</Link></td>
					<td>{employee.fullName}</td>
					<td className="text-center action">
						<Link to="manageEmployee" title="Edit"
							className="btn btn-default action-button"
							params={{ id: employee.id }}
							disabled={this.props.loader}>

							<i className="glyphicon glyphicon-pencil"></i>
						</Link>

						<button className="btn btn-default action-button delete-btn"
							onClick={this.deleteEmployee.bind(this, employee.id)}
							disabled={this.props.loader} title="Delete">
							
							<i className="glyphicon glyphicon-trash"></i>
						</button>
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