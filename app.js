const express = require('express')
const app = express()
const port = 3003
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))
// routes setting
app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
  // res.send(
  //   `<h1>Create your own server with Node.js</h1>
  //   <h3>Popular movies in 2018</h3>
  //   <ul>
  //     <li>
  //       <img
  //         src="https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg"
  //         alt="Jurassic World: Fallen Kingdom"
  //         width="50px"
  //       />
  //       Jurassic World: Fallen Kingdom
  //     </li>
  //     <li>
  //       <img
  //         src="https://movie-list.alphacamp.io/posters/rv1AWImgx386ULjcf62VYaW8zSt.jpg"
  //         alt="Ant-Man and the Wasp"
  //         width="50px"
  //       />
  //       Ant-Man and the Wasp
  //     </li>
  //     <li>
  //       <img
  //         src="https://movie-list.alphacamp.io/posters/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg"
  //         alt="Thor: Ragnarok"
  //         width="50px"
  //       />
  //       Thor: Ragnarok
  //     </li>
  //     <li>
  //       <img
  //         src="https://movie-list.alphacamp.io/posters/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
  //         alt="Avengers: Infinity War"
  //         width="50px"
  //       />
  //       Avengers: Infinity War
  //     </li>
  //     <li>
  //       <img
  //         src="https://movie-list.alphacamp.io/posters/80PWnSTkygi3QWWmJ3hrAwqvLnO.jpg"
  //         alt="Mission: Impossible - Fallout"
  //         width="50px"
  //       />
  //       Mission: Impossible - Fallout
  //     </li>
  //   </ul>
  // `)
}
)

app.get('/movies/:movie_id', (req, res) => {
  const movieEach = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movie: movieEach })
})

app.get('/search', (req, res) => {
  const keywords = req.query.keyword
  const moviesFilter = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keywords.toLowerCase())
  })
  res.render('index', { movies: moviesFilter, keyword: keywords })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost/${port}`)
})