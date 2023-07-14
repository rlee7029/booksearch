const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    bookId: {
      type: String,
      required: true,
    },
    authors: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
