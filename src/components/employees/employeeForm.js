"use strict";

var React = require('react');
var Input = require('../common/textInput');
var SelectInput = require('../common/selectInput');

var EmployeeForm = React.createClass({
	propTypes: {
		employee: React.PropTypes.object.isRequired,
		onSave:	React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function() {
		return (
			<form>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12">
						<h1>Manage employee</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 col-md-7 col-sm-12">
						<Input
							name="fullName"
							label="Full Name"
							value={this.props.employee.fullName}
							onChange={this.props.onChange}
							error={this.props.errors.fullName} />

					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 col-md-7 col-sm-12">
						<SelectInput
							name="company"
							label="Company"
							value={this.props.company}
							options={this.props.companies}
							onChange={this.props.onChange}
							error={this.props.errors.company} />

					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 col-md-7 col-sm-12 text-right">
						<input type="submit"
							value="Save"
							className="btn btn-default btn-block"
							onClick={this.props.onSave} />
					</div>
				</div>
			</form>
		);
	}
});

module.exports = EmployeeForm;