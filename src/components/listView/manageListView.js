"use strict";

var React = require('react');
var Router = require('react-router');
var ListViewForm = require('./listViewForm');
var ListViewActions = require('../../actions/listViewActions');
var ListViewStore = require('../../stores/listViewStore');
var EmployeeChecklist = require('../employees/employeeChecklist');
var EmployeeStore = require('../../stores/employeeStore');

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
                date: '',
                in: '',
                out: '',
                notes: '',
                working: false
            },
            employees: EmployeeStore.getAllEmployees(),
            errors: {},
            dirty: false,
            withList: false,
            selectedEmployees: []
        };
    },

    componentWillMount: function () {

        var listViewId = this.props.params.id; //from the path '/listView:id'
        
        if (listViewId) {
            this.setState({ listView: ListViewStore.getListViewById(listViewId) });
        } else {
            this.setState({withList: true});
        }
    },

    setListViewState: function (event) {
        this.setState({ dirty: true });
        var field = event.target.name;
        var value = event.target.value;
        this.state.record[field] = value;
        return this.setState({ record: this.state.record });
    },

    getEmployeeChecklist: function (checklist) {
        this.setState({ selectedEmployees: checklist });
    },

    listViewFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {}; //clear any previous errors.

        if (this.state.record.date.length < 3) {
            this.state.errors.date = 'Invalid date.';
            formIsValid = false;
        }

        if (this.state.record.in.length < 3) {
            this.state.errors.in = 'Invalid in time.';
            formIsValid = false;
        }

        if (this.state.record.out.length < 3) {
            this.state.errors.out = 'Invalid out time.';
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

        if (this.state.listView.id) {
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
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <EmployeeChecklist
                            employees={this.state.employees}
                            listener={this.getEmployeeChecklist} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <ListViewForm
                            record={this.state.record}
                            onChange={this.setListViewState}
                            onSave={this.saveListView}
                            errors={this.state.errors} />
                    </div>
                </div>
            );

        } else {

            return (

                <ListViewForm
                    record={this.state.record}
                    onChange={this.setListViewState}
                    onSave={this.saveListView}
                    errors={this.state.errors} />
            );
        }
    }
});

module.exports = ManageListView;