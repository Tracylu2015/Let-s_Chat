const express = require('express');
const cors = require('cors')
const app = express();
const port = 8000;

require('./server/config/mongoose.config')
const admin = require('firebase-admin')
const credentials = require('./client/src/credentials.json');
const { Chat } = require('./server/models/chat.model');

admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./server/routes/user.route')(app)

const server = app.listen(port, () => console.log(`Listening on port: ${port}`));

const io = require('socket.io')(server, { cors: true });

const users = {}

io.on('connection', socket => {
    console.log('client', socket.id)
    socket.on('friend_chat', data => {
        console.log(data)

        new Chat(data).save(function(err, msg){
            if (msg != null) {
                console.log('saved', msg)
                socket.to(data.receiver).emit('on_message', msg)
            }
            if (err != null) {
                console.log(err)
            }
        })
    })

    socket.on('join', uid => {
        if (uid != null) {
            if (!socket.rooms.has(uid)) {
                console.log('join', uid)
                socket.join(uid)
            }
        }
    })
})
