import ws, { WebSocketServer } from 'ws'
import http from 'http'
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

const handleListen = () => console.log(`Listening on ${PROTOCOL}://${HOST}:${PORT}`)

const server = http.createServer(app)
const wss = new WebSocketServer({ server })

const handleConnection = (socket) => {
  console.log(socket)
}

wss.on('connection', handleConnection)

server.listen(PORT, handleListen)