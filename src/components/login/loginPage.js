"use strict";

var React = require('react');
var Router = require('react-router');
var LoginForm = require('./loginForm');
var LoginActions = require('../../actions/loginActions');
var LoginStore = require('../../stores/loginStore');

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
            dirty: false
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

        this.setState({ dirty: false });
        LoginActions.checkIn(this.state.credentials);
    },

    render: function () {
        return (
            <LoginForm
                login={this.state.credentials}
                onChange={this.setLoginState}
                onSave={this.saveLogin}
                errors={this.state.errors} />
        );
    }
});

module.exports = ManageLoginPage;