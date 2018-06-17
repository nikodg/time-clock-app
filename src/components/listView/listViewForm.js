"use strict";

var React = require('react');
var TextInput = require('../common/textInput');
var TextareaInput = require('../common/textareaInput');
var CheckboxInput = require('../common/checkboxInput');
var SelectInput = require('../common/selectInput');
var ListViewStore = require('../../stores/listViewStore');

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

                    <div className={this.props.record.working ? 'col-lg-12' : 'col-lg-6' + ' col-md-12 col-sm-12'}>
                        <TextInput
                            name="dateTimeIn"
                            label="Date &amp; Time In"
                            value={this.props.record.dateTimeIn}
                            onChange={this.props.onChange}
                            error={this.props.errors.dateTimeIn}
                            flatPickr="datetime"
                            icon='calendar'
                            id="dateTimeIn" />

                    </div>

                    <div className={this.props.record.working ? 'hidden' : 'col-lg-6 col-md-12 col-sm-12'}>

                        <TextInput
                            name="dateTimeOut"
                            label="Date &amp; Time Out"
                            value={this.props.record.dateTimeOut}
                            onChange={this.props.onChange}
                            error={this.props.errors.dateTimeOut}
                            disabled={this.props.record.working}
                            flatPickr="datetime"
                            icon='calendar'
                            id="dateTimeOut" />

                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">

                        <TextareaInput
                            name="notes"
                            label="Notes"
                            value={this.props.record.notes}
                            onChange={this.props.onChange}
                            error={this.props.errors.notes} />

                    </div>

                    <div className={this.props.withLeaveField ? 'hidden' : 'col-lg-6 col-md-12 col-sm-12'}>

                        <CheckboxInput
                            name="working"
                            label="Working"
                            value={this.props.record.working}
                            onChange={this.props.onChange}
                            error={this.props.errors.working} />

                    </div>

                    <div className={this.props.withLeaveField ? 'col-lg-12' : 'col-lg-6' + 'col-md-12 col-sm-12 text-right'}>
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