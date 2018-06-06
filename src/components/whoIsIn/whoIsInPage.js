"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var WhoIsInStore = require('../../stores/whoIsInStore');
var WhoIsInActions = require('../../actions/whoIsInActions');
var WhoIsInList = require('./whoIsInList');

var WhoIsInPage = React.createClass({
    getInitialState: function () {
        return {
            whoIsIns: WhoIsInStore.getAllWhoIsIns()
        };
    },

    componentWillMount: function () {
        WhoIsInStore.addChangeListener(this._onChange);
    },

    //Clean up when this component is unmounted
    componentWillUnmount: function () {
        WhoIsInStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({ whoIsIns: WhoIsInStore.getAllWhoIsIns() });
    },

    render: function () {
        return (
            <div>
                <h1>Who Is In</h1>
                <WhoIsInList whoIsIns={this.state.whoIsIns} />
            </div>
        );
    }
});

module.exports = WhoIsInPage;