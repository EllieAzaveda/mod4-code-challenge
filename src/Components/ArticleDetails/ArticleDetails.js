import React, { Component } from 'react';
import './ArticleDetails.css';

class ArticleDetails extends Component {
  constructor(props) {
    super(props);
      this.state = {
        article: props.article
      }
  }

  formatDate = (date) => {
    let months = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December"
    };

    let splitDate = date.split("T");
    let dateOnly = splitDate[0].split("-");
    let matchedMonth = months[dateOnly[1]];
    return `${matchedMonth} ${dateOnly[2]}, ${dateOnly[0]}`;
  }

  render() {
    return (
      <div className="details-container">
      <div className="article-details">
        <img className="article-image" src={this.state.article.multimedia[0].url} alt={this.state.article.multimedia[0].caption}/>
        <h2 className="title">{this.state.article.title}</h2>
        <h4 className="author">{this.state.article.byline}</h4>
        <h5 className="date">{this.formatDate(this.state.article.created_date)}</h5>
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
