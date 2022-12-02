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

const sockets = []

wss.on('connection', socket => {
  socket['nickname'] = 'Anonymous'
  sockets.push(socket)
  console.log('Connected to Browser.')
  socket.on('close', () => console.log('Disconnected from Browser.'))
  socket.on('message', plainMessage => {
    sockets.forEach(socketItem => {
      const message = JSON.parse(plainMessage)
      switch (message.type) {
        case 'new_message':
          socketItem.send(`${socket.nickname}: ${message.payload.toString('ascii')}`)
          break
        case 'nickname':
          socket['nickname'] = message.payload
          break
        default:
          break
        }
    })
  })
})

server.listen(PORT, handleListen)