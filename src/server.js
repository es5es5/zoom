import express from 'express'
const app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use('/public', express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('home'))
app.get('/*', (req, res) => res.redirect('/'))

const PROTOCOL = 'http'
const HOST = 'localhost'
const PORT = 3001

app.listen(PORT, () => console.log(`Listening on ${PROTOCOL}://${HOST}:${PORT}`))