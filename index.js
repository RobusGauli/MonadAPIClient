const Task = require('data.task')
const { getTechCrunchNews, getABCNews, getNews } = require('./NewsApi');

const errorHandler = error => {
  console.log('error occured')
  console.log(error);
}
const argv = new Task((rej, res) =>
  process.argv[2] ? res(process.argv) : rej('Please provide the arguments'))

const main = ([sourceOne, sourceTwo]) =>
  Task.of(x => y => [...x, ...y])
    .ap(getNews(sourceOne))
    .ap(getNews(sourceTwo))

 
const names = argv
  .map(args => args.slice(2, 4))
  .chain(main)
  .fork(errorHandler, console.log)

  //.fork(console.log, console.error)


