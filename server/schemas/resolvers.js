const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks');

        return userData;
      }

      throw new Error('Not authenticated');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new Error('Invalid email or password');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      
      const user = await User.create({ username, email, password });
     
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
     
        const { bookId, authors, description, title, image, link } = bookData;

        // Create a new Book instance
        const newBook = new Book({
          bookId,
          authors,
          description,
          title,
          image,
          link,
        });
     
        await newBook.save();
     
       
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedBooks: newBook } },
          { new: true }
        ).populate('savedBooks');

       
        return updatedUser;
      }

      throw new Error('Not authenticated');
    },

    removeBook: async (parent, { bookId }, context) => {
      console.log('remove book id @ server', bookId)
      if (context.user) {

        const bk = await Book.findOne({ bookId });
        const updatedUser= await  User.findByIdAndUpdate(
          context.user._id, // Replace `userId` with the actual user's ObjectId
          { $pull: { savedBooks: bk._id } },
          { new: true }
        ).populate('savedBooks')

        updatedUser.savedBooks = updatedUser.savedBooks.filter(book => book.bookId.toString() !== bk.bookId.toString());
        updatedUser.savedBooks = updatedUser.savedBooks.filter(book => book !== bk);
        updatedUser.savedBooks = updatedUser.savedBooks.filter(book => book._id !== bk._id);
        updatedUser.savedBooks = updatedUser.savedBooks.filter(book => book.bookId !== bk.bookId);
        const savedUser = await updatedUser.save();
          console.log('savedUser',savedUser);
           return savedUser;
            
  
      }

      throw new Error('Not authenticated');
    },
  },
};

module.exports = resolvers;
