const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const advansedResults = require('../middleware/advansedResults');

// @desc-> Get comment(s)
// @route-> GET /api/v1/comments
// @route-> GET /api/v1/comments/postId
// @access-> Public
exports.getComments = asyncHandler(async (req, res, next) => {
    let comments;
    if (req.params.postId) {
    // get posts related to specific post
    comments = await Comment.find({ post: req.params.postId });

    return res
      .status(200)
      .json({ success: true, count: comments.length, data: comments });
  } else {

    // get all posts existing in db
    comments = await Comment.find();
    res.status(404).json({success: true, data: comments});
  }
});

// @desc-> Get single comment
// @route-> GET /api/v1/comment/:id
// @access-> Public

/*exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({ success: true, data: course });
});*/

// @desc-> Add comment
// @route-> POST /api/v1/post/:postId/comments
// @access-> Private
exports.CreateComment = asyncHandler(async (req, res, next) => {
  req.body.post = req.params.postId;
  //req.body.user = req.user.id;
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(
      new ErrorResponse(
        `No post with the id of ${req.params.postId}`,
        404
      )
    );
  }

  const comment = await Comment.create(req.body);

  return res.status(200).json({ success: true, data: comment });
});

// @desc-> Update comment
// @route-> PUT /api/v1/comments/:id
// @access-> Private
exports.updateComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Check if this user is the owner of this comment 
  /*if(course.user.toString() !== req.user.id && req.user.role !== 'admin'){
    return next(
      new ErrorResponse(`User with ID ${req.user.id} is not authorized to update this course`, 401)
    );
  }*/

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({ success: true, data: comment });
});

// @desc-> Delete comment
// @route-> DELETE /api/v1/comment/:id
// @access-> Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Check if this user is the owner of this course 
  /*if(course.user.toString() !== req.user.id && req.user.role !== 'admin'){
    return next(
      new ErrorResponse(`User with ID ${req.user.id} is not authorized to delete this course`, 401)
    );
  }*/
  
  await comment.remove();
  return res.status(200).json({ success: true, data: {} });
  
});
