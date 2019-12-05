require('dotenv').config ()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))


//initial names?
let persons = [

  ]
//function for generating a unique id
const generateId = () => {
  const id = Math.floor(Math.random() * 1000)
  return id
}

//      Routes

app.get('/api/persons', (req, res) => {
  Person.find ({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))

  })
})

app.get('/info', (req, res) => {
  let date = new Date()
  Person.find({}).then(persons => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <p>${date}`)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById (req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove (req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  console.log(body)

  const person = {
    name: body.name,
    number: body.number,
    id: body.id
  }

  Person.findByIdAndUpdate (req.params.id, person, {new: true})
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  console.log(body)

    if (!body.name || !body.number) {
      return res.status(400).json({
        error: 'content missing'
      })
    }




    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save()
      .then(savedPerson => {
        res.json(savedPerson.toJSON())
      })
      .catch(err => next(err))

    persons = persons.concat(person)

})

//checks if request includes a correctly formatted but missing ID
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// create middleware that checks if request returns an error
const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({error: 'malformatted id'})
  }
  else if (error.name === 'MongoError' && error.code === 11000) {
    return res.status(409).json({error: error.message})
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({error: error.message})
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})
