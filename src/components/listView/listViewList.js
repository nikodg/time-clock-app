"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ListViewActions = require('../../actions/listViewActions');

var ListViewList = React.createClass({
    propTypes: {
        listViews: React.PropTypes.array.isRequired
    },

    deleteListView: function (id, event) {
        event.preventDefault();
        ListViewActions.deleteListView(id);
    },

    computeHours: function (timeIn, timeOut) {
        return '-';
    },

    render: function () {
        var createListViewRow = function (listView) {
            return (
                <tr key={listView.id}>
                    <td>{listView.employeeId}</td>
                    <td>{listView.fullName}</td>
                    <td>{listView.in}</td>
                    <td>{listView.out}</td>
                    {/* <td>{this.computeHours(listView.in, listView.out)}</td> */}
                    <td>{listView.workHours}</td>
                    <td>{listView.Overtime}</td>
                    <td>{listView.Undertime}</td>
                    <td>{listView.Absent}</td>
                    <td>
                        <Link to="manageListView" params={{ id: listView.id }}>Edit</Link>
                        <a href="#" onClick={this.deleteListView.bind(this, listView.id)}>Delete</a>
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
                        <th className="text-center">Actions</th>
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