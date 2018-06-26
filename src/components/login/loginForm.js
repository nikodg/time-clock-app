"use strict";

var React = require('react');
var TextInput = require('../common/textInput');
var PasswordInput = require('../common/passwordInput');

var EmployeeForm = React.createClass({
    propTypes: {
        login: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    render: function () {
        return (
            <form>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h1>Login</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-7 col-sm-12">
                        <TextInput
                            name="username"
                            label="Username"
                            value={this.props.login.username}
                            onChange={this.props.onChange}
                            error={this.props.errors.username} />

                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-7 col-sm-12">
                        <PasswordInput
                            name="password"
                            label="Password"
                            value={this.props.login.password}
                            onChange={this.props.onChange}
                            error={this.props.errors.password} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-7 col-sm-12 text-right">
                        <input type="submit"
                            value="Login"
                            className="btn btn-default btn-block"
                            onClick={this.props.onSave} />
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = EmployeeForm;