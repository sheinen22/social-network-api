const User = require("../models/User");

//get all users - find
//get single user by id + thought and friend data - findone
//post new user - create
//put update user by id - findoneandupdate
//delete remove user by id - findoneanddelete

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        
            .then((user) =>
                !user
                ? res
                  .status(404)
                  .json({ message: "No user found with that associated ID" })
                : res.json(user)
             )
            .catch((err) => res.status(500).json(err));
      },
      createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
      },
      deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: "Invalid ID",
                })
              : res.json({ message: "User has been deleted" })
            )
            .catch((err) => res.status(500).json(err));
      },
      updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true, runValidators: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({
                message: "Invalid ID",
                })
            : res.json(user)
        )
        .catch((err) => {
            res.status(500).json(err);
        });
      },
      addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
            )
            .then((user) =>
                !user
                ? res.status(404).json({
                    message: "Invalid ID",
                    })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
      },
      deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true, rundValidators: true }
            )
            .then((user) =>
                !user
                ? res.status(404).json({
                     message: "Invalid ID",
                    })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
        },
    };