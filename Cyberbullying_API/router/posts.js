const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

const {
	getPosts, getPost, createPost, updatePost, deletePost
} = require('../controllers/posts');

const Post = require('../models/Post');
//const advansedResults = require('../middleware/advansedResults');

//router.use('/:bootcampId/courses', courseRouter);
//router.use('/:bootcampId/reviews', reviewRouter);

router
	.route('/')
	.get(/*advansedResults(Bootcamp, 'courses'),*/ getPosts)
	.post(/*protect, authorize('publisher', 'admin'),*/ createPost);

router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

/*router.route('/things').get(getSomethings);

router
	.route('/:id')
	.get(getBootcamp)
	.put(protect, authorize('publisher', 'admin'), updateBootcamp)
	.delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

router
	.route('/:id/photo')
	.put(protect, authorize('publisher', 'admin'), bootcampUploadPhoto);*/
module.exports = router;
