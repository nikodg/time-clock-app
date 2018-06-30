"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var swal = require('sweetalert2');
var CompanyActions = require('../../actions/companyActions');

var CompanyList = React.createClass({
	propTypes: {
		companies: React.PropTypes.array.isRequired
	},

	deleteCompany: function(id, event) {
		event.preventDefault();
		swal({
			title: '',
			text: 'Are you sure you want to delete this company?',
			type: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false
		}).then(function (result) {
			if (result.value){
				CompanyActions.deleteCompany(id);
			}
		});
	},

	render: function() {
		var createCompanyRow = function(company) {
			return (
				<tr key={company.id}>
					<td><Link to="manageCompany" params={{id: company.id}}>{company.id}</Link></td>
					<td>{company.name}</td>
					<td className="text-center action">
						<Link to="manageCompany" params={{ id: company.id }}>Edit</Link>
						<a href="#" onClick={this.deleteCompany.bind(this, company.id)}>Delete</a>
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
						{this.props.companies.map(createCompanyRow, this)}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = CompanyList;