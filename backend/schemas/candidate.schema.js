const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
   firstName: { type: String, required: true},
   lastName:{type: String, required: true},
   email:{type: String, required : true},
   phone: {type: String, required: true},
   registrationId:{type:String, required:true},
   birthDay:{type:Date},
   // transactionId:{type:String},
   // paid: {type: Boolean, default: false}
},{timestamps: true});


const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;