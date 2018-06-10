"use strict";

var React = require('react');
var Router = require('react-router');
var _ = require('lodash');
var Link = Router.Link;
var CheckboxInput = require('../common/checkboxInput');

var EmployeeChecklist = React.createClass({
    
    propTypes: {
        employees: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
        
        var employeesState = JSON.parse(JSON.stringify(this.props.employees));

        employeesState.forEach(function(employee){
            employee.checkState = false;
        });

        return {
            checkAll: false,
            checkList: [],
            employees: employeesState
        };
    },

    checkEmployee: function (event) {

        var employeeId = parseInt(event.target.value);
        var checkListIndex = this.state.checkList.indexOf(employeeId);
        var employee = _.find(this.state.employees, { id: employeeId });

        if (checkListIndex > -1) {
            this.state.checkList.splice(checkListIndex, 1);
        } else {
            this.state.checkList.push(employeeId);
        }
        
        employee.checkState = !employee.checkState;
        this.state.checkAll = false;

        if (this.state.checkList.length === this.state.employees.length){
            this.state.checkAll = true;
        }

        this.setState({
            checkList: this.state.checkList,
            employees: this.state.employees
        });
        this.props.listener(this.state.checkList);
    },

    checkAllState: function (event) {

        var checkAll = !this.state.checkAll;
        this.state.checkList = [];
        this.state.employees.forEach(function (employee) {
            employee.checkState = checkAll;

            if (checkAll) {
                this.state.checkList.push(employee.id);
            }
        }.bind(this));

        this.setState({
            checkAll: checkAll,
            employees: this.state.employees,
            checkList: this.state.checkList
        });

        this.props.listener(this.state.checkList);
    },

    render: function () {
        
        var createEmployeeRow = function (employee) {
            return (
                <tr key={employee.id}>
                    <td>
                        <CheckboxInput
                            name={employee.id}
                            label=""
                            value={employee.id}
                            checkState={employee.checkState}
                            onChange={this.checkEmployee} />
                    </td>
                    <td>{employee.fullName}</td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th>
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
                        {this.state.employees.map(createEmployeeRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = EmployeeChecklist;