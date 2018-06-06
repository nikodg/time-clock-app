"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var WhoIsInActions = require('../../actions/whoIsInActions');

var WhoIsInList = React.createClass({
    propTypes: {
        whoIsIns: React.PropTypes.array.isRequired
    },

    render: function () {
        var createWhoIsInRow = function (whoIsIn) {
            return (
                <tr key={whoIsIn.id}>
                    <td><a href="#" onClick={this.deleteWhoIsIn.bind(this, whoIsIn.id)}>Delete</a></td>
                    <td><Link to="manageWhoIsIn" params={{ id: whoIsIn.id }}>{whoIsIn.id}</Link></td>
                    <td>{whoIsIn.firstName} {whoIsIn.lastName}</td>
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
                        {this.props.whoIsIns.map(createWhoIsInRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = WhoIsInList;