"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var CompanyStore = require('../../stores/companyStore');
var CompanyActions = require('../../actions/companyActions');
var CompanyList = require('./companyList');
var TextInput = require('../common/textInput');
var Paginator = require('../common/paginator');
var ClockLoader = require('../common/clockLoader');

var CompanyPage = React.createClass({
	getInitialState: function() {
		return {
			companies: CompanyStore.getAllCompanies(),
			pagination: CompanyStore.getPagination(),
			loader: false,
			keyword: '',
			searched: false
		};
	},

	componentWillMount: function() {
		CompanyStore.addChangeListener(this._onChange);
		this.getCompanies();
	},

	componentWillUnmount: function() {
		CompanyStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ 
			companies: CompanyStore.getAllCompanies(),
			pagination: CompanyStore.getPagination(),
			loader: CompanyStore.getLoader()
		});
	},

	getCompanies: function () {
		this.state.loader = true;
		CompanyActions.getCompanies(this.state.pagination.number, this.state.pagination.size);
	},

	setCompanyPageState: function (event) {
		this.setState({ dirty: true });
		var field = event.target.name;
		var value = event.target.value;
		this.state[field] = value;

		if (this.state.keyword === '') {
			this.setState({ searched: false });
			CompanyActions.getCompanies();
		}
	},

	searchList: function (event) {
		if (event.keyCode === 13) {
			this.setState({ searched: true });
			this.searchData();
		}
	},

	searchData: function () {
		CompanyActions.searchList(this.state.keyword);
	},

	previousPage: function () {
		this.state.pagination.number--;
		this.getCompanies();
	},

	nextPage: function () {
		this.state.pagination.number++;
		this.getCompanies();
	},

	goToPageNumber: function (pageNumber) {
		CompanyActions.getCompanies(pageNumber, this.state.pagination.size);
	},

	render: function() {
		return (
			<div>
				<div className="row">
					<div className="col-lg-6 col-md-6 col-sm-12">
						<h1>
							Companies
							<div className="inline-wrap">
								{this.state.loader ? <ClockLoader /> : ''}
							</div>
						</h1>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12 text-right">
						<Link to="addCompany" className="btn btn-default header-button">Add Company</Link>
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