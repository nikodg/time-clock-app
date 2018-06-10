"use strict";

var React = require('react');
var TextInput = require('../common/textInput');
var TextareaInput = require('../common/textareaInput');
var CheckboxInput = require('../common/checkboxInput');

var EmployeeForm = React.createClass({
    propTypes: {
        record: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    render: function () {
        return (
            <form>
                <TextInput
                    name="date"
                    label="Date"
                    value={this.props.record.date}
                    onChange={this.props.onChange}
                    error={this.props.errors.date} />
                    
                <TextInput
                    name="timeIn"
                    label="Time In"
                    value={this.props.record.timeIn}
                    onChange={this.props.onChange}
                    error={this.props.errors.timeIn} />

                <TextInput
                    name="timeOut"
                    label="Time Out"
                    value={this.props.record.timeOut}
                    onChange={this.props.onChange}
                    error={this.props.errors.timeOut} />

                <CheckboxInput
                    name="working"
                    label="Working"
                    value={this.props.record.working}
                    onChange={this.props.onChange}
                    error={this.props.errors.working} />

                <TextareaInput
                    name="notes"
                    label="Notes"
                    value={this.props.record.notes}
                    onChange={this.props.onChange}
                    error={this.props.errors.notes} />


                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
            </form>
        );
    }
});

module.exports = EmployeeForm;