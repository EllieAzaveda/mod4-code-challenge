import React from 'react';
import { NavLink } from 'react-router-dom';
import ArticleCard from '../ArticleCard/ArticleCard';
import './Articles.css';

const Articles = ({ allArticles }) => {
  const displayArticles = () => {
    return allArticles.map(article => {
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

  if (!allArticles) {
    return (
      <>
        <h1 className="loading-message">Loading Articles...</h1>
      </>
    )
  } else {
    return (
      <div className="articles">
        {displayArticles()}
      </div>
    )
  }
}

export default Articles;
