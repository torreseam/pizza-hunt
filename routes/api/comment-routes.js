const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');




// /api/comments/<pizzaId> use the addComment() method as a POST callback
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId> use the removeComment method as a DELETE callback
router.route('/:pizzaId/:commentId').delete(removeComment);


module.exports = router;