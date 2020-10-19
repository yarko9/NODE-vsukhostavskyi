/* eslint-disable prettier/prettier */
const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

// router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);  //done

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBookings)                                        //done
  .post(bookingController.createBooking);                                       //done

router
  .route('/:id')
  .get(bookingController.getBooking)                                            //done
  .patch(bookingController.updateBooking)                                       //done
  .delete(bookingController.deleteBooking);                                     //done

module.exports = router;
