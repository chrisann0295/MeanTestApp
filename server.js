var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , morgan = require('morgan')
  , mongoose = require('mongoose')
  , jwt = require('jsonwebtoken')
  , port = process.env.PORT || 8080
  , config = require('./config')
  , path = require('path')
  
  

app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())

//Handling CORS requests
//Middleware
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
  next()
})

// Log all requests to the console
app.use(morgan('dev'))


//Connect to DB
mongoose.connect(config.database)

// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

 

//########################### ROUTES ########################### 


//########### API ROUTES
var apiRoutes = require('./app/routes/api')(app, express)
app.use('/api', apiRoutes)


//######## Basic route for the homepage the CATCHALL ROUTE
// Any route not handles by node will be passed to Angular
app.get('*', function(req, res) {
 res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
})


// API endpoint to get user information

// apiRouter.get('/me', function (req, res) {
//   res.send(req.decoded)
// })


// app.use('/api', apiRouter)

//################################################################ 


app.listen(config.port)
console.log("Magic happens at: ", config.port)

