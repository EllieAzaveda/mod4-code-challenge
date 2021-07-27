import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Articles from '../Articles/Articles';
import ArticleDetails from '../ArticleDetails/ArticleDetails';
import SearchBar from '../SearchBar/SearchBar';
// import SectionArticles from '../SectionArticles/SectionArticles';
import { fetchArticles } from '../../Utils/APICalls';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      allArticles: [],
      filteredArticles: [],
      searched: false,
      error: ''
    }
  }

  filterArticles = (searchValue) => {
    const articlesToList =  this.state.allArticles.filter(article => article.title.toLowerCase().includes(searchValue.toLowerCase()))
    this.setState({ filteredArticles: articlesToList })
    this.setState({ searched: true })
  }

  displayArticles = () => {
    return !this.state.filteredArticles.length > 0 ? this.state.allArticles : this.state.filteredArticles;
  }

  componentDidMount() {
    fetchArticles()
      .then(articlesData => {
        (typeof articlesData === 'string') ? this.setState({ error: articlesData }) : this.setState({ allArticles: articlesData.results })
      })
      .catch(err => this.setState({ error: 'Something went wrong. Please try again later.'} ))
  }

  render() {
    return (
      <>
      <div className="App">
        <Header />
        {this.state.error && <h3 className='error-message'>{this.state.error}</h3>}
        {!this.state.error &&
          <>
            <SearchBar
            filterArticles={this.filterArticles}
            filteredArticles={this.state.filteredArticles}
            searched={this.state.searched}
            />
            <Route exact path="/" render={() => {
              return <Articles
                allArticles={this.displayArticles()}
              />
            }}
            />
            <Route path="/article-details/:title" render={({ match }) => {
              const { title } = match.params;
              let article = this.state.allArticles.find(article => article.title === title);

              return <ArticleDetails
                article={article}
              />
            }}
            />
          </>
        }
        <Articles />
      </div>
      </>
    )
  }
}

export default App;
