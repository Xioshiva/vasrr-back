const mongoose = require('mongoose');
const Group = require('./Group');
const Schema = mongoose.Schema;

const scenarioSchema = new Schema({
    name : String,
    conf: {
      type: Object,
      required: false
    },
    groups : [ { type: Schema.Types.ObjectId, ref: 'Group' } ]
  });

  module.exports = mongoose.model('Scenario', scenarioSchema);