const mongoose = require('mongoose');
mongoose.connect("mongodb://root:rootroot@192.168.31.23:27017/chats?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));

