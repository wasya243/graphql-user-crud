const User = require('../models/User');

const resolvers = {
    // should be mapped to query name to work
    user: async ({ id }) => {
        try {
          const user = await User.findById(id);
          return user;
        } catch (err) {
          throw new Error("Error retrieving user");
        }
    },
    // should be mapped to query name to work
    users: async ({ page, perPage }) => {
        try {
          const total = await User.countDocuments();
          const totalPages = Math.ceil(total / perPage);

          const users = await User
            .find()
            .limit(perPage)
            .skip(page * perPage);
          
          return { users, totalPages, total, currentPage: page };
        } catch (err) {
          throw new Error("Error retrieving users");
        }
    },
    // should be mapped to mutation name to work
    createUser: async ({ firstName, lastName, email }) => {
        try {
          const user = new User({ firstName, lastName, email });
          await user.save();
          return user;
        } catch (err) {
          throw new Error("Error creating user");
        }
    },
    // should be mapped to mutation name to work
    updateUser: async ({ id, firstName, lastName, email }) => {
        try {
          const user = await User.findByIdAndUpdate(
            id,
            { firstName, lastName, email },
            { new: true }
          );
          return user;
        } catch (err) {
          throw new Error("Error updating user");
        }
    },
    // should be mapped to mutation name to work
    deleteUser: async ({ id }) => {
        try {
          const user = await User.findByIdAndDelete(id);
          return user;
        } catch (err) {
          throw new Error("Error deleting user");
        }
    },
};

module.exports = resolvers;
