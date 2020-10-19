/* eslint-disable prettier/prettier */
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    # USERS
    hello: String
    getMe: User
    getAllUsers(args: FilterInput): [User]!
    getUser(id: ID!): User

    # TOURS
    getTop5Tours: [Tour]!
    getTourStats: [TourStats]!
    getMonthlyPlan(year: String!): [MonthlyPlan]!
    getToursWithin(distance: Int!, latlng: String!, unit: LenghtUnit!): [Tour]!
    getDistances(latlng: String!, unit: LenghtUnit!): [TourDistance]!
    getAllTours(args: FilterInput): [Tour]!
    getTour(id: ID!): Tour!

    #REVIEWS
    getAllReviews(args: FilterInput): [Review]!
    getReview(id: ID!): Review!

    #BOOKINGS
    getCheckoutSession(tourId: ID!): ID!
    getAllBookings(args: FilterInput): [Booking]!
    getBooking(id: ID!): Booking!
}

  type Mutation {
    # AUTH
    login(email: String, password: String): User
    logout: Boolean
    signup(
      name: String
      email: String
      password: String
      passwordConfirm: String
    ): User
    forgotPassword(email: String): String
    resetPassword(
      password: String
      passwordConfirm: String
      token: String
    ): User
    updatePassword(
      password: String
      passwordConfirm: String
      passwordCurrent: String
    ): User

    # USERS
    updateMe(email: String, name: String, photo: String): User
    deleteMe: User
    createUser: User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): User

    # TOURS
    createTour(args: CreateTourInput): Tour!
    updateTour(args: UpdateTourInput): Tour!
    deleteTour(id: ID!): Tour!

    #REVIEWS
    createReview(args: CreateReviewInput): Review!
    updateReview(args: UpdateReviewInput): Review!
    deleteReview(id: ID!): Review!

    #BOOKINGS
    createBooking(args: CreateBookingInput): Booking!
    updateBooking(args: UpdateBookingInput): Booking!
    deleteBooking(id: ID!): Booking!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    photo: String
    role: String
    passwordChangedAt: Date
    passwordResetToken: String
    passwordResetExpires: Date
    active: Boolean
  }
  
  type Tour {
    id: ID
    name: String
    slug: String
    duration: Int
    maxGroupSize: Int
    difficulty: Difficulty #['easy', 'medium', 'difficult'],
    ratingsAverage: Float
    ratingsQuantity: Int
    price: Float
    priceDiscount: Float
    summary: String!
    description: String
    imageCover: String
    images: [String]
    createdAt: Date
    startDates: [Date]
    secretTour: Boolean
    startLocation: LocationType
    locations: [LocationType]!
    guides: [User]!
  }

  type Review {
    id: ID
    review: String
    rating: Int
    createdAt: Date
    tour: ID
    user: ID
  }
  
  type Booking {
    id: ID
    price: Float
    createdAt: Date
    paid: Boolean
  }

  type TourStats {
    _id: String
    numTours: Int,
    numRatings: Int,
    avgRating: Float,
    avgPrice: Float,
    minPrice: Float,
    maxPrice: Float
  }

  type MonthlyPlan {
    numTourStarts: Int
    tours: [String]!
    month: Int
  }

  type TourDistance {
      _id: ID
      name: String
      distance: Float
  }

  type LocationType {
    type: String,
    coordinates: [Float],
    description: String,
    address: String
  }

  input CreateTourInput {
    name: String!
    slug: String
    duration: Int!
    maxGroupSize: Int!
    difficulty: Difficulty! #['easy', 'medium', 'difficult'],
    price: Float!
    priceDiscount: Float
    summary: String!
    description: String
    imageCover: String
    images: [String]
    startDates: [Date]
    secretTour: Boolean
    guides: [String]!
    startLocation: GeoInput
  }
  
  input UpdateTourInput {
    id: ID!
    name: String
    duration: Int
    maxGroupSize: Int
    difficulty: Difficulty 
    price: Float
    priceDiscount: Float
    summary: String
    description: String
    imageCover: String
    startDates: [Date]
    secretTour: Boolean
    startLocation: GeoInput
  }

  input GeoInput {
      type: String
      coordinates: [Float]!
  }

  input FilterInput {
    page: Int
    limit: Int
    sort: String
  }

  input CreateReviewInput {
      tour: ID!
      user: ID!
      review: String!
      rating: Int
  }
  input UpdateReviewInput {
      id: ID!
      review: String!
      rating: Int
  }
  
  input CreateBookingInput {
      tour: ID!
      user: ID!
      price: Float!
      paid: Boolean
  }
  input UpdateBookingInput {
      id: ID!
      price: Float
      paid: Boolean
  }

  scalar Date

  enum Difficulty {
      easy
      medium
      difficult
  }

  enum LenghtUnit {
      mi
      km
  }
`;

module.exports = typeDefs;
