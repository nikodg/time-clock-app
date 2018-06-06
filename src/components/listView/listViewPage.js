"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var ListViewStore = require('../../stores/listViewStore');
var ListViewActions = require('../../actions/listViewActions');
var ListViewList = require('./listViewList');

var ListViewPage = React.createClass({
    getInitialState: function () {
        return {
            listViews: ListViewStore.getAllListViews()
        };
    },

    componentWillMount: function () {
        ListViewStore.addChangeListener(this._onChange);
    },

    //Clean up when this component is unmounted
    componentWillUnmount: function () {
        ListViewStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({ listViews: ListViewStore.getAllListViews() });
    },

    render: function () {
        return (
            <div>
                <h1>List Views</h1>
                <ListViewList listViews={this.state.listViews} />
            </div>
        );
    }
});

module.exports = ListViewPage;