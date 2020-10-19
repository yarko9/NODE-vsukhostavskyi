/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const Query = require('./Query');
const Mutation = require('./Mutation');
const Date = require('./Date');
const User = require('./../models/userModel');

module.exports = {
    Query,
    Mutation,
    Date,
    Tour: {
        guides: async (parent, args, context, info) => {
            const guide = await User.find({
                '_id': { $in: parent.guides.map(item => mongoose.Types.ObjectId(item._id))}
            });

            return guide;
        }
    }
}