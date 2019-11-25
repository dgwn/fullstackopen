const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]

app.get('/info', (req, res) => {
  let date = new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
            <p>${date}`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find( person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter( person => person.id !== id)
  res.status(204).end
})

const generateId = () => {
  const id = Math.floor(Math.random() * 1000)
  return id
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(body)

    if (!body.name || !body.number) {
      return res.status(400).json({
        error: 'content missing'
      })
    }

    const names = persons.map( person => person.name)
    if (names.includes(body.name)) {
      return res.status(409).json({
        error: 'name already exists'
      })
    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }

    persons = persons.concat(person)
  res.json(persons)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}...`)
