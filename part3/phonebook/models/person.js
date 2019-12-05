const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
// You will need to add the password in the .env file! It has been removed for securtiy purposes
const url = process.env.MONGODB_URI

mongoose.connect(url, {useNewUrlParser: true})
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// validation: only add one number for a person, name must be at least 3char and number must be at least 8 digits

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: String,
  id: String
})

//removes _v and converts _id to string
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
