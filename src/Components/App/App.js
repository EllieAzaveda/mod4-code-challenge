import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import Articles from '../Articles/Articles';
import ArticleDetails from '../ArticleDetails/ArticleDetails';
import SearchBar from '../SearchBar/SearchBar';
import SectionArticles from '../SectionArticles/SectionArticles';
import { fetchArticles } from '../../Utils/APICalls';
import { cleanArticleData } from '../../Utils/cleaningMethods';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      allArticles: [],
      filteredArticles: [],
      allSectionArticles: [],
      currentArticle: null,
      searched: false,
      isLoading: true,
      error: ''
    }
  }

  filterArticles = (searchValue) => {
    const articlesToList =  this.state.allArticles.filter(article => article.title.toLowerCase().includes(searchValue.toLowerCase()))
    this.setState({ filteredArticles: articlesToList })
    this.setState({ searched: true })
  }

  displayArticles = () => {
    return !this.state.filteredArticles.length ? this.state.allArticles : this.state.filteredArticles;
  }

  findArticle = (title) => {
    return this.state.allSectionArticles.length > 0 ? this.state.allSectionArticles.find(article => article.title === title) :
      this.state.allArticles.find(article => article.title === title);
  }

  updateSectionArticles = (newArticles) => {
    this.setState({ allSectionArticles: newArticles })
  }


  componentDidMount() {
    fetchArticles()
      .then(articlesData => {
        (typeof articlesData === 'string') ? this.setState({ error: articlesData }) : this.setState({ allArticles: cleanArticleData(articlesData.results) });
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
                inSection={this.state.inSection}
                isLoading={this.state.isLoading}
              />
            }}
            />
            <Route path="/article-details/:title" render={({ match }) => {
              const { title } = match.params;
              let article = this.findArticle(title);

              return <ArticleDetails
                article={article}
                findArticle={this.findArticle}
                allArticles={this.state.allArticles}
                allSectionArticles={this.state.allSectionArticles}
              />
            }}
            />
            <Route exact path="/:section" render={({ match }) => {
              const { section } = match.params;
              return <SectionArticles
                section={section}
                updateSectionArticles={this.updateSectionArticles}
                allSectionArticles={this.state.allSectionArticles}
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
