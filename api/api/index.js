// Capser by @phuunet, makes querying db and returning objects easier.
var casper = require('casper'),
    bcrypt = require('bcrypt-nodejs'),
    url = require('url');

// Require mongoose
var mongoose = require('mongoose'),
    User     = mongoose.model('User'),
    Exercise = mongoose.model('Exercise'),
    ExerciseLog = mongoose.model('ExerciseLog'),
    AvailableExercises = mongoose.model('AvailableExercises');

// Strip query parameters
function getQueryParams(requestUrl) {
  var url_parts = url.parse(requestUrl, true);
  var query = url_parts.query;
  return query;
};

// Check wether obj is empty
function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length && obj.length > 0) return false;
    if (obj.length === 0) return true;
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

//====================
// trackga.in API v.0.0-a
//====================
module.exports = function(app) {

  //====================
  // Authentication End-point
  //====================
  app.post('/auth', function (req, resp) {
    var body = req.body,
        email = body.email,
        password = body.password;
    if (email !== null || email !== '' || password !== null || password !== '') {
      User.findOne({ 'email': email }, function (err, user) {
        // Handle error
        if (err) return res.jsonp({ error: err });
        //
        if (user) {
          var hash = user.password;
          var isAuth = bcrypt.compareSync(password, hash);
          if (isAuth) {
            resp.jsonp({
              success: true,
              message: 'Logged in.'
            });
          } else {
            resp.jsonp({
              success: false,
              message: 'Wrong password.'
            });
          }  
        } else {
          resp.jsonp({
            success: false,
            message: 'Could not find user with this email.'
          });
        }
      });  
    } else {
      resp.jsonp({
        success: false,
        message: 'Bad login.'
      });
    }
  })
  
  // !NOTE: No bulk request api implemented, yet.
  // GET /
  // Returns API's status
  app.get('/', casper.noop({
    'status': 'running'
  }));

  //====================
  // Users CRUD
  //====================

  // POST /users
  // Creates a new user
  app.post('/users', function (req, res) {

    var _this = this;
    var passHash = bcrypt.hashSync(req.body.password);

    var newUser = new User({ 
      username: req.body.username,
      password: passHash,
      email: req.body.email,
    });

    newUser.save(function (err) {
      if (err) return res.jsonp({ error: err});
      
      res.jsonp({
        'users': newUser
      });
    });

  });

  // GET /users
  // Returns list of users
  app.get('/users', function (req, res) {
    User.find().exec( function (err, users, count) {
      if (err) return res.jsonp({ error: err });
      res.jsonp({
        'users': users
      });
    });
  });

  // GET /users/:id
  // Returns a single user
  app.get('/users/:id', function (req, res, next) {
    User.findOne({ _id: req.params.id }).exec( function (err, users, count) {
      if (err) return res.jsonp({ error: err });
      res.jsonp({
        'user': users
      });
    });
  });

  // PUT /users/:id
  // Updates a single user by its id
  app.put('/users/:id', function (req, res) {
    
    var updateData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        return res.jsonp({ error: err });
      } else {
        if (updateData.username) { user.username = updateData.username };
        if (updateData.password) { user.password = updateData.password };
        if (updateData.email) { user.email = updateData.email };
        user.save();
        res.jsonp({
          users: user
        });
      }
    });

  });

  // DELETE /users/:id
  app.del('/users/:id', function (req, res, next) {
    User.remove({ _id: req.params.id }, function (err) {
      if (err) return res.jsonp({ error: err });
      res.jsonp({
        status: 'deleted'
      });
    });
  });

  //====================
  // Exercises CRUD
  //====================

  // POST /exercises/:id
  app.post('/exercises', function (req, res) {
    var reqData = req.body;

    var newExercise = new Exercise({ 
      user_id: reqData.user, 
      av_exercise_id: reqData.exercise_id, 
      weight: reqData.weight,
      reps: reqData.reps
    });

    newExercise.save(function (err) {
      console.log(err);
      if (err) return res.jsonp({ error: err });
      res.jsonp({
        'exercise': newExercise
      });
    });
  });

  // GET exercises?user=:id
  app.get('/exercises', function (req, res) {
    
    var query = getQueryParams(req.url);
    if (isEmpty(query)) return;

    Exercise
      .find({user_id: query.user})
      .populate('av_exercise_id', null, 'AvailableExercises')
      .exec( function (err, exercises) {
        if (exercises === undefined) res.jsonp({ 'exercises': [] });
        res.jsonp({
          'exercises': exercises
        });
      });

  });

  app.put('/exercises/:id', function (req, res, next) {

    var requestData = req.body;
    console.log(requestData);
    
    var updateData = {
      id: requestData.id,
      weight: requestData.weight,
      reps: requestData.reps,
    };

    var newExerciseLog = new ExerciseLog({ 
      user_id: requestData.user,
      av_exercise_id: requestData.av_exercise_id,
      weight: requestData.weight,
      reps: requestData.reps
    });

    console.log(newExerciseLog);

    newExerciseLog.save();

    Exercise.findOne({_id: updateData.id}, function (err, exercise) {
      if (err) return res.jsonp({ error: err });

      if (updateData.weight) { exercise.weight = updateData.weight };
      if (updateData.reps) { exercise.reps = updateData.reps };  
      
      exercise.save();

      res.jsonp({
        exercise: exercise
      });
    });
  });

  // DELETE exercises?user_id=:id
  app.delete('/exercises/:id', function (req, res) {
    return Exercise.findById(req.params.id, function (err, exercise) {
      return exercise.remove(function (err) {
        if (!err) {
          return res.jsonp({exercise: exercise});
        } else {
          console.log(err);
        }
      });
    });
  });

  //====================
  // Exercise Log CRUD
  //====================
  
  // GET log/exercises/:id?user=:id
  app.get('/log/exercises/:id', function (req, res) {
    
    var query = getQueryParams(req.url);

    if (isEmpty(query)) return;
    ExerciseLog
      .find({user_id: query.user, av_exercise_id: req.params.id})
      .exec( function (err, exercises) {
        // if (exercises === undefined) res.jsonp({ 'exercises': [] });
        res.jsonp({
          'exercises': exercises
        });
      });

  });

  // GET exercises/available
  // Returns all of the exercises available on the database. Used to populate <select>.
  app.get('/exercises/available', function (req, res) {
    var query = getQueryParams(req.url);
    searchTerm = new RegExp(query.name);
    AvailableExercises.find({Exercise: searchTerm}).exec( function (err, availableExercises) {
      if (err) return res.jsonp({ error: err });
      res.jsonp({
        'availableExercises': availableExercises
      });
    });
  });

};