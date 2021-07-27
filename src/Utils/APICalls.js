export const baseURL = 'https://api.nytimes.com/svc/topstories/v2';

export const checkForErr = (response) => {
  if(response.status >= 500) {
    return 'Uhoh! Something is wrong with our system. Please try back later.'
  } else if (!response.ok) {
    return 'Something went wrong. Please try again later.'
  } else {
    return response.json()
  }
}

export const fetchArticles = () => {
  return fetch(`${baseURL}/home.json?api-key=EGWgT37pIzbpuPsACX0SnMd3wKAwXhD9`)
  .then(checkForErr)
}
