const mongoose = require('mongoose');
const slugify = require('slugify');

const PostSchema = mongoose.Schema(
  {
    slug: String,
    content: {
      type: String,
      required: [true, 'Please add a content'],
      minlength: [1, 'Post\'s min length is 1 char'],
      maxlength: [2000, 'Post\'s max length is 2000 chars'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/*PostSchema.pre('save', function (next) {
  this.slug = slugify(this.content, { lower: true });
  next();
});*/

// Cascade delete courses when a bootcamp is deleted
/*PostSchema.pre('remove', async function (next) {
  await this.model('Comment').deleteMany({ post: this._id });
  next();
});*/

// Reverse populate with virtuals
/*PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  justOne: false,
});*/
module.exports = mongoose.model('Post', PostSchema);
