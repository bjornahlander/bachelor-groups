Template.projectItem.helpers({
	projectpage: function () {
		var projectID = Template.instance().data._id;
		var projectOwner = Projects.find({userId: Meteor.userId(), _id: projectID}).count();
		//alert(projectID);
		return Router.current().route.getName() == "projectPage" && projectOwner == 1;
	}
});

Template.projectItem.events({
	"click .removeProject": function (event, template) {
		event.preventDefault();
		var confirmed = confirm("Are your sure you want to remove this project?");
		if (confirmed) {
			Meteor.call('removeProject', template.data._id, function(error, result) {

			// display the error to the user and abort
	      	if (error)
	        	return alert(error.reason);

	        // not the owner
	        if (result.notOwner)
	        	return alert("Can not compute. Only owner can remove projects. Dah!")
			});

			return alert("Project removed!")
		}
	}
});