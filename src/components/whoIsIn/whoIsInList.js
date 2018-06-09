"use strict";

var React = require('react');

var WhoIsInList = React.createClass({
    propTypes: {
        whoIsIns: React.PropTypes.array.isRequired
    },

    render: function () {
        var createWhoIsInRow = function (whoIsIn) {
            return (
                <tr key={whoIsIn.id}>
                    <td>{whoIsIn.id}</td>
                    <td>{whoIsIn.fullName}</td>
                    <td>{whoIsIn.in}</td>
                    <td>{whoIsIn.date}</td>
                    <td>{whoIsIn.time}</td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>In/Out</th>
                        <th>Date</th>
                        <th>Time</th>
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