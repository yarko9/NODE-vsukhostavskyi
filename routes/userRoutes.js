const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup); //done
router.post('/login', authController.login); //done
router.get('/logout', authController.logout); //done

router.post('/forgotPassword', authController.forgotPassword); //done
router.patch('/resetPassword/:token', authController.resetPassword); //done

// Protect all routes after this middleware
router.use(authController.protect); //done

router.patch('/updateMyPassword', authController.updatePassword); //done
router.get('/me', userController.getMe, userController.getUser); //done
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe // done
);
router.delete('/deleteMe', userController.deleteMe); //done

router.use(authController.restrictTo('admin')); //done

router
  .route('/')
  .get(userController.getAllUsers) //done
  .post(userController.createUser); //done

router
  .route('/:id')
  .get(userController.getUser) //done
  .patch(userController.updateUser) //done
  .delete(userController.deleteUser); //done

module.exports = router;
