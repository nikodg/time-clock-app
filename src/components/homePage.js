"use strict";

var React = require('react');
var Router = require('react-router');
var DayPickerInput = require('react-day-picker/DayPickerInput');
var Link = Router.Link;

var Home = React.createClass({

	getInitialState: function(){
		return {
			checkAll: false,
			tests: [
				{value: 'test1', checkState: false},
				{value: 'test2', checkState: false},
				{value: 'test3', checkState: false}
			],
			testArray: []
		};
	},
	checkState: function(event){
		
		var itemIndex = this.state.testArray.indexOf(event.target.value);

		if (itemIndex > -1) {
			this.state.testArray.splice(itemIndex, 1);
		} else {
			this.state.testArray.push(event.target.value);
		}

		console.log(this.state.testArray);
	},
	checkAllState: function (event) {

		console.log(event.target.value);
		var checkAll = !this.state.checkAll;
		this.state.tests.forEach(function(test){
			test.checkState = checkAll;
		});

		this.setState({
			checkAll: checkAll,
			tests: this.state.tests
		});

	},

	eventHandler: function (event) {
		console.log(event);
	},

	render: function() {
		return (
			<div className="">
				<h1>Pluralsight Administration</h1>
				<p>React, React Router, and Flux for ultra-responsive web apps.</p>
				{/* <Link to="about" className="btn btn-primary btn-lg">Learn more</Link> */}

				<label>
					<input type="checkbox" value="All" checked={this.state.checkAll} onChange={this.checkAllState} />
					All
				</label>

				{this.state.tests.map(function(test, index){
					return (
						<label key={index}>
							<input type="checkbox" value={test.value} checked={test.checkState} onChange={this.checkState} />
							{test}
						</label>
					);
				}.bind(this))}

				<div>
					<DayPickerInput onDayChange={this.eventHandler} />
				</div>
			</div>
		);
	}
});

module.exports = Home;