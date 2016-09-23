var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Tasks_Schema = new Schema({
  title: String,
  done: Boolean,
  due_date: Date,
  sub_tasks: [{type: Schema.Types.ObjectId, ref: 'Sub_Task'}]
});

Tasks_Schema.methods.tickOff = function(cb){
  if(this.done == true){
    this.done = false;
  }
  else if(this.done = false){
    this.done = true;
  }
  this.save(cb);
};

mongoose.model('Task', Tasks_Schema);
