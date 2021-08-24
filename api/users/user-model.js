const db = require("../../data/db-config.js")

module.exports = {
    getUserPosts(id){
        return db("users u")
            .join("posts p","p.user_id","u.id")
            .select("p.id","u.username","p.contents")
            .where("u.id",id)
    }
}