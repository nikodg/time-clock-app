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
                    <td>{listView.fullName}</td>
                    <td>{listView.date}</td>
                    <td>{listView.in}</td>
                    <td>{listView.out}</td>
                    <td>{this.computeHours(listView.in, listView.out)}</td>
                    <td>{listView.attendance}</td>
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
                        <th>Name</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">In</th>
                        <th className="text-center">Out</th>
                        <th className="text-center">Hours</th>
                        <th>Attendance</th>
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