"use strict";

var React = require('react');

var CheckboxInput = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        error: React.PropTypes.string
    },

    render: function () {
        var wrapperClass = 'checkbox';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " " + 'has-error';
        }

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>
                        <input type="checkbox"
                            name={this.props.name}
                            placeholder={this.props.placeholder}
                            ref={this.props.name}
                            value={this.props.value}
                            onChange={this.props.onChange}
                            checked={this.props.checkState} />
                            
                        {this.props.label}
                </label>
                <div className="input">{this.props.error}</div>
            </div>
        );
    }
});

module.exports = CheckboxInput;