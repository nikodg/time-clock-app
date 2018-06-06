"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ListViewActions = require('../../actions/listViewActions');

var ListViewList = React.createClass({
    propTypes: {
        listViews: React.PropTypes.array.isRequired
    },

    render: function () {
        var createListViewRow = function (listView) {
            return (
                <tr key={listView.id}>
                    <td><a href="#" onClick={this.deleteListView.bind(this, listView.id)}>Delete</a></td>
                    <td><Link to="manageListView" params={{ id: listView.id }}>{listView.id}</Link></td>
                    <td>{listView.firstName} {listView.lastName}</td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
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