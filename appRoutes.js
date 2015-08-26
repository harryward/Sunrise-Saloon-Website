

// HOME PAGE ROUTE
// Router.onBeforeAction(function() {
//   GoogleMaps.load();
//   this.next();
// }, { only: ['routeOne', 'routeTwo'] });

Router.route('/', function () {
  Session.set('params',this.params.query)
  this.render('home', {
    // data: function () { return Items.findOne({_id: this.params._id}); }
  });
});


Router.route('/admin', function () {
  this.render('admin', {
    // data: function () { return Items.findOne({_id: this.params._id}); }
  });
});



// CATCH ALL ROUTE, VIEW ANY TEMPLATE BY PASSING THE TEMPLATE NAME INTO /p/:template

Router.route('/p/:template', function () {
// Session.set('params',this)
Session.set('params',this.params.query)
  this.render(this.params.template, {
    // data: function () { return Items.findOne({_id: this.params._id}); }
  });
});
