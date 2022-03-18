const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid e-mail',
      ],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
  },
  {
    timeStamps: true,
  }
);

module.exports = model('User', userSchema);
