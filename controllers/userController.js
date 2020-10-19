/* eslint-disable prettier/prettier */
const multer = require('multer');
const sharp = require('sharp');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
};

exports.updateMe = async (req, args) => {
    try {
        // 1) Create error if user POSTs password data
        if (args.password || args.passwordConfirm) {
            throw new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            );
        }

        // 2) Filtered out unwanted fields names that are not allowed to be updated
        const filteredBody = filterObj(args, 'name', 'email');
        if (args.file) filteredBody.photo = args.file.filename;

        // 3) Update user document
        const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true
        });

        return updatedUser;
    } catch(err) {
        console.error(err);
        return err;
    }
};

exports.deleteMe = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });

  return user;
};

exports.createUser = (req, res) => {
    throw new AppError(
        'This route is not defined! Please use /signup instead',
        400
    );
};

exports.getUser = args => factory.getOne(User, null, args);
exports.getAllUsers = args => factory.getAll(User, args);

// Do NOT update passwords with this!
exports.updateUser = args => factory.updateOne(User, args);
exports.deleteUser = args => factory.deleteOne(User, args);
