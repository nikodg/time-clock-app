"use strict";

var React = require('react');
var flatpickr = require("flatpickr");

var TextInput = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string
  },

  componentDidMount: function () {
    if (this.props.flatPickr) {
      var fpID = '#' + this.props.id;
      var fpOptions = {};

      if (this.props.flatPickr === 'time'){
        fpOptions = {
          enableTime: true,
          noCalendar: true,
          dateFormat: "h:i K"
        };
      }

      flatpickr(fpID, fpOptions);
    }
  },

  render: function () {
    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }
    
    return (
     <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <input type="text"
            id={this.props.id}
            name={this.props.name}
            className="form-control"
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange} />
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
});

module.exports = TextInput;