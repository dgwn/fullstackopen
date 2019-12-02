const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}


const password = process.argv[2]

const url = `mongodb+srv://user:${password}@phonebook-jwkqx.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  _id: mongoose.Schema.Types.ObjectId
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
  Person.find ({}).then(res => {
    res.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
  _id: new mongoose.Types.ObjectId()
})

person.save().then(res => {
  console.log(`Added "${person.name}" number ${person.number} to the phonebook`)
  mongoose.connection.close()
})
