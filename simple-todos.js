Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    Template.body.helpers({
        tasks: function() {
            return Tasks.find({}, {sort: {createdAt: -1}});
        }
    });
    Template.body.events({
      "click .toggle-checked": function(){
        Tasks.update(this._id, {$set: {checked: ! this.checked}});
    }, 
  "click .delete": function () {
    Tasks.remove(this._id);
  },
        "submit .new-task": function(event) {
            // This function is called when the new task form is submitted

            var text = event.target.text.value;

            Tasks.insert({
                text: text,
                createdAt: new Date() // current time
            });

            // Clear form
            event.target.text.value = "";

            // Prevent default form submit
            return false;
        }
    });
}
if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}
