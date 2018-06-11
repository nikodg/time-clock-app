"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
	render: function() {
		return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
              {/* <Link to="app" className="navbar-brand">
                <img src="images/pluralsight-logo.png" />
              </Link> */}
              <ul className="nav navbar-nav">
                {/* <li><Link to="app">Home</Link></li> */}
                <li><Link to="listView">List View</Link></li>
                <li><Link to="whoIsIn">Who Is In</Link></li>
                <li><Link to="employees">Employees</Link></li>
              </ul>
          </div>
        </nav>
		);
	}
});

module.exports = Header;
