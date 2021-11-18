const { User, Friend } = require('../models/chat.model')

module.exports.register = (req, res) => {
    const { name, email, password, _id } = req.body
    User.create({ name, email, password, _id })
        .then(one => res.json(one))
        .catch(err => res.status(400).json(err))
}

module.exports.signIn = (req, res) => {
    User.findById({ _id: req.body._id })
        .then(one => res.json(one))
        .catch(err => res.status(400).json(err))
}

module.exports.findOneUser = (req, res) => {
    User.findOne({ _id: req.query.me })
        .then(one => res.json(one))
        .catch(err => res.json(err))
}

module.exports.findAllUsers = (req, res) => {
    User.find({})
        .then(many => res.json(many))
        .catch(err => res.json(err))
}

module.exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.uid }, req.body, { new: true, runValidators: true })
        .then(updateOne => {
            console.log(req.body)
            res.json(updateOne)})
        .catch(err => res.status(400).json(err))
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(deleteOne => res.json(deleteOne))
        .catch(err => res.json(err))
}



