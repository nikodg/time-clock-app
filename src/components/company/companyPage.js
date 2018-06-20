"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var CompanyStore = require('../../stores/companyStore');
var CompanyActions = require('../../actions/companyActions');
var CompanyList = require('./companyList');
var TextInput = require('../common/textInput');

var CompanyPage = React.createClass({
	getInitialState: function() {
		return {
			companies: CompanyStore.getAllCompanies(),
			keyword: ''
		};
	},

	componentWillMount: function() {
		CompanyStore.addChangeListener(this._onChange);
	},

	//Clean up when this component is unmounted
	componentWillUnmount: function() {
		CompanyStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ companies: CompanyStore.getAllCompanies() });
	},

	setCompanyPageState: function (event) {
		this.setState({ dirty: true });
		var field = event.target.name;
		var value = event.target.value;
		this.state[field] = value;

		if (this.state.keyword === '') {
			CompanyActions.getCompanies();
		}
	},

	searchList: function (event) {
		if (event.keyCode === 13) {
			this.searchData();
		}
	},

	searchData: function () {
		CompanyActions.searchList(this.state.keyword);
	},

	render: function() {
		return (
			<div>
				<div className="row">
					<div className="col-lg-6 col-md-6 col-sm-12">
						<h1>Companies</h1>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12 text-right">
						<Link to="addCompany" className="btn btn-default header-button">Add Company</Link>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-offset-8 col-md-offset-7 col-lg-4 col-md-5 col-sm-12">
						<TextInput
							name="keyword"
							label=""
							value={this.state.keyword}
							onChange={this.setCompanyPageState}
							onKeyUp={this.searchList}
							onClick={this.searchData}
							placeholder="Search by Name"
							btnIcon="search" />
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12">
						<CompanyList companies={this.state.companies} />
					</div>
				</div>
			</div>
		);
	}
});

module.exports = CompanyPage;