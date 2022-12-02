const messageList = document.querySelector('ul')
const messageForm = document.querySelector('#message')
const nicknameForm = document.querySelector('#nickname')

const socket = new WebSocket(`ws://${window.location.host}`)

function makeMessage(type, payload) {
  return JSON.stringify({
    type,
    payload
  })
}

socket.addEventListener('open', () => {
  console.log('Connected to Server.')
})

socket.addEventListener('message', message => {
  const li = document.createElement('li')
  li.innerText = message.data
  messageList.append(li)
  console.log('message: ', message.data)
})

socket.addEventListener('close', () => {
  console.log('Disconnected from Server.')
})

function handleSubmit(event) {
  event.preventDefault()
  const input = messageForm.querySelector('input')
  socket.send(makeMessage('new_message', input.value))
  input.value = ''
}

function handleNicknameSubmit(event) {
  event.preventDefault()
  const input = nicknameForm.querySelector('input')
  socket.send(makeMessage('nickname', input.value))
  input.value = ''
}

messageForm.addEventListener('submit', handleSubmit)
nicknameForm.addEventListener('submit', handleNicknameSubmit)