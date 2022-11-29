import express from 'express'


const app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => res.render('home'))

const PROTOCOL = 'http'
const HOST = 'localhost'
const PORT = 3001

app.listen(PORT, () => console.log(`Listening on ${PROTOCOL}://${HOST}:${PORT}`))