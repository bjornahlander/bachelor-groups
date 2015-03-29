Template.header.helpers({
	numOfProjects: function () {
		return Projects.find().count();
	},

});

Template.header.events({
  'submit form': function(e) {
    e.preventDefault();

    var project = {
      title: $(e.target).find('[name=project]').val(),
    };

    Meteor.call('projectInsert', project, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);

      //  owns another project
      if (result.alreadyOwner)
        alert('You already created antoher project.')

      // show this result but route anyway
      if (result.postExists)
        alert('This project has already been created');

      if (result.noTitle)
        return alert('You must have a title for your project.');

    });
    $(e.target).find('[name=project]').val("");

    Router.go('projectPage', {_id: result._id});  
  }
});