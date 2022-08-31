const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    addThought,
    updateThought,
    addReaction,
    deleteReaction,
    deleteThought,
} = require('../../controllers/thoughtsController');


router.route('/').get(getThoughts).post(addThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;