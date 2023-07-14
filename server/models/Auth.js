const mongoose = require('mongoose');
const { Schema } = mongoose;

const authSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }
);

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;
