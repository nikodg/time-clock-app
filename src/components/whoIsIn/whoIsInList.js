"use strict";

var React = require('react');
var moment = require('moment');

var WhoIsInList = React.createClass({
    propTypes: {
        whoIsIns: React.PropTypes.array.isRequired
    },

    render: function () {

        var formatTime = function(date, time){
            var dateTime = date + ' ' + time;
            return moment(dateTime).format('hh:mm A');
        };
        
        var createWhoIsInRow = function (whoIsIn) {
            return (
                <tr key={whoIsIn.time}>
                    <td>{whoIsIn.name}</td>
                    <td className={'text-center ' + (whoIsIn.status === 'IN' ? 'employee-in' : 'employee-out')}>
                        {whoIsIn.status}
                    </td>
                    <td className="text-center">{whoIsIn.date}</td>
                    <td className="text-center">{formatTime(whoIsIn.date, whoIsIn.time)}</td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th>Name</th>
                        <th className="text-center">In/Out</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Time</th>
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