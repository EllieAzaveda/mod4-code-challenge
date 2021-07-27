import React from 'react';
import { NavLink } from 'react-router-dom';
import ArticleCard from '../ArticleCard/ArticleCard';
import './Articles.css';

const Articles = ({ allArticles }) => {
  const displayArticles = () => {
    if(!allArticles || !allArticles.length) {
      return (
        <>
          <h1>Loading Articles...</h1>
        </>
      )
    } else {
      return allArticles.map(article => {
        return (
          <>
            <h1>{article.section}</h1>
            <NavLink to={`/${article.section}`} >
              <button>See more {article.section} articles</button>
            </NavLink>
            <ArticleCard
              key={article.title}
              article={article}
            />
          </>
        )
      })
    }
  }

  return (
    <div className="articles">
      {displayArticles()}
    </div>
  )
}

export default Articles;
