"use strict";

var React = require('react');

var SelectInput = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string
  },

  render: function () {
    var createOption = function (option, index) {

      if (this.props.value === option.value) {

        return (
          <option key={index} value={option.value}>{option.label}</option>
        );

      } else {

        return (
          <option key={index} value={option.value}>{option.label}</option>
        );
      }
    };

    var wrapperClass = 'form-group';

    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }
    
    return (
     <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <select type="text"
            name={this.props.name}
            className="form-control"
            placeholder={this.props.placeholder}
            ref={this.props.name}
            onChange={this.props.onChange}
            defaultValue={this.props.value}>

            <option disabled>{this.props.placeholder}</option>
            {this.props.options.map(createOption, this)}
            
          </select>
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
});

module.exports = SelectInput;