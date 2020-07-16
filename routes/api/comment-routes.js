const router = require('express').Router();
// const { addComment, removeComment } = require('../../controllers/comment-controller');

const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');



// /api/comments/<pizzaId> use the addComment() method as a POST callback
router.route('/:pizzaId').post(addComment);

// /Create PUT route to handle addNewReply
//api/comments/<pizzaId>/<commentId> use the removeComment method as a DELETE callback
router.route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment)

//delete route to handle removeReply
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);


module.exports = router;