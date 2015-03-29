

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () { return Meteor.subscribe('projects'); }
});



Router.route('/', {name: "projectList"});
Router.route('/projects/:_id', { 
	name: 'projectPage',
	data: function () {return Projects.findOne(this.params._id);}
});

Router.onBeforeAction('dataNotFound', {only: 'projectPage'});