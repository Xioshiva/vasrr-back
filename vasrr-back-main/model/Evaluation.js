const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const evaluationSchema = new Schema({
    annotations: {
      type: Object,
      required: true
    },
    time : {
      type: Object,
      required: true
    },
    scenario : { type: Schema.Types.ObjectId, ref: 'Scenario' },
  });
  
module.exports = mongoose.model('Evaluation', evaluationSchema);