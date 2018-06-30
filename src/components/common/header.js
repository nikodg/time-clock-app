"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var LoginStore = require('../../stores/loginStore');
var LoginActions = require('../../actions/loginActions');

var Header = React.createClass({

  mixins: [
    Router.Navigation
  ],

  getInitialState: function () {
    return {
      session: LoginStore.checkSession()
    };
  },

  componentWillMount: function () {
    LoginStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    LoginStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({ session: LoginStore.checkSession() });
    if (!LoginStore.checkSession()) {

      this.transitionTo('/');
    }
  },

  logoutHandler: function(event){
    event.preventDefault();
    LoginActions.checkOut();
  },

	render: function() {
		return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
              {/* <Link to="app" className="navbar-brand">
                <img src="images/pluralsight-logo.png" />
              </Link> */}
              <ul className="nav navbar-nav">
            {/* <li><Link to="app">Home</Link></li> */}
                <li><Link to="whoIsIn">Who Is In</Link></li>
                <li><Link to="listView">List View</Link></li>
                <li><Link to="employees">Employees</Link></li>
                {/* <li><Link to="super-companies">Companies</Link></li> */}
              </ul>

              {this.state.session ? 
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#" onClick={this.logoutHandler}>Logout</a></li>
                </ul> : ''
              }
          </div>
        </nav>
		);
	}
});

module.exports = Header;
