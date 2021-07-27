import React from 'react';
import './ArticleDetails.css';

const ArticleDetails = ({ article }) => {
  return (
    <div className="article-details">
      <img className="article-image" src={article.multimedia[0].url} alt={article.multimedia[0].caption}/>
      <h2 className="title">{article.title}</h2>
      <h4 className="author">{article.byline}</h4>
      <h5 className="date">{article.created_date}</h5>
      <p className="abstract">{article.abstract}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          window.location.href=`${article.short_url}`;
      }}>Read this article HERE</button>
    </div>
  )
}

export default ArticleDetails;
