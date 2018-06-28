"use strict";

var React = require('react');
var Router = require('react-router');
var Json2csvParser = require('json2csv').Parser;
var moment = require('moment');
var LoginForm = require('./loginForm');
var LoginActions = require('../../actions/loginActions');
var LoginStore = require('../../stores/loginStore');
var API = require('../../constants/apis').getApi();
var toastr = require('toastr');

var fields = {fields: ['car', 'price', 'color']};
var myCars = [
    {
        "car": "Audi",
        "price": 40000,
        "color": "blue"
    }, {
        "car": "BMW",
        "price": 35000,
        "color": "black"
    }, {
        "car": "Porsche",
        "price": 60000,
        "color": "green"
    }
];

var ManageLoginPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    statics: {
        // willTransitionTo: function (transition, component) {
        //     if (LoginStore.checkSession()) {
        //         transition.abort();  
        //     }
        // },
        willTransitionFrom: function (transition, component) {
            if (!LoginStore.checkSession()) {
                alert('Please login.');
                transition.abort();
            }
        }
    },

    getInitialState: function () {

        return {
            credentials: {
                username: '',
                password: ''
            },
            errors: {},
            dirty: false,
            checking: false
        };
    },

    componentWillMount: function () {
        if (LoginStore.checkSession()) {
            this.transitionTo('whoIsIn');
        }
        LoginStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        LoginStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        console.log('loginPage changed');
        if (LoginStore.checkSession()){
            this.transitionTo('whoIsIn');          
        }
    },

    setLoginState: function (event) {
        this.setState({ dirty: true });
        var field = event.target.name;
        var value = event.target.value;
        this.state.credentials[field] = value;
        return this.setState({ credentials: this.state.credentials });
    },

    loginFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {}; //clear any previous errors.

        if (!this.state.credentials.username) {
            this.state.errors.username = 'Invalid username';
            formIsValid = false;
        }

        if (!this.state.credentials.password) {
            this.state.errors.password = 'Invalid password';
            formIsValid = false;
        }

        this.setState({ errors: this.state.errors });
        return formIsValid;
    },

    saveLogin: function (event) {
        event.preventDefault();

        if (!this.loginFormIsValid()) {
            return;
        }
        this.state.checking = true;
        this.setState({ 
            dirty: false,
            checking: true
        });

        var session = window.btoa(this.state.credentials.username + ':' + this.state.credentials.password);
        var vm = this;

        API.loginUser(session)
            .done(function (data) {
                LoginActions.checkIn(session);
            }).fail(function () {
                toastr.error('Invalid Credentials.');
                vm.setState({ checking: false });
            });
    },

    exportReport: function () {
        var vm = this;
        API.getData('listview')
            .done(function (response) {
                console.log('export report', response);
            }).fail(function () {
                toastr.error('Failed to export report.');


                try {
                    var parser = new Json2csvParser(fields);
                    var csv = parser.parse(myCars);
                    vm.downloadCSV(csv);
                } catch (err) {
                    console.error(err);
                }
            });
    },
    downloadCSV: function(csv) {  
        var data;
        var filename;
        var link;
        if (csv == null) { return; }

        var dateTime = moment().format('DD-MM-YYYY_hh_mm_A');
        filename = 'time-logs-report_' + dateTime + '.csv';

        if(!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    },

    render: function () {
        return (
            <div>
            <button className="btn btn-default header-button" onClick={this.exportReport}>Export Report</button>
            <LoginForm
                login={this.state.credentials}
                onChange={this.setLoginState}
                onSave={this.saveLogin}
                errors={this.state.errors}
                checking={this.state.checking} />
            </div>
        );
    }
});

module.exports = ManageLoginPage;