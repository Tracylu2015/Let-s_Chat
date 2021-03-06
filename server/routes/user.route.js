const UserController = require('../controllers/user.controller')
const FriendController = require('../controllers/friend.controller')
const GroupController = require('../controllers/group.controller')
const ChatController = require('../controllers/chat.controller')

module.exports = app => {
    app.post('/api/user/signIn', UserController.signIn)
    app.post('/api/user/register', UserController.register)
    app.get('/api/users', UserController.findAllUsers)
    app.get('/api/user/info', UserController.findOneUser)
    app.put('/api/user/edit/:uid', UserController.updateUser)
    // app.delete('/api/user/:id', UserController.deleteUser)
    app.get('/api/friend/getall',FriendController.getAll)
    app.get('/api/friend',FriendController.findOneFriend)
    app.post('/api/friend',FriendController.requestFriend)
    app.get('/api/friend/findFrinds',FriendController.findAllFriends)
    app.get('/api/friend/pendinginvite',FriendController.pendingInvite)
    app.put('/api/friend/acceptinvite',FriendController.acceptInvite)
    app.get('/api/groups',GroupController.findAllGroups)
    app.get('/api/chat/findAll',ChatController.findAllChats)
    app.post('/api/chat/create',ChatController.createChat)
    

    // }
}