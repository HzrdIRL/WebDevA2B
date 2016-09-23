var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Sub_Tasks_Schema = new Schema({
  title: String,
  done: Boolean,
  task: {type: Schema.Types.ObjectId, ref: 'Task'}
});


Sub_Tasks_Schema.methods.tickOff = function(cb){
  if(this.done == true){
    this.done = false;
  }
  else if(this.done = false){
    this.done = true;
  }
  this.save(cb);
};

mongoose.model('Sub_Task', Sub_Tasks_Schema);
