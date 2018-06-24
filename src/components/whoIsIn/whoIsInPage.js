"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var WhoIsInStore = require('../../stores/whoIsInStore');
var WhoIsInActions = require('../../actions/whoIsInActions');
var WhoIsInList = require('./whoIsInList');
var Paginator = require('../common/paginator');

var WhoIsInPage = React.createClass({
    
    getInitialState: function () {
        return {
            whoIsIns: WhoIsInStore.getAllWhoIsIn(),
            pagination: WhoIsInStore.getPagination()
        };
    },

    componentWillMount: function () {
        WhoIsInStore.addChangeListener(this._onChange);
        this.getWhoIsIn();
    },

    //Clean up when this component is unmounted
    componentWillUnmount: function () {
        WhoIsInStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({ 
            whoIsIns: WhoIsInStore.getAllWhoIsIn(),
            pagination: WhoIsInStore.getPagination()
        });
    },

    getWhoIsIn: function () {
        WhoIsInActions.getWhoIsIn(this.state.pagination.number, this.state.pagination.size);
    },

    previousPage: function () {
        this.state.pagination.number--;
        this.getWhoIsIn();
    },

    nextPage: function () {
        this.state.pagination.number++;
        this.getWhoIsIn();
    },

    goToPageNumber: function (pageNumber) {
        WhoIsInActions.getWhoIsIn(pageNumber, this.state.pagination.size);
    },

    render: function () {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h1>Who Is In</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8 col-md-7 col-sm-12">
                        {(this.state.pagination.totalElements && !this.state.searched) ?
                            <Paginator
                                previousPage={this.previousPage}
                                nextPage={this.nextPage}
                                currentPage={this.state.pagination.number}
                                totalPages={this.state.pagination.totalPages}
                                goToPageNumber={this.goToPageNumber} /> : ''
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <WhoIsInList whoIsIns={this.state.whoIsIns} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = WhoIsInPage;