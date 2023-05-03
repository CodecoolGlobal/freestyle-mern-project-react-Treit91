const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    username: String,
    email: String,
    password: String,
    watchlist: Object,
    registeredAt: Date
})

const User = mongoose.model("User", userSchema);

module.exports = User;