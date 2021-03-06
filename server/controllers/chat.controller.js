const { Friend, User, Chat } = require('../models/chat.model')


module.exports.findAllChats = (req, res) => {
    async function fetchChat(req, res) {
        let me_id = req.query.me
        let friend_id = req.query.friend_id
        let me = await User.findById({ _id: me_id }).exec()
        let friend = await User.findById({ _id: friend_id }).exec()
        let messages = await Chat.find({
            $or: [
                { 'sender': me_id, 'receiver': friend_id },
                { 'sender': friend_id, 'receiver': me_id },
            ]
        }).exec()
        if (!me || !friend || !messages) {
            res.sendStatus(400)
        } else {
            let data = {
                'me': me,
                'friend': friend,
                'messages': messages
            }
            res.json(data)
        }
    }
    fetchChat(req, res)
}

module.exports.createChat = (req, res) => {
    Chat.create(req.body)
        .then(one => res.json(one))
        .catch(err => res.status(400).json(err))
}