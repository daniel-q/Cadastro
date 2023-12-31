const  express = require('express')
const bodyParser = require('body-parser')
const routes  = require('../routes/routes')
const cors = require('cors');


const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use('/', routes)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})

module.exports = app