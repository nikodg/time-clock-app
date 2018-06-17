"use strict";

var React = require('react');
var Router = require('react-router');
var ListViewForm = require('./listViewForm');
var ListViewActions = require('../../actions/listViewActions');
var ListViewStore = require('../../stores/listViewStore');
var EmployeeChecklist = require('../employees/employeeChecklist');
var EmployeeStore = require('../../stores/employeeStore');
var moment = require('moment');

var ManageListView = React.createClass({
    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },

    getInitialState: function () {
        return {
            record: {
                id: null,
                dateTimeIn: moment().format('MM/DD/YYYY hh:mm A'),
                dateTimeOut: moment().format('MM/DD/YYYY hh:mm A'),
                working: false,
                notes: ''
            },
            employees: EmployeeStore.getAllEmployees(),
            errors: {},
            dirty: false,
            withList: false,
            selectedEmployees: [],
            withLeaveField: false,
            leaveOptions: ListViewStore.getLeaveOptions()
        };
    },

    componentWillMount: function () {

        var currentRoute = window.location.hash;
        var listViewId = this.props.params.id;
        
        if (listViewId) {

            this.setState({ 
                record: ListViewStore.getRecordById(listViewId)
            });

        } else {

            this.setState({
                withList: true
            });
        }

        if (currentRoute === '#/absence') {
            this.setState({ withLeaveField: true });
        }
    },

    setListViewState: function (event) {
        this.setState({ dirty: true });
        var field = event.target.name;
        var value = event.target.value;

        if (field === 'working' && event.target.type === 'checkbox'){
            value = !(value === 'true');

            if (value) {
                this.state.record.dateTimeOut = '';
            }
        }
        this.state.record[field] = value;
        this.listViewFormIsValid();
        return this.setState({ record: this.state.record });
    },

    getEmployeeChecklist: function (checklist) {
        this.setState({ selectedEmployees: checklist });
    },

    listViewFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {}; //clear any previous errors.

        if (this.state.record.dateTimeIn.length < 3) {
            this.state.errors.dateTimeIn = 'Invalid date and time in.';
            formIsValid = false;
        }

        if (this.state.record.dateTimeOut.length < 3 && !this.state.record.working) {
            this.state.errors.dateTimeOut = 'Invalid date and time out.';
            formIsValid = false;
        }

        this.setState({ errors: this.state.errors });
        return formIsValid;
    },

    saveListView: function (event) {
        event.preventDefault();

        if (!this.listViewFormIsValid()) {
            return;
        }

        if (this.state.record.id) {
            ListViewActions.updateListView(this.state.record);
        } else {
            ListViewActions.createListView(this.state.record, this.state.selectedEmployees);
        }

        this.setState({ dirty: false });
        this.transitionTo('listView');
    },

    render: function () {
        if (this.state.withList) {

            return (
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h1>{this.state.withLeaveField ? 'Add Absence' : 'Add Entry'}</h1>
                    </div>
                    <div className="col-lg-6 col-md-5 col-sm-12">
                        <ListViewForm
                            record={this.state.record}
                            onChange={this.setListViewState}
                            onSave={this.saveListView}
                            errors={this.state.errors}
                            currentRoute={this.state.currentRoute}
                            withLeaveField={this.state.withLeaveField}
                            leaveOptions={this.state.leaveOptions} />
                    </div>
                    <div className="col-lg-6 col-md-7 col-sm-12">
                        <EmployeeChecklist
                            employees={this.state.employees}
                            listener={this.getEmployeeChecklist} />
                    </div>
                </div>
            );

        } else {

            return (
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h1>Edit Entry</h1>
                    </div>
                    <div className="col-lg-6 col-md-5 col-sm-12">
                        <ListViewForm
                            record={this.state.record}
                            onChange={this.setListViewState}
                            onSave={this.saveListView}
                            errors={this.state.errors} />
                    </div>
                </div>
            );
        }
    }
});

module.exports = ManageListView;