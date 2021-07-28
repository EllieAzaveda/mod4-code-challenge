export const cleanArticleData = (allArticles) => {
  return allArticles.map(article => {
    return {
      "title": article.title,
      "section": article.section,
      "multimedia": article.multimedia,
      "byline": article.byline,
      "created_date": article.created_date,
      "abstract": article.abstract,
      "short_url": article.short_url
    }
  })
}
