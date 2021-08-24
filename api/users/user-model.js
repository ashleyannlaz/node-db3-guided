const db = require("../../data/db-config.js")

module.exports = {
    getUserPosts(id){
        return db("users as u")
            .join("posts as p","p.user_id","u.id")
            .select("p.id as PhilosopherId","u.username","p.contents")
            .where("u.id",id)
    }
}