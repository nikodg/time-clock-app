"use strict";

var moment = require('moment');
var React = require('react');
var Router = require('react-router');
var swal = require('sweetalert2');
var Link = Router.Link;
var ListViewActions = require('../../actions/listViewActions');

var ListViewList = React.createClass({
    propTypes: {
        listViews: React.PropTypes.array.isRequired
    },

    deleteListView: function (id, event) {
        event.preventDefault();
        var _this = this;
        swal({
            title: '',
            text: 'Are you sure you want to delete this record?',
            type: 'warning',
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        }).then(function (result) {
            if (result.value) {
                _this.props.onAction();
                ListViewActions.deleteListView(id);
            }
        });
    },

    computeHours: function (timeIn, timeOut) {
        return '-';
    },  

    render: function () {

        var formatDateTime = function (dateTime) {
            if (!dateTime) { return ''; }
            return moment(dateTime).format('YYYY-MM-DD hh:mm A');
        };

        var createListViewRow = function (listView) {
            return (
                <tr key={listView.id}>
                    <td>{listView.employee.id}</td>
                    <td>{listView.employee.fullName}</td>
                    <td className="text-center">{formatDateTime(listView.timeIn)}</td>
                    <td className="text-center">{formatDateTime(listView.timeOut)}</td>
                    {/* <td>{this.computeHours(listView.in, listView.out)}</td> */}
                    <td>{listView.hoursWorked}</td>
                    <td>{listView.overtime}</td>
                    <td>{listView.undertime}</td>
                    <td>{listView.absent}</td>
                    <td className="text-center action">
                        <Link to="manageListView" title="Edit"
                            className="btn btn-default action-button"
                            params={{ id: listView.id }}
                            disabled={this.props.loader}>

                            <i className="glyphicon glyphicon-pencil"></i>
                        </Link>

                        <button className="btn btn-default action-button delete-btn"
                            onClick={this.deleteListView.bind(this, listView.id)}
                            disabled={this.props.loader} title="Delete">

                            <i className="glyphicon glyphicon-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th className="text-center">Time In</th>
                        <th className="text-center">Time Out</th>
                        <th className="text-center">Work Hours</th>
                        <th className="text-center">Overtime</th>
                        <th className="text-center">Undertime</th>
                        <th className="text-center">Absent</th>
                        <th className="text-center action">Actions</th>
                    </thead>
                    <tbody>
                        {this.props.listViews.map(createListViewRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = ListViewList;