const User = require('../models/User');
const UserItem = require('../models/UserItem');

const resolvers = {
  Query: {
    // should map to query name -> otherwise it will not work
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (err) {
        throw new Error("Error retrieving user");
      }
    },
    // should map to query name -> otherwise it will not work
    users: async (_, { page = 0, perPage = 10 }) => {
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
    // should map to query name -> otherwise it will not work
    userItems: async (_, { id }) => {
      try {
        const userItems = await UserItem.find({ userId: id }).exec();
        return userItems;
      } catch (err) {
        throw new Error("Error retrieving user items");
      }
    },
  },
  Mutation: {
    // should be mapped to mutation name to work
    createUser: async (_, { firstName, lastName, email }) => {
      try {
        const user = new User({ firstName, lastName, email });
        await user.save();
        return user;
      } catch (err) {
        throw new Error("Error creating user");
      }
    },
    // should map to query name -> otherwise it will not work
    updateUser: async (_, { id, firstName, lastName, email }) => {
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
    // should map to query name -> otherwise it will not work
    createUserItem: async (_, { userId, itemName, description, amount }) => {
      try {
        const userItem = new UserItem({ userId, itemName, description, amount });
        await userItem.save();
        return userItem;
      } catch (err) {
        throw new Error("Error creating user item");
      }
    },
    // should map to query name -> otherwise it will not work
    deleteUserItem: async (_, { id }) => {
      try {
        const userItem = await UserItem.findByIdAndDelete(id);
        return userItem;
      } catch (err) {
        throw new Error("Error deleting user item");
      }
    },
    // should be mapped to mutation name to work
    deleteUser: async (_, { id }) => {
        try {
          const user = await User.findByIdAndDelete(id);
          return user;
        } catch (err) {
          throw new Error("Error deleting user");
        }
    },
  },
  // without it items will not be fetched on user, graphql invokes it when there items in user/users query
  User: {
    items: async (parent) => UserItem.find({ userId: parent.id }), // Fetch items for a user
  },
};

module.exports = resolvers;
