const { Group } = require('../models/chat.model')

module.exports.findAllGroups = (req, res) => {
    Group.find({users: req.query.me})
        .then(many => res.json(many))
        .catch(err => res.json(err))
}

module.exports.findOneGroup = (req, res) => {
    Group.findOne({ _id: req.params.id })
        .then(one => res.json(one))
        .catch(err => res.json(err))
}

// module.exports.deleteGroup = (req, res) => {
//     // Group.deleteOne({ _id: req.params.id })
//     //     .then(deleteOne => res.json(deleteOne))
//     //     .catch(err => res.json(err))
// }

module.exports.createGroup = (req, res) => {
    let { users, groupName } = req.body
    Group.findOneAndUpdate({ users: users, groupName: groupName }, { users, groupName }, {
        new: true,
        upsert: true
    }).then(one => res.json(one))
        .catch(err => res.json(err))
}