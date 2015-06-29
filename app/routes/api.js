var User = require('../models/user')
  , jwt = require('jsonwebtoken')
  , config = require('../../config')
  , superSecret = config.secret //The secret key for creating tokens


module.exports = function( app, express) {
  //######## API Router
  var apiRouter = express.Router() //Gets an instance of the express Router

  apiRouter.post('/authenticate', function (req, res) {
    
    //find the user
    //select the name, username and password explicitly
    User.findOne({
      username: req.body.username
    }).select('name username password').exec(function (err, user) {

      if (err) throw err

      if (!user) {
        res.json({
          success: false
        , message: 'Authentication Failed! User not found!'
        })

      } else if (user) {
         //Check if password matches
        var validPassword = user.comparePassword(req.body.password)
        if (!validPassword) {
          res.json({
            success: false
          , message: 'Authentication Failed! Wrong Password'
          })
      } else {
          //User is found and password is right
          //Create a token
          var token = jwt.sign(
            user
          , superSecret, {
            expiresInMinutes: 1440
          })


          //return the token as json
          res.json({
            success: true
          , message: 'Enjoy your token!! :D'
          , token: token
          })
        }
      }

    })
  })


  //Middleware ################
  //Middleware is place before the router is initialized and routes applied. 

  apiRouter.use(function(req, res, next) {
    console.log('Somebody came to our appp! Wohooooo!')

    //checki the header or url parameters or post parameters for token

    var token = req.body.token || req.query['token'] || req.headers['x-access-token']

    //if there is a token, decode it
    if (token) {

      //verify the secret and check the expiration
      jwt.verify(token, superSecret, function (err, decoded) {
        if(err) {
          return res.json({
            success: false
          , message: 'Failed to authenticate the token! GO AWAY HACKER!'
          })
        } else {
          //If the token is verified
            req.decoded = decoded

            next()
        }
      })

    } else {

        //There is no token passed
        //Return a HTTP response of access forbidden : 403 
        return res.status(403).send({
          success: false
        , message: 'No Token Provided.'
        })
    }

    //Authenticates users
  })

  apiRouter.get('/', function (req, res) {
    res.json({ message: 'Woohoooo! Welcome to our api!'})
  })


  //######################################################
  //Routes that end with /users

  apiRouter.route('/users')
    // Create a user (accessed at POST http://localhost:8080/api/users) POST
    .post(function(req, res) {

      //Create a new instance of the User model
      var user = new User()

      //Set user details that comes fromt he request
      user.name = req.body.name
      user.username = req.body.username
      user.password = req.body.password

      //Save the user and check forerroes
      user.save(function(err) {
        //Duplicate entry

        if (err) {
          if(err.code === 11000)
            return res.json({success: false, message: "A user with that username already exisits!"})

          else
            return res.send(err)
        }

        res.json({message: 'User created!'})

      })
    })

    //######### GET: Get users accessed at GET http://localhost:8080/api/users
    .get(function (req,res) {

      User.find(function (err,users) {
        if (err) res.send(err)

        //return the users
        res.json(users)

      })

    })

  //############ Routes like /users/:user_id
  apiRouter.route('/users/:user_id')  //Route
    //GET USER BY ID
    .get(function (req, res) {
      User.findById(req.params.user_id, function (err, user) { //findById is a mongoose fn
        if (err) res.send(err)

        res.json(user)
      })
    })

    //UPDATE USER BY ID
    .put(function (req, res) {
      User.findById(req.params.user_id, function (err, user) {
        if (err) res.send(err)

        if (req.body.name) user.name = req.body.name
        if (req.body.username) user.username = req.body.username
        if (req.body.password) user.password = req.body.password

        //SAVE
        user.save(function (err) {
          if (err) res.send(err)

          res.json({ message: 'User updated!'})
        })
      })
    })

    //DELETE
    .delete(function (req, res) {
      User.remove({               //Removes model matching the conditions [model.remove(conditions, callback)]
        _id: req.params.user_id
      }, function (err, user) {
          if (err) return res.send(err)

          res.json({ message: 'Sucessfully deleted! :('})
      })
    })

  return apiRouter

}