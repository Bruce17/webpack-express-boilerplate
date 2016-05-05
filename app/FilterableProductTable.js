/**
 * @author Michael Raith
 * @email  mraith@gmail.com
 * @date   05.05.2016 17:16
 */

"use strict";

import React from 'react';

const ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
});

const ProductRow = React.createClass({
  render: function() {
    const name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

const ProductTable = React.createClass({
  render: function() {
    const rows = [];
    const searchRegex = new RegExp(this.props.filterText, 'i');

    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.search(searchRegex) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }

      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }

      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

const SearchBar = React.createClass({
  handleChange: function () {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  },

  render: function() {
    return (
      <form>
        <input type="text"
               placeholder="Search..."
               value={this.props.filterText}
               ref="filterTextInput"
               onChange={this.handleChange} />
        <p>
          <input type="checkbox"
                 checked={this.props.inStockOnly}
                 ref="inStockOnlyInput"
                 onChange={this.handleChange} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});

// FilterableProductTable
export default React.createClass({
  getInitialState: function () {
    return {
      filterText: '',
      inStockOnly: false
    }
  },

  handleUserInput: function (filterText, inStockOnly) {
    // this.setState({filterText, inStockOnly});
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },

  render: function() {
    return (
      <div>
        <SearchBar filterText={this.state.filterText}
                   inStockOnly={this.state.inStockOnly}
                   onUserInput={this.handleUserInput} />

        <ProductTable products={this.props.products}
                      filterText={this.state.filterText}
                      inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
});
