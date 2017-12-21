const URL = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=7d8199c3d53f4a8eb6f34f9375ce32d5';

const Task = require('data.task');
const request = require('request');

const Right = x => ({
  x,
  map: f => Right(f(x)),
  chain: f => f(x),
  fold: f => f(x),
  inspect: () => console.log(`Right(${x})`)
})

const Left = x => ({
  x,
  map: f => Left(x),
  fold: f => f(x),
  inspect: () => console.log(`Left(${x})`)
})

const EitherToTask = either => 
  either.fold(Task.of)

const parseJson = text => {
  try {
    return Task.of(JSON.parse(text))
  } catch(e) {
    return Task.rejected(e)
  }
}

const fromNullable = value => 
  value ? Task.of(value) : Task.rejected(value)


const httpGet = url =>
  new Task((rej, res) => 
    request(url, (error, response, body) =>
      error ? rej(error) : res(body)))

const getNews = source =>
    //returns the task that wont execute until we fork it
    httpGet(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=7d8199c3d53f4a8eb6f34f9375ce32d5`)
    .chain(parseJson)
    .chain(response => fromNullable(response.articles))
    .map(articles => articles.map(article => article.title))
    




module.exports = {
  httpGet,
  getTechCrunchNews : getNews('techcrunch'),
  getABCNews : getNews('abc-news'),
  getNews,
}