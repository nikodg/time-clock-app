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
var Paginator = require('../common/paginator');
var APIs = require('../../constants/apis');
var toastr = require('toastr');

var ListViewPage = React.createClass({

    getInitialState: function () {

        var today = moment().format('YYYY-MM-DD');

        return {
            selectOptions: ListViewStore.getLeaveOptions(),
            listViews: ListViewStore.getAllListView(),
            pagination: ListViewStore.getPagination(),
            keyword: '',
            leaveType: '',
            searched: false,
            dirty: false,
            dateFrom: today,
            dateTo: today
        };
    },

    componentWillMount: function () {
        ListViewStore.addChangeListener(this._onChange);
        this.getListView();
    },

    //Clean up when this component is unmounted
    componentWillUnmount: function () {
        ListViewStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({ listViews: ListViewStore.getAllListView() });
    },

    getListView: function () {
        ListViewActions.getListView(
            this.state.keyword,
            this.state.dateFrom,
            this.state.dateTo,
            this.state.leaveType,
            this.state.pagination.number,
            this.state.pagination.size
        );
    },

    setListViewState: function (event) {
        this.setState({ dirty: true });
        var field = event.target.name;
        var value = event.target.value;
        this.state[field] = value;

        if (field !== 'keyword') {
            this.setState({ searched: false });
            this.getListView();
            return this.setState({ field: this.state[field] });
        }
    },

    searchList: function (event) {
        if (event.keyCode === 13) {
            this.setState({ searched: true });
            this.getListView();
        }
    },

    previousPage: function () {
        this.state.pagination.number--;
        this.getListView();
    },

    nextPage: function () {
        this.state.pagination.number++;
        this.getListView();
    },

    goToPageNumber: function (pageNumber) {
        ListViewActions.getListView(pageNumber, this.state.pagination.size);
    },

    exportReport: function(){
        APIs.exportReport('listview')
            .done(function (response) {
                console.log('export report', response);
            }).fail(function () {
                toastr.error('Failed to export report.');
            });
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
                        <Link to="addAbsence" className="btn btn-default header-button">Add Absence</Link>
                        <button className="btn btn-default header-button" onClick={this.exportReport}>Export Report</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <TextInput
                            name="dateFrom"
                            label=""
                            value={this.state.dateFrom}
                            onChange={this.setListViewState}
                            id="dateFrom"
                            flatPickr="date"
                            icon="calendar" />
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <TextInput
                            name="dateTo"
                            label=""
                            value={this.state.dateTo}
                            onChange={this.setListViewState}
                            id="dateTo"
                            flatPickr="date"
                            icon="calendar" />
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <SelectInput
                            name="leaveType"
                            label=""
                            placeholder="Please select type of leave"
                            value={this.state.leaveType}
                            options={this.state.selectOptions}
                            onChange={this.setListViewState} />
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
                    <div className="col-lg-12 col-md-6 col-sm-12">

                        {(this.state.pagination.totalElements && !this.state.searched) ?
                            <Paginator
                                previousPage={this.previousPage}
                                nextPage={this.nextPage}
                                currentPage={this.state.pagination.number}
                                totalPages={this.state.pagination.totalPages}
                                goToPageNumber={this.goToPageNumber} /> : ''
                        }
                    </div>
                </div>
                <div className="row">
                </div>

                <ListViewList listViews={this.state.listViews} />
            </div>
        );
    }
});

module.exports = ListViewPage;