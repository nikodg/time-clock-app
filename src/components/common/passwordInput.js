"use strict";

var React = require('react');
var flatpickr = require("flatpickr");

var PasswordInput = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        error: React.PropTypes.string
    },

    render: function () {
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " " + 'has-error';
        }

        if (this.props.icon) {

            return (
                <div className={wrapperClass}>
                    <label htmlFor={this.props.name}>{this.props.label}</label>

                    <div className="input-group field">
                        <span className={'input-group-addon glyphicon glyphicon-' + this.props.icon} id="basic-addon1"></span>
                        <input type="password"
                            id={this.props.id}
                            name={this.props.name}
                            className="form-control"
                            placeholder={this.props.placeholder}
                            ref={this.props.name}
                            value={this.props.value}
                            onChange={this.props.onChange}
                            onKeyUp={this.props.onKeyUp}
                            disabled={this.props.disabled ? 'disabled' : ''} />
                    </div>
                    <div className="input">{this.props.error}</div>
                </div>
            );

        } else if (this.props.btnIcon) {

            return (
                <div className={wrapperClass}>
                    <label htmlFor={this.props.name}>{this.props.label}</label>

                    <div className="input-group field">
                        <input type="password"
                            id={this.props.id}
                            name={this.props.name}
                            className="form-control"
                            placeholder={this.props.placeholder}
                            ref={this.props.name}
                            value={this.props.value}
                            onChange={this.props.onChange}
                            onKeyUp={this.props.onKeyUp}
                            disabled={this.props.disabled ? 'disabled' : ''} />

                        <span className="input-group-btn">
                            <button
                                className={'btn btn-default glyphicon glyphicon-' + this.props.btnIcon}
                                onClick={this.props.onClick}
                                type="button"></button>
                        </span>

                    </div>
                    <div className="input">{this.props.error}</div>
                </div>
            );

        } else {

            return (
                <div className={wrapperClass}>
                    <label htmlFor={this.props.name}>{this.props.label}</label>
                    <div className="field">
                        <input type="password"
                            id={this.props.id}
                            name={this.props.name}
                            className="form-control"
                            placeholder={this.props.placeholder}
                            ref={this.props.name}
                            value={this.props.value}
                            onChange={this.props.onChange}
                            onKeyUp={this.props.onKeyUp}
                            disabled={this.props.disabled ? 'disabled' : ''} />
                    </div>
                    <div className="input">{this.props.error}</div>
                </div>
            );
        }
    }
});

module.exports = PasswordInput;