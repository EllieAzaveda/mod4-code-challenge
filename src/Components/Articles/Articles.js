import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ArticleCard from '../ArticleCard/ArticleCard';
import './Articles.css';

class Articles extends Component {
  constructor(props) {
    super(props);
      this.state = {
        allArticles: props.allArticles,
        isLoading: props.isLoading
      }
  }

  displayArticles = () => {
    return this.state.allArticles.map(article => {
      return (
        <div key={article.title} className="article-card">
          <h1>{article.section}</h1>
          <NavLink to={`/${article.section}`} >
            <button>See more {article.section} articles</button>
          </NavLink>
          <ArticleCard
            key={article.title}
            article={article}
          />
        </div>
      )
    })
  }

  render() {
    return (
      <>
        {!this.state.allArticles && this.state.isLoading && <h2 className="loading-message">Loading Articles...</h2>}
        {this.state.allArticles && !this.state.isLoading &&
          <div className="articles">
            {this.displayArticles()}
          </div>
        }
      </>
    )
  }
}

export default Articles;
