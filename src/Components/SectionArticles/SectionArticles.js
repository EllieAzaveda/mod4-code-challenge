import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import ArticleCard from '../ArticleCard/ArticleCard';
import { fetchSectionArticles } from '../../Utils/APICalls';
import './SectionArticles.css';

class SectionArticles extends Component {
  constructor(props) {
    super(props);
      this.state = {
        section: props.section,
        allSectionArticles: props.allSectionArticles,
        error: ''
      }
  }

  displaySectionArticles = () => {
    return this.state.allSectionArticles.map(article => {
      return (
        <>
          <ArticleCard
            key={article.title}
            article={article}
          />
        </>
      )
    })
  }

  componentDidMount() {
    fetchSectionArticles(this.state.section)
      .then(articlesData => {
        this.props.updateSectionArticles(articlesData.results);
        this.setState({ allSectionArticles: articlesData.results })
      })
      .catch(err => this.setState({ error: 'Something went wrong. Please try again later.'} ))
  }


  render () {
    return (
      <>
        <h1>{this.state.section}</h1>
        <div className="articles">
          {this.displaySectionArticles()}
        </div>
      </>
    )
  }
}

export default SectionArticles;
