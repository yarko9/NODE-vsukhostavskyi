/* eslint-disable prettier/prettier */
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = async (Model, { id }) => {
    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      throw new AppError('No document found with that ID', 404);
    }

    return doc;
};

exports.updateOne = async (Model, { id, body}) => {
    const doc = await Model.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      throw new AppError('No document found with that ID', 404);
    }

    return doc;
};

exports.createOne = async (Model, args) => {
    const doc = await Model.create(args);

    return doc;
}

exports.getOne = async (Model, popOptions, {id}) => {
    let query = Model.findById(id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
        throw new AppError('No document found with that ID', 404);
    }

    return doc;
};

exports.getAll = async (Model, { tourId, query = {} } = {}) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (tourId) filter = { tour: tourId };

    const features = new APIFeatures(Model.find(filter), query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    return doc;
};
