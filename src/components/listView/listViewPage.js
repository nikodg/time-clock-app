"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var moment = require('moment');
var ListViewStore = require('../../stores/listViewStore');
var ListViewActions = require('../../actions/listViewActions');
var ListViewList = require('./listViewList');
var TextInput = require('../common/textInput');
var SelectInput = require('../common/selectInput');

var ListViewPage = React.createClass({
    getInitialState: function () {
        return {
            listViews: ListViewStore.getAllListView(),
            dateFrom: moment().format('YYYY-MM-DD'),
            dateTo: moment().format('YYYY-MM-DD'),
            keyword: '',
            leave: '',
            selectOptions: [
                {label: 'Holiday', value: 'Holiday'},
                {label: 'Sick', value: 'Sick'},
                {label: 'Vacation', value: 'Vacation'},
                {label: 'Personal', value: 'Personal'},
                {label: 'Other', value: 'Other'}
            ],
            dirty: false
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

        if (field !== 'keyword') {
            this.filterListView();
        }
        return this.setState({ employee: this.state.employee });
    },

    filterListView: function(){
        ListViewActions.getListView(this.state.keyword, this.state.dateFrom, this.state.dateTo);
    },

    searchList: function (event) {
        if (event.keyCode === 13) {
            this.filterListView();
        }
    },

    render: function () {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h1>List View</h1>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 text-right">
                        <Link to="addListView" className="btn btn-default header-button">Add Entry</Link>

                        {/* TODO: Add Absence Page
                        <Link to="addAbsence" className="btn btn-default">Add Absence</Link> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <TextInput
                            name="dateFrom"
                            label=""
                            value={this.state.dateFrom}
                            onChange={this.setListViewState}
                            id="dateFrom"
                            flatPickr="date"
                            icon="calendar" />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <TextInput
                            name="dateTo"
                            label=""
                            value={this.state.dateTo}
                            onChange={this.setListViewState}
                            id="dateTo"
                            flatPickr="date"
                            icon="calendar" />
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <TextInput
                            name="keyword"
                            label=""
                            value={this.state.keyword}
                            onChange={this.setListViewState}
                            onKeyUp={this.searchList}
                            onClick={this.filterListView}
                            placeholder="Search by Name"
                            btnIcon="search" />
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