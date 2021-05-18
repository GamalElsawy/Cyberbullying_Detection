const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const advansedResults = require('../middleware/advansedResults');
const User = require('../models/User');

// @desc-> Get comment(s)
// @route-> GET /api/v1/comments
// @route-> GET /api/v1/comments/postId
// @access-> Public
exports.getComments = asyncHandler(async (req, res, next) => {
    let comments;
    if (req.params.postId) {
    // get comments related to specific post
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
  //console.log(req.body.user);
  req.body.user = await User.findById(req.body.user);
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
  
  await comment.remove();
  return res.status(200).json({ success: true, data: {} });
  
});
