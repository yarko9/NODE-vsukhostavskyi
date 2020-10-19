/* eslint-disable prettier/prettier */
const userController = require('./../controllers/userController');
const tourController = require('./../controllers/tourController');
const reviewController = require('./../controllers/reviewController');
const bookingController = require('./../controllers/bookingController');
const { protect, restricsTo } = require('./helpers');

const Query = {
    hello: () => 'Hello worlddddd!',

    //===============================USERS========================================
    getMe: async (parent, args, { req, res }, info) => {
        try{
            await protect(req, res);

            userController.getMe(req);

            return await userController.getUser({id: req.params.id})
        } catch(err) {
            console.error(err);
            return err;
        }
    },

    getAllUsers: async (parent, {args}, { req, res }, info) => {
        try{
            await protect(req, res);
            restricsTo(req, ['admin']);

            return await userController.getAllUsers({ query: args });

            // return await userController.getUser({id: req.params.id})
        } catch(err) {
            console.error(err);
            return err;
        }
    },

    getUser: async (parent, { id }, { req, res }, info) => {
        try{
            await protect(req, res);
            restricsTo(req, ['admin']);

            return await userController.getUser({id})
        } catch(err) {
            console.error(err);
            return err;
        }
    },

    // =========================TOURS============================

    getTop5Tours: async (parent, args, { req, res }, info) => {
        try{
            const query = tourController.aliasTopTours();

            return await tourController.getAllTours({ query });
        } catch(err) {
            console.error(err);
            return err;
        }
    },
    
    getTourStats: async (parent, args, { req, res }, info) => {
        try{
            return await tourController.getTourStats();
        } catch(err) {
            console.error(err);
            return err;
        }
    },
    
    getMonthlyPlan: async (parent, { year }, { req, res }, info) => {
        try{
            await protect(req, res);
            restricsTo(req, ['admin', 'lead-guide', 'guide']);

            return await tourController.getMonthlyPlan(year);
        } catch(err) {
            console.error(err);
            return err;
        }
    },
    
    getToursWithin: async (parent, args, { req, res }, info) => {
        try{
            return await tourController.getToursWithin(args);
        } catch(err) {
            console.error(err);
            return err;
        }
    },
    
    getDistances: async (parent, args, { req, res }, info) => {
        try{
            return await tourController.getDistances(args);
        } catch(err) {
            console.error(err);
            return err;
        }
    },
    
    getAllTours: async (parent, {args}, { req, res }, info) => {
        try{
            return await tourController.getAllTours({ query: args });
        } catch(err) {
            console.error(err);
            return err;
        }
    },
    
    getTour: async (parent, { id }, { req, res }, info) => {
        try{
            return await tourController.getTour({ id });
        } catch(err) {
            console.error(err);
            return err;
        }
    },

    // =========================REVIEWS============================

    getAllReviews: async (parent, {args}, { req, res }, info) => {
        try{
            await protect(req, res);

            return await reviewController.getAllReviews({ query: args });
        } catch(err) {
            console.error(err);
            return err;
        }
    },

    getReview: async (parent, { id }, { req, res }, info) => {
        try{
            await protect(req, res);

            return await reviewController.getReview({ id });
        } catch(err) {
            console.error(err);
            return err;
        }
    },

    // =========================BOOKINGS============================

    getCheckoutSession: async (parent, { tourId }, { req, res }, info) => {
        try{
            await protect(req, res);

            return await bookingController.getCheckOutSession(req, res, tourId);
        } catch(err) {
            console.error(err);
            return err;
        }
    },

    getAllBookings: async (parent, {args}, { req, res }, info) => {
        try{
            await protect(req, res);
            restricsTo(req, ['admin', 'lead-guide']);

            return await bookingController.getAllBookings({ query: args });
        } catch(err) {
            console.error(err);
            return err;
        }
    },

    getBooking: async (parent, { id }, { req, res }, info) => {
        try{
            await protect(req, res);
            restricsTo(req, ['admin', 'lead-guide']);

            return await bookingController.getBooking({ id });
        } catch(err) {
            console.error(err);
            return err;
        }
    }
};

module.exports = Query;
