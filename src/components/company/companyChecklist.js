"use strict";

var React = require('react');
var Router = require('react-router');
var _ = require('lodash');
var Link = Router.Link;
var CheckboxInput = require('../common/checkboxInput');

var CompanyChecklist = React.createClass({
    
    propTypes: {
        companies: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
        
        var companiesState = JSON.parse(JSON.stringify(this.props.companies));

        companiesState.forEach(function(company){
            company.checkState = false;
        });

        return {
            checkAll: false,
            checkList: [],
            companies: companiesState
        };
    },

    checkCompany: function (event) {

        var companyId = parseInt(event.target.value);
        var checkListIndex = this.state.checkList.indexOf(companyId);
        var company = _.find(this.state.companies, { id: companyId });

        if (checkListIndex > -1) {
            this.state.checkList.splice(checkListIndex, 1);
        } else {
            this.state.checkList.push(companyId);
        }
        
        company.checkState = !company.checkState;
        this.state.checkAll = false;

        if (this.state.checkList.length === this.state.companies.length){
            this.state.checkAll = true;
        }

        this.setState({
            checkList: this.state.checkList,
            companies: this.state.companies
        });
        this.props.listener(this.state.checkList);
    },

    checkAllState: function (event) {

        var checkAll = !this.state.checkAll;
        this.state.checkList = [];
        this.state.companies.forEach(function (company) {
            company.checkState = checkAll;

            if (checkAll) {
                this.state.checkList.push(company.id);
            }
        }.bind(this));

        this.setState({
            checkAll: checkAll,
            companies: this.state.companies,
            checkList: this.state.checkList
        });

        this.props.listener(this.state.checkList);
    },

    render: function () {
        
        var createCompanyRow = function (company) {
            return (
                <tr key={company.id}>
                    <td>
                        <CheckboxInput
                            name={company.id}
                            label=""
                            value={company.id}
                            checkState={company.checkState}
                            onChange={this.checkCompany} />
                    </td>
                    <td>{company.fullName}</td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th className="checkbox-column">
                            <CheckboxInput
                                name="all"
                                label=""
                                value="all"
                                checkState={this.state.checkAll}
                                onChange={this.checkAllState} />
                        </th>
                        <th>Name</th>
                    </thead>
                    <tbody>
                        {this.state.companies.map(createCompanyRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = CompanyChecklist;