//===================
// Require mongoose & define vars.
//===================
var mongoose = require('mongoose');
var timestamps = require('mongoose-simpletimestamps');

var db = mongoose.connection,
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// Create connection to trackgain database.
mongoose.connect('mongodb://localhost/trackgain');

//===================
// Defining Schemas
//===================

// User Schema
var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  name: String,
});

// AvailableExercises Schema 
var AvailableExercisesSchema = new Schema({
  exercise: String,
  region: String
}, { collection : 'availableExercises' });

// Exercise Schema 
var ExerciseSchema = new Schema({
  user_id: { type: ObjectId, required: true, ref: UserSchema },
  av_exercise_id: { type: ObjectId, required: true, ref: AvailableExercisesSchema },
  weight: { type: Number, required: true },
  reps: { type: Number, required: true }
}, { collection: 'exercises' });

// Exercise Log Schema
var ExerciseLogSchema = new Schema({
  user_id: { type: ObjectId, required: true, ref: UserSchema },
  av_exercise_id: { type: ObjectId, required: true, ref: AvailableExercisesSchema },
  weight: { type: Number, required: true },
  reps: { type: Number, required: true }
}, { collection: 'exerciseLog' });

//===================
// Registering Automatic Timestamps for Models as required by: 'mongoose-simpletimestamps'
//===================
UserSchema.plugin(SimpleTimestamps);
ExerciseSchema.plugin(SimpleTimestamps);
ExerciseLogSchema.plugin(SimpleTimestamps);

//===================
// Registering Models with Mongoose
//===================
mongoose.model('User', UserSchema);
mongoose.model('Exercise', ExerciseSchema);
mongoose.model('AvailableExercises', AvailableExercisesSchema);
mongoose.model('ExerciseLog', ExerciseLogSchema);

// Open connection.
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { });
