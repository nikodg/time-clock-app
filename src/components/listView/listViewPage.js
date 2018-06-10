"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var ListViewStore = require('../../stores/listViewStore');
var ListViewActions = require('../../actions/listViewActions');
var ListViewList = require('./listViewList');
var TextInput = require('../common/textInput');
var SelectInput = require('../common/selectInput');

var ListViewPage = React.createClass({
    getInitialState: function () {
        return {
            listViews: ListViewStore.getAllListView(),
            fromDate: '',
            toDate: '',
            keyword: '',
            leave: '',
            selectOptions: [
                {label: 'Holiday', value: 'Holiday'},
                {label: 'Sick', value: 'Sick'},
                {label: 'Vacation', value: 'Vacation'},
                {label: 'Personal', value: 'Personal'},
                {label: 'Other', value: 'Other'}
            ]
        };
    },

    componentWillMount: function () {
        ListViewStore.addChangeListener(this._onChange);
    },

    //Clean up when this component is unmounted
    componentWillUnmount: function () {
        ListViewStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({ listViews: ListViewStore.getAllListView() });
    },

    setListViewState: function (event) {
        this.setState({ dirty: true });
        var field = event.target.name;
        var value = event.target.value;
        this.state[field] = value;
        return this.setState({ employee: this.state.employee });
    },

    render: function () {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h1>List View</h1>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 text-right">
                        <Link to="addListView" className="btn btn-default">Add Entry</Link>

                        {/* TODO: Add Absence Page
                        <Link to="addAbsence" className="btn btn-default">Add Absence</Link> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <TextInput
                            name="fromDate"
                            label=""
                            value={this.state.fromDate}
                            onChange={this.setListViewState} />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <TextInput
                            name="toDate"
                            label=""
                            value={this.state.toDate}
                            onChange={this.setListViewState} />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <TextInput
                            name="keyword"
                            label=""
                            value={this.state.keyword}
                            onChange={this.setListViewState} />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <SelectInput
                            name="Leave"
                            label=""
                            value={this.state.leave}
                            options={this.state.selectOptions}
                            onChange={this.setListViewState} />
                    </div>
                </div>

                <ListViewList listViews={this.state.listViews} />
            </div>
        );
    }
});

module.exports = ListViewPage;