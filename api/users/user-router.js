const express = require("express");

const db = require("../../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("users")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", async (req, res, next) => {
  try {
    const rows = await db("users as u")
      .leftJoin("posts as p", "u.id", "=", "p.user_id")
      .select("p.id as post_id", "p.contents", "u.username", "u.id as user_id")
      .where("u.id", req.params.id);
    const result = { 
      posts: rows[0].post_id
        ? rows.map((row) => ({ post_id: row.post_id, contents: row.contents }))
        : [],
      username: rows[0].username,
      user_id: rows[0].user_id,
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res) => {
  const userData = req.body;

  db("users")
    .insert(userData, "id")
    .then((ids) => {
      res.status(201).json({ created: ids[0] });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

router.get("/:id/posts", async (req, res, next) => {
  try {
    const rows = await db("users as u")
      .join("posts as p", "u.id", "=", "p.user_id")
      .select("p.id as post_id", "p.contents", "u.username as user")
      .where("u.id", req.params.id);
    console.log(rows);
    res.json(rows);
  } catch (error) {
    next();
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("users")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("users")
    .where({ id })
    .del()
    .then((count) => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;
