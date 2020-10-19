/* eslint-disable prettier/prettier */
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const AppError = require('./../utils/appError');
const User = require('./../models/userModel');

exports.protect = async (req, res, next) => {
    try {
        // 1) Getting token and check of it's there
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
    
        if (!token) {
            throw new AppError('You are not logged in! Please log in to get access.', 401);
        }
    
        // 2) Verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            throw new AppError(
                'The user belonging to this token does no longer exist.',
                401
            );
        }
    
        // 4) Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            throw new AppError('User recently changed password! Please log in again.', 401);
        }
  
        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        res.locals.user = currentUser;

        return currentUser;
    } catch(error) {
        console.error(error)
        throw error;
    }
};

exports.restricsTo = (req, roles) => {
    try {
        // roles ['admin', 'lead-guide']. role='user'
        if (!roles.includes(req.user.role)) {
            throw new AppError('You do not have permission to perform this action', 403);
        };

        return true;
    } catch(err) {
        throw err;
    }
}

exports.test = () => {
    try {
        throw new AppError('Test error', 401);
    } catch(err) {
        throw err;
    }
}