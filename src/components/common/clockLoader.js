"use strict";

var React = require('react');

var ClockLoader = React.createClass({

    render: function(){
        return (
            <div className="clock">
                <div className="minutes"></div>
                <div className="hours"></div>
            </div>
        );
    }
});

module.exports = ClockLoader;