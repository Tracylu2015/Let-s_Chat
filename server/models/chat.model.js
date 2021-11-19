const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, 'must have an id'],
    },
    name: {
        type: String,
        required: [true, 'must have a name'],
        minlength: [2, 'name must be at least 2 characters']
    },
    email: {
        type: String
    },
    avatar: {
        type: String,
        default: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/avatar-2061518-1761330.png'
    },
    numOfChats: {
        type: Number,
        default: 0
    },
    numOfInvitations: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: [true]
    },
    users: [
        {
            type: String
        }
    ],
}, { timestamps: true });

const ChatSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: [true, 'must have a message'],
        minlength: [1, 'message must be at least 1 character or emoji']
    },
    sender: {
        type: String,
        required: [true, 'must have a sender id']
    },
    receiver: {
        type: String,
        required: [true, 'must have a receiver id']
    }
}, { timestamps: true });

const GroupChatSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: [true, 'must have a message'],
        minlength: [1, 'message must be at least 1 character or emoji']
    },
    sender: {
        type: String,
        required: [true, 'must have a sender id']
    },
    group: GroupSchema
}, { timestamps: true });

const FriendSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: [true]
    },
    receiver: {
        type: String,
        required: [true]
    },
    status: {
        type: String,
        default: ''
    },
}, { timestamps: true });

module.exports.User = mongoose.model('User', UserSchema);

module.exports.Chat = mongoose.model('Chat', ChatSchema);

module.exports.GroupChat = mongoose.model('GroupChat', GroupChatSchema);

module.exports.Friend = mongoose.model('Friend', FriendSchema);

module.exports.Group = mongoose.model('Group', GroupSchema);