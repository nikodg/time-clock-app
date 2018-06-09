"use strict";

var React = require('react');
var Input = require('../common/textInput');

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
				<h1>Manage employee</h1>
				<Input
					name="fullName"
					label="Full Name"
					value={this.props.employee.fullName}
					onChange={this.props.onChange}
					error={this.props.errors.fullName} />

				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
			</form>
		);
	}
});

module.exports = EmployeeForm;