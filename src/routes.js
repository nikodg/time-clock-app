"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/whoIsIn/whoIsInPage')} />
    <Route name="whoIsIn" path="who-is-in" handler={require('./components/whoIsIn/whoIsInPage')} />

    <Route name="employees" handler={require('./components/employees/employeePage')} />
    <Route name="addEmployee" path="employee" handler={require('./components/employees/manageEmployeePage')} />
    <Route name="manageEmployee" path="employee/:id" handler={require('./components/employees/manageEmployeePage')} />

    <Route name="companies" handler={require('./components/company/companyPage')} />
    <Route name="addCompany" path="company" handler={require('./components/company/manageCompanyPage')} />
    <Route name="manageCompany" path="company/:id" handler={require('./components/company/manageCompanyPage')} />

    <Route name="listView" path="list-view" handler={require('./components/listView/listViewPage')} />
    <Route name="addListView" path="record" handler={require('./components/listView/manageListView')} />
    <Route name="addAbsence" path="absence" handler={require('./components/listView/manageListView')} />
    <Route name="manageListView" path="record/:id" handler={require('./components/listView/manageListView')} />
    
    <NotFoundRoute handler={require('./components/notFoundPage')} />
    {/* <Redirect from="about-us" to="about" /> */}
    {/* <Redirect from="about/*" to="about" /> */}
  </Route>
);

module.exports = routes;