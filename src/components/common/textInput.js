"use strict";

var React = require('react');
var flatpickr = require("flatpickr");
var moment = require('moment');

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

      switch (this.props.flatPickr) {

        case 'time':
          fpOptions = {
            enableTime: true,
            noCalendar: true,
            dateFormat: "h:i K",
            defaultDate: moment().format('hh:mm A')
          };
          break;

        case 'datetime':
          fpOptions = {
            enableTime: true,
            dateFormat: "m/d/Y h:i K",
            defaultDate: moment().format('YYYY-MM-DD hh:mm A')
          };
          break;

        default: // No Op

      }

      flatpickr(fpID, fpOptions);
    }
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
            <input type="text"
              id={this.props.id}
              name={this.props.name}
              className="form-control"
              placeholder={this.props.placeholder}
              ref={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
              onKeyUp={this.props.onKeyUp} />
            <div className="input">{this.props.error}</div>
          </div>
        </div>
      );

    } else if (this.props.btnIcon) {

      return (
        <div className={wrapperClass}>
          <label htmlFor={this.props.name}>{this.props.label}</label>

          <div className="input-group field">
            <input type="text"
              id={this.props.id}
              name={this.props.name}
              className="form-control"
              placeholder={this.props.placeholder}
              ref={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
              onKeyUp={this.props.onKeyUp} />
            <div className="input">{this.props.error}</div>

            <span className="input-group-btn">
              <button
                className={'btn btn-default glyphicon glyphicon-' + this.props.btnIcon}
                onClick={this.props.onClick}
                type="button"></button> 
            </span>

          </div>
        </div>
      );
      
    } else {
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
              onChange={this.props.onChange}
              onKeyUp={this.props.onKeyUp} />
            <div className="input">{this.props.error}</div>
          </div>
        </div>
      );
    }
  }
});

module.exports = TextInput;