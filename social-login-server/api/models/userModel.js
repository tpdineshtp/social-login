'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userName: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String
  },
  validationHash: {
    type: String
  },
  isActive: {
    type: Boolean
  },

  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
