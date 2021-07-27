import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor({ filterArticles, searched }) {
    super();
      this.state = {
        searchInput: '',
        clicked: false,
      }
  }

  handleChange = (event) => {
    let searchValue = (event.target.value).toLowerCase();
    this.setState({ searchInput: searchValue })
    this.props.filterArticles(this.state.searchInput)
  }

  clearInput = () => {
    this.setState({searchInput: ''})
  }

  searchInput = (event) => {
    event.preventDefault();
    this.props.filterArticles(this.state.searchInput)
    this.setState({ clicked: true })
    this.clearInput();
  }

  render () {
    return (
      <form className='search'>
        <input
          className='search-input'
          type='text'
          placeholder="Search for an Article"
          value={this.state.searchInput}
          onChange={(event) => this.handleChange(event)}
        />
        <button
          type='button'
          className='search-button'
          onClick={(event) => this.searchInput(event)}>Search</button>
      </form>
    )
  }
}

export default SearchBar;
