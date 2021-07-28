import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './ArticleDetails.css';

class ArticleDetails extends Component {
  constructor(props) {
    super(props);
      this.state = {
        article: props.article
      }
  }

  render() {
    return (
      <div className="details-container">
      <div className="article-details">
        <img className="article-image" src={this.state.article.multimedia[0].url} alt={this.state.article.multimedia[0].caption}/>
        <h2 className="title">{this.state.article.title}</h2>
        <h4 className="author">{this.state.article.byline}</h4>
        <h5 className="date">{this.state.article.created_date}</h5>
        <p className="abstract">{this.state.article.abstract}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href=`${this.state.article.short_url}`;
        }}>Read this article HERE</button>
      </div>
      </div>
    )
  }
}

export default ArticleDetails;
