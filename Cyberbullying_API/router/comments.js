const express = require('express');
const router = express.Router();

//const { protect, authorize } = require('../middleware/auth');

const {
	getComments, CreateComment, updateComment, deleteComment
} = require('../controllers/comments');

const Post = require('../models/Post');

router
	.route('/')
	.get(/*advansedResults(Bootcamp, 'courses'),*/ getComments);
	
router.route('/:id').put(updateComment).delete(deleteComment);
router.route('/:postId').get(getComments).post(/*protect, authorize('publisher', 'admin'),*/ CreateComment);

module.exports = router;
