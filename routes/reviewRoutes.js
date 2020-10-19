/* eslint-disable prettier/prettier */
const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)                  //done
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview                       //done
  );

router
  .route('/:id')
  .get(reviewController.getReview)                      //done
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview                       //done
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview                       //done
  );

module.exports = router;
