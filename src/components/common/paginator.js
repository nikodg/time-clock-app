'use strict';
var React = require('react');

var Paginator = React.createClass({

    previousPage: function(event){
        event.preventDefault();
        this.props.previousPage();
    },

    nextPage: function (event) {
        event.preventDefault();
        this.props.nextPage();
    },

    goToPageNumber: function (pageNumber, event) {
        event.preventDefault();
        this.props.goToPageNumber(pageNumber);
    },
    
    render: function(){

        var renderPageNumbers = function(){

            var pageNumberEls = [];
            for (var i = 0; i < this.props.totalPages; i++) {
                pageNumberEls.push(
                    <li key={i} className={this.props.currentPage === i ? 'active' : ''}>
                        <a href="#" onClick={this.goToPageNumber.bind(this, i)}>
                            {i + 1}
                        </a>
                    </li>
                );
            }

            return pageNumberEls;
        };

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li>
                        <a href="#" aria-label="Previous" onClick={this.previousPage}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {renderPageNumbers.call(this)}
                    <li>
                        <a href="#" aria-label="Next" onClick={this.nextPage}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
});

module.exports = Paginator;
