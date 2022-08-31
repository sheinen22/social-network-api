const { User, Thought } = require("../models");

//get all thoughts - find
//get single thought by id - findone
//post create a new thought - needs association with users thoughts - create
//put update a thought by id - findoneandupdate
//delete remove a thought by id - findoneanddelete
//use usercontroller and change key terms - post route will be different

module.exports = {
    getThoughts(req, res) {
      Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
  
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
          .then((thought) => 
              !thought
                  ? res.status(404).json({ message: 'Invalid ID'})
                  : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
  
    addThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
              return User.findOneAndUpdate({ _id: req.body.userId}, { $push: { thoughts: thought._id} }, { new: true });
          })
          .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'Invalid ID' })
                : res.json('Thought added')
          )
          .catch((err) => {
              res.status(500).json(err);
          });
    },
  
  updateThought(req, res) {
      Thought.findOneAndUpdate({ _id: req.params.thoughtId}, { $set: req.body }, { runValidators: true, new: true})
      .then((thought) => 
          !thought
              ? res.status(404).json({ message: 'Invalid ID'})
              : res.json(thought)
      )
      .catch((err) => {
          res.status(500).json(err);
      });
  },
  
  addReaction(req, res) {
      Thought.findOneAndUpdate({ _id: req.params.thoughtId}, { $push: { reactions: req.body}}, { runValidators: true, new: true})
      .then((thought) => 
          !thought
              ? res.status(404).json({ message: 'Invalid ID'})
              : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  deleteReaction(req, res) {
      Thought.findOneAndUpdate({ _id: req.params.thoughtId}, { $pull: { reactions: { reactionId: req.params.reactionId}}}, { runValidators: true,new: true })
      .then((thought) => 
          !thought
              ? res.status(404).json({ message: 'Invalid ID'})
              : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  deleteThought(req, res) {
      Thought.findOneAndRemove({ _id: req.params.thoughtId})
      .then((thought) => 
          !thought
              ? res.status(404).json({ message: 'Invalid ID'})
              : res.json({ message: 'Thought deleted'})
      )
      .catch((err) => res.status(500).json(err))
  }
  
  
  };