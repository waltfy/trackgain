// Require mongoose & define vars.
var mongoose = require('mongoose');
var timestamps = require("mongoose-simpletimestamps");

var db = mongoose.connection,
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// Create connection to trackgain database.
mongoose.connect('mongodb://localhost/trackgain');

////////////////////
// Defining Schemas
////////////////////

// User Schema
var User = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  name: String,
});

// AvailableExercises Schema 
var AvailableExercises = new Schema({
  exercise: String,
  region: String
}, { collection : 'availableExercises' });

// Exercise Schema 
var Exercise = new Schema({
  user_id: { type: ObjectId, required: true, ref: User },
  av_exercise_id: { type: ObjectId, required: true, ref: AvailableExercises },
  weight: { type: Number, required: true },
  reps: { type: Number, required: true }
}, { collection: 'exercises' });

// var ExerciseLog = new Schema({
//   exercise_id: { type: ObjectId, required: true, ref: Exercise },
//   weight: { type: Number },
//   reps: { type: Number }
// });

// // Measurement Schema 
// var Measurement = new Schema({
//   user_id: { type: ObjectId, ref: User },
//   muscle: String,
//   size: { type: Number, required: true }
// });

// var MeasurementLog = new Schema({
//   measurement_id: { type: ObjectId, required: true, ref: Measurement },
//   size: { type: Number, required: true }
// });

//////////////////////////////////////////////////////////////////////////////////
// Registering Automatic Timestamps for Models as required by: 'mongoose-simpletimestamps'
//////////////////////////////////////////////////////////////////////////////////
User.plugin(SimpleTimestamps);
Exercise.plugin(SimpleTimestamps);
// Measurement.plugin(SimpleTimestamps);
// ExerciseLog.plugin(SimpleTimestamps);
// MeasurementLog.plugin(SimpleTimestamps);

////////////////////
// Registering Models
////////////////////
mongoose.model('User', User);
mongoose.model('Exercise', Exercise);
// mongoose.model('ExerciseLog', ExerciseLog);
// mongoose.model('Measurement', Measurement);
// mongoose.model('MeasurementLog', MeasurementLog);
mongoose.model('AvailableExercises', AvailableExercises);

// Open connection.
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { });