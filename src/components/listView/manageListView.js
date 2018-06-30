"use strict";

var React = require('react');
var Router = require('react-router');
var Dispatcher = require('../../dispatcher/appDispatcher');
var ActionTypes = require('../../constants/actionTypes');
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
        willTransitionTo: function (transition, component) {
            if (!EmployeeStore.getAllEmployees().length) {
                // transition.abort();
                window.location.assign('/#/list-view');
            }
        },
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },

    getInitialState: function () {

        var currentRoute = window.location.hash;
        var record = {};
        var withLeaveField = false;
        var leaveOptions = JSON.parse(JSON.stringify(ListViewStore.getLeaveOptions()));
        leaveOptions.shift();


        if (currentRoute === '#/absence') {
            record = {
                timeIn: moment().format('YYYY-MM-DD'),
                timeOut: moment().format('YYYY-MM-DD'),
                working: false,
                notes: ''
            };
            withLeaveField = true;
        } else {
            record = {
                timeIn: moment().format('YYYY-MM-DD hh:mm A'),
                timeOut: moment().format('YYYY-MM-DD hh:mm A'),
                working: false,
                notes: ''
            };
        }
        
        return {
            record: record,
            employees: EmployeeStore.getAllEmployees(),
            errors: {},
            dirty: false,
            withList: false,
            selectedEmployees: [],
            withLeaveField: withLeaveField,
            leaveOptions: leaveOptions,
            leaveType: 'Holiday',
            currentRoute: currentRoute,
            saving: false
        };
    },

    componentWillMount: function () {

        ListViewStore.addChangeListener(this._onChange);

        var listViewId = this.props.params.id;
        if (listViewId) {
            var storeRecord = ListViewStore.getRecordById(listViewId);

            var dateTimeOut = moment(storeRecord.timeOut).format('YYYY-MM-DD hh:mm A');

            if (!storeRecord.timeOut) {
                dateTimeOut = moment().format('YYYY-MM-DD hh:mm A');
            }
            this.setState({ 

                record: {
                    id: storeRecord.id,
                    timeIn: moment(storeRecord.timeIn).format('YYYY-MM-DD hh:mm A'),
                    timeOut: dateTimeOut,
                    working: storeRecord.timeOut === null ? true : false,
                    notes: storeRecord.notes
                }
            });

        } else {

            this.setState({
                withList: true
            });
        }
    },

    componentWillUnmount: function () {
        ListViewStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({ saving: false });
        this.cancelState();
    },

    setListViewState: function (event) {
        this.setState({ dirty: true });
        var field = event.target.name;
        var value = event.target.value;

        if (field === 'working' && event.target.type === 'checkbox'){
            value = !(value === 'true');

            if (value && !this.state.withLeaveField) {
                this.state.record.timeOut = '';
            }
        }

        if (field === 'leaveType') {
            this.setState({ leaveType: value });
        }

        this.state.record[field] = value;
        this.listViewFormIsValid();
        return this.setState({record: this.state.record});
    },

    getEmployeeChecklist: function (checklist) {
        this.setState({ selectedEmployees: checklist });
    },

    listViewFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {}; //clear any previous errors.

        if (this.state.record.timeIn.length < 3) {
            this.state.errors.timeIn = 'Invalid date and time in.';
            formIsValid = false;
        }

        if (this.state.record.timeOut.length < 3 && !this.state.record.working) {
            this.state.errors.timeOut = 'Invalid date and time out.';
            formIsValid = false;
        }

        this.setState({ errors: this.state.errors });
        return formIsValid;
    },

    saveListView: function (event) {
        event.preventDefault();

        this.setState({
            dirty: false,
            saving: true
        });

        if (!this.listViewFormIsValid()) {
            this.setState({ saving: false });
            return;
        }

        if (this.state.record.id) {

            ListViewActions.updateListView(this.state.record);

        } else if (this.state.currentRoute === '#/absence'){
            
            var leaveData = {
                dateFrom: this.state.record.timeIn,
                dateTo: this.state.record.timeOut,
                absent: this.state.record.working ? 4 : 8,
                leaveType: this.state.leaveType,
                notes: this.state.record.notes,
                employeeList: this.state.selectedEmployees
            };

            ListViewActions.createAbsence(leaveData);
        } else {
            ListViewActions.createListView(this.state.record, this.state.selectedEmployees);
        }
    },

    cancelState: function () {
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
                            leaveOptions={this.state.leaveOptions}
                            leaveType={this.state.leaveType}
                            cancel={this.cancelState}
                            saving={this.state.saving} />
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
                            leaveOptions={this.state.leaveOptions}
                            leaveType={this.state.leaveType}
                            onChange={this.setListViewState}
                            onSave={this.saveListView}
                            errors={this.state.errors}
                            cancel={this.cancelState}
                            saving={this.state.saving} />
                    </div>
                </div>
            );
        }
    }
});

Dispatcher.register(function (action) {

    switch (action.type) {
        case ActionTypes.ERROR_LISTVIEW:
            ManageListView._onChange();
            break;

        default: // No Op
    }
});

module.exports = ManageListView;