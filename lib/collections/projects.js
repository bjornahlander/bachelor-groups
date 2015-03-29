Projects = new Mongo.Collection('projects');

Meteor.methods({
  projectInsert: function(projectAttributes) {
    check(Meteor.userId(), String);
    check(projectAttributes, {
      title: String,
    });

    if(projectAttributes.title == "")
      return {
        noTitle: true
      }

    var projectOwner = Projects.findOne({userId: Meteor.userId()});
    if (projectOwner) {
      return {
        alreadyOwner: true,
        _id: projectOwner._id
      }
    }

    var projectWithSameName = Projects.findOne({title: projectAttributes.title});
    if (projectWithSameName) {
      return {
        projectExists: true,
        _id: projectWithSameName._id
      }
    }
    
    var user = Meteor.user();
    var project = _.extend(projectAttributes, {
      userId: user._id, 
      owner: user.profile.name, 
      createdAt: new Date()
    });

    var projectId = Projects.insert(project);
    Meteor.users.update({_id: Meteor.userId()}, {$set: {projectid: projectId}});
    return {
      _id: projectId
    };
  },

  insertMembership: function (projectID) {
    check(projectID, String);
    var projectOwner = Projects.findOne({userId: Meteor.userId()});
    if (projectOwner) {
      return {
        alreadyOwner: true,
        _id: projectOwner._id
      };
    }

    var projectMembers = Meteor.users.find({projectid: projectID}).count();
    if (projectMembers > 5) {
      return {
        tooManyMembers: true
      };
    }
    Meteor.users.update({_id: Meteor.userId()}, {$set: {projectid: projectID}});
    return "succsesfull";
  },

  removeProject: function(projectID) {
    check(projectID, String);
    var projectOwner = Projects.findOne({userId: Meteor.userId(), _id: projectID});
    if (!projectOwner) {
      return {
        notOwner: true,
        _id: projectID
      };
    }
    Projects.remove({_id: projectID});
    Meteor.users.update({projectid: projectID}, {$set: {projectid: null}});
    return "succsesfull";

  }

});

