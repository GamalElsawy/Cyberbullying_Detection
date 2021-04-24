const Post = require('../models/Post');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { json } = require('express');
const { Query } = require('mongoose');
const path = require('path');
const { Console } = require('console');

// @desc-> Get all posts
// @route-> GET /api/v1/posts
// @access-> Public
exports.getPosts = asyncHandler(async (req, res, next) => {
	const posts = await Post.find();


	res.status(200).json({success: true, data: posts});
});

// @desc-> Get single post
// @route-> GET /api/v1/posts/:id
// @access-> Public
exports.getPost = asyncHandler(async (req, res, next) => {
	const post = await Post.findById(req.params.id);

	if (!post) {
		// if not in database BUT correctly formatted
		next(
			new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
		);
	} else {
		// if in database AND correctly formatted
		res.status(201).json({ success: true, data: post });
	}
});

// @desc-> Create single post
// @route-> POST /api/v1/post
// @access-> Private
exports.createPost = asyncHandler(async (req, res, next) => {
	// add user to req.body
	//req.body.user = req.user.id;

	// Check for published post
	//const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

	// If user is not an admin, then can add only one bootcamp
	/*if (publishedBootcamp && req.user.role !== 'admin') {
		return next(
			new ErrorResponse(
				`user with ID ${req.user.id} has already added a bootcamp`,
				400
			)
		);
	}*/

	//console.log(post);
	const post = await Post.create(req.body);
	

	res.status(201).json({ success: true, data: post });
});

// @desc-> Update post
// @route-> PUT /api/v1/posts/:id
// @access-> Private
exports.updatePost = asyncHandler(async (req, res, next) => {
	let post = await Post.findById(req.params.id);

	/*if (!post) {
		next(
			new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
		);
	} else {
		// Check if this user is the owner of this post
		if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
			next(
				new ErrorResponse(
					`User with ID ${req.params.id} is not authorized to update this post`,
					401
				)
			);
		} else {
			post = await Post.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});
			res.status(201).json({ success: true, data: post });
		}
	}*/
	if(!post){
		next(
			new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
		);
	}else{

		post = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(201).json({ success: true, data: post });
	}
});

// @desc-> Delete bootcamp
// @route-> DELETE /api/v1/bootcamps/:id
// @access-> Private
exports.deletePost = asyncHandler(async (req, res, next) => {
	const post = await Post.findById(req.params.id);
	if (!post) {
		next(
			new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
		);
		//res.status(400).json({ success: false });
	} else {
		// Check if this user is the owner of this bootcamp
		/*if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
			next(
				new ErrorResponse(
					`User with ID ${req.params.id} is not authorized to delete this bootcamp`,
					401
				)
			);
		} */

			await post.remove();
			res.status(201).json({ success: true, data: {} });
		
	}
});

