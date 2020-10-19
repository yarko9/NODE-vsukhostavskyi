const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');
// const catchAsync = require('./../utils/catchAsync');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = args => factory.getAll(Review, args);
exports.getReview = args => factory.getOne(Review, null, args);
exports.createReview = args => factory.createOne(Review, args);
exports.updateReview = args => factory.updateOne(Review, args);
exports.deleteReview = args => factory.deleteOne(Review, args);
