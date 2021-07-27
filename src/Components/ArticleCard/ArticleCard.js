import React from 'react';
import { NavLink } from 'react-router-dom';
import './ArticleCard.css';

const ArticleCard = ({ article }) => {

  return (
    <NavLink to={`/article-details/${article.title}`} >
      <div className='card'>
        <img className='article-image' src={article.multimedia[0].url} alt={article.multimedia[0].caption}/>
        <h2 className='title'>{article.title}</h2>
        <h2 className='author'>{article.byline}</h2>
      </div>
    </NavLink>
  )
}

export default ArticleCard;
