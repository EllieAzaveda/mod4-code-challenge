import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
      currentArticle: null,
      searched: false,
      isLoading: true,
      error: ''
    }
  }

  findArticle = (title) => {
    return this.state.allArticles.find(article => article.title === title);
  }

  filterArticles = (searchValue) => {
    const articlesToList =  this.state.allArticles.filter(article => article.title.toLowerCase().includes(searchValue.toLowerCase()))
    this.setState({ filteredArticles: articlesToList })
    this.setState({ searched: true })
  }

  displayArticles = () => {
    return !this.state.filteredArticles.length ? this.state.allArticles : this.state.filteredArticles;
  }

  componentDidMount() {
    fetchArticles()
      .then(articlesData => {
        (typeof articlesData === 'string') ? this.setState({ error: articlesData }) : this.setState({ allArticles: articlesData.results });
        this.setState({ isLoading: false });
      })
      .catch(err => this.setState({ error: 'Something went wrong. Please try again later.'} ))
  }

  render() {
    return (
      <>
      <div className="App">
        <Header />
        {this.state.error && <h3 className='error-message'>{this.state.error}</h3>}
        {!this.state.error && !this.state.isLoading &&
          <>
            <SearchBar
              filterArticles={this.filterArticles}
              filteredArticles={this.state.filteredArticles}
              searched={this.state.searched}
            />
            <Route exact path="/" render={() => {
              return <Articles
                allArticles={this.displayArticles()}
                isLoading={this.state.isLoading}
              />
            }}
            />
            <Route path="/article-details/:title" render={({ match }) => {
              const { title } = match.params;
              return <ArticleDetails
                article={this.findArticle(title)}
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
