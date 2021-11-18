const { Friend, User } = require('../models/chat.model')

module.exports.requestFriend = (req, res) => {
    const { sender_id, receiver_id } = req.body
    Friend.find({ sender: sender_id, receiver: receiver_id }, function (err, docs) {
        if (docs.length == 0) {
            Friend.create({ sender: sender_id, receiver: receiver_id, status: 'pending' })
                .then(one => {
                    res.json(one)
                    User.findOneAndUpdate({ _id: sender_id }, { $inc: { 'numOfInvitations': 1 } })
                })
                .catch(err => res.status(400).json(err))
        } else {
            res.json(docs[0])
        }
    })
}

module.exports.pendingInvite = (req, res) => {
    let me = req.query.me
    Friend.find({ receiver: me, status: 'pending' }, function (err, docs) {
        console.log(docs)
        if (err != null) {
            res.json(err)
        } else {
            let senders = docs.map(d => d.sender)
            User.find({ _id: { $in: senders } })
                .then(many => res.json(many))
                .catch(err => res.status(400).json(err))
        }
    })
}

module.exports.acceptInvite = (req, res) => {
    const { accepted, sender_id, receiver_id } = req.body
    Friend.findOneAndUpdate({ receiver: receiver_id, sender: sender_id }, { 'status': accepted ? 'accepted' : 'rejected' }, function (err, one) {
        console.log(one)
        if (err != null) {
            res.json(err)
        } else {
            res.json(one)
        }
    })
}

module.exports.getAll = (req, res) => {
    let me = req.query.me
    Friend.find({$or: [{ sender: me, status: 'accepted' }, { receiver: me, status: 'accepted' }]}, function (err, docs) {
        let friends = [...docs.map(d => d.receiver), ...docs.map(d => d.sender)]
        User.find({$and: [{ _id: { $in: friends } }, { _id: { $ne: me } }]})
            .then(many => {
                res.json(many)
            })
            .catch(err => res.json(err))
    })
}


module.exports.findAllFriends = (req, res) => {
    let me = req.query.me
    console.log(me)

    Friend.find({ $or: [{ sender: me }, { receiver: me }] }, function (err, docs) {
        // Friend.find({sender: {_id: me }}, 'receiver._id', function (err, docs) {
        let friends = [...[me], ...docs.map(d => d.receiver), ...docs.map(d => d.sender)]
        let pendingFriends = new Set(docs.filter(d => d.status === 'pending').map(d => d.receiver))

        User.find({ _id: { $nin: friends } })
            .then(many => {
                data = []
                for (m of many) {
                    let d = m.toJSON()
                    d.status = pendingFriends.has(d._id) ? 'pending' : ''
                    data.push(d)
                }
                res.json(data)
            })
            .catch(err => res.json(err))
    })
}


module.exports.findOneFriend = (req, res) => {
    Friend.findOne({ name: req.body.name })
        .then(one => res.json(one))
        .catch(err => res.json(err))
}


module.exports.findAllUsers = (req, res) => {
    let isFriend = req.query.friend
    let me = req.query.me
    if (!!isFriend) {
        Friend.find({ sender: me }, function (err, docs) {
            // Friend.find({sender: {_id: me }}, 'receiver._id', function (err, docs) {
            let friends = [...[me], ...docs.filter(d => d.status === 'accepted').map(d => d.receiver)]
            let pendingFriends = new Set(docs.filter(d => d.status !== 'accepted').map(d => d.receiver))
            User.find({ _id: { $nin: friends } })
                .then(many => {
                    data = []
                    for (m of many) {
                        let d = m.toJSON()
                        d.status = pendingFriends.has(d._id) ? 'pending' : ''
                        data.push(d)
                    }
                    res.json(data)
                })
                .catch(err => res.json(err))
        })
    } else {
        User.find({})
            .then(many => res.json(many))
            .catch(err => res.json(err))
    }
}
// module.exports.updateFriend = (req, res) => {
//     Friend.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
//         .then(updateOne => res.json(updateOne))
//         .catch(err => res.status(400).json(err))
// }

module.exports.deleteFriend = (req, res) => {
    Friend.deleteOne({ _id: req.params.id })
        .then(deleteOne => res.json(deleteOne))
        .catch(err => res.json(err))
}