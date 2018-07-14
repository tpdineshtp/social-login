'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var socialLoginHistorySchema = new Schema({
  id: {
    type: String
  },
  email: {
    type: String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SocialLoginHistory', socialLoginHistorySchema);
