const { Group } = require('../models/chat.model')

module.exports.findAllGroups = (req, res) => {
    Group.find({})
        .then(many => res.json(many))
        .catch(err => res.json(err))
}

module.exports.findOneGroup = (req, res) => {
    Friend.findOne({ _id: req.params.id })
        .then(one => res.json(one))
        .catch(err => res.json(err))
}


module.exports.deleteGroup = (req, res) => {
    Friend.deleteOne({ _id: req.params.id })
        .then(deleteOne => res.json(deleteOne))
        .catch(err => res.json(err))
}