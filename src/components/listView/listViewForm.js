"use strict";

var React = require('react');
var TextInput = require('../common/textInput');
var TextareaInput = require('../common/textareaInput');
var CheckboxInput = require('../common/checkboxInput');
var SelectInput = require('../common/selectInput');

var EmployeeForm = React.createClass({
    propTypes: {
        record: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    getInitialState: function(){
        var iState = {
            flatPickrFormat: 'datetime'
        };

        if (this.props.withLeaveField) {
            iState.flatPickrFormat = 'date';
        }

        return iState;
    },

    render: function () {
        return (
            <form onSubmit={this.props.onSave}>
                <div className="row">

                    <div className={this.props.withLeaveField ? 'col-lg-12 col-md-12 col-sm-12' : 'hidden'}>
                        <SelectInput
                            name="leaveType"
                            label="Type of Leave"
                            placeholder="Please select type of leave"
                            value={this.props.leaveType}
                            options={this.props.leaveOptions}
                            onChange={this.props.onChange} />
                    </div>

                    <div className={this.props.record.working && !this.props.withLeaveField ? 'col-lg-12' : 'col-lg-6' + ' col-md-12 col-sm-12'}>
                        <TextInput
                            name="timeIn"
                            label="Date &amp; Time In"
                            value={this.props.record.timeIn}
                            onChange={this.props.onChange}
                            error={this.props.errors.timeIn}
                            flatPickr={this.state.flatPickrFormat}
                            icon='calendar'
                            id="timeIn" />

                    </div>

                    <div className={this.props.record.working || this.props.withLeaveField ? 'hidden' : 'col-lg-6 col-md-12 col-sm-12'}>

                        <TextInput
                            name="timeOut"
                            label="Date &amp; Time Out"
                            value={this.props.record.timeOut}
                            onChange={this.props.onChange}
                            error={this.props.errors.timeOut}
                            disabled={this.props.record.working}
                            flatPickr={this.state.flatPickrFormat}
                            icon='calendar'
                            id="timeOut" />

                    </div>

                    <div className={ this.props.withLeaveField ? 'col-lg-6 col-md-12 col-sm-12' : 'hidden' }>

                        <TextInput
                            name="timeOut"
                            label="Date &amp; Time Out"
                            value={this.props.record.timeOut}
                            onChange={this.props.onChange}
                            error={this.props.errors.timeOut}
                            flatPickr={this.state.flatPickrFormat}
                            icon='calendar'
                            id="timeOut" />

                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">

                        <TextareaInput
                            name="notes"
                            label="Notes"
                            value={this.props.record.notes}
                            onChange={this.props.onChange}
                            error={this.props.errors.notes} />

                    </div>

                    <div className="col-lg-6 col-md-12 col-sm-12">

                        <CheckboxInput
                            name="working"
                            label={this.props.withLeaveField ? 'Half Day' : 'Working'}
                            value={this.props.record.working}
                            checkState={this.props.record.working}
                            onChange={this.props.onChange}
                            error={this.props.errors.working} />

                    </div>

                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <button type="button"
                                    className="btn btn-default btn-block"
                                    onClick={this.props.cancel}
                                    disabled={this.props.saving}>
                                    Cancel
								</button>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <input type="submit"
                                    value="Save"
                                    className="btn btn-default btn-block"
                                    disabled={this.props.saving} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = EmployeeForm;