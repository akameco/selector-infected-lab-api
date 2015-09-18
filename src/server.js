import express from 'express'
import bodyParser from 'body-parser'
import getLab from './lab'

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = process.env.PORT || 8080
const router = express.Router()

router.use((req, res, next) => {
  next()
})

router.get('/search', (req, res) => {
  const queryID = req.query.id
  try {
    getLab().then(arr => {
      let obj = arr.filter(e => {
        return e.id === queryID
      })[0]
      console.log(obj)
      res.json(obj)
    })
  } catch (e) {
    res.send('fuck')
  }
})


router.get('/count', (req, res) => {
  try {
    getLab().then(arr => {
      let output = arr
      .map(e=> e.lab)
      .reduce((sum, x) => {
        sum[x] = sum[x] + 1 || 1
        return sum
      }, {})

      console.log(output)
      res.json(output)
    })
  } catch (e) {
    res.send('fuck')
  }
})


app.use('/api/v1', router)

app.listen(port)
console.log('listen port', port)
