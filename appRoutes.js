

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

Router.map(function(){
// Sitemap route
   this.route('sitemap', {
       path: 'sitemap.xml',
       // HAS TO BE on the server.
       where: 'server',
       action: function () {

    // Let's get some stuff from MongoDB!
    // (This can just be an array with whatever though.)
    // (And don't forget the .fetch() if you're using MongoDB!)
    var collectionOfPages = Events.find().fetch();

    var collectionForXMLcreation = _( collectionOfPages ).map( function ( page ) {
        return {

            loc: 'http://sunrise.poolsoftware.io:9000/p/eventLanding?p='+page._id,
            lastmod: new Date( page.createdOn ),
            priority: 1,
            changefreq: 'daily'
        };
    });

    // Pass the collection aloing with a rootUrl string and a map method callback.
    // The xmlSitemap var will contain the XML for the sitemap!
    var xmlSitemap = SitemapCreator.createXMLSitemap( collectionForXMLcreation, 'http://localhost:2324' );

    // Write the response from the server!
    this.response.writeHead(200, {'Content-Type': 'text/xml'});
    this.response.end( xmlSitemap );

}
   });
})
// CATCH ALL ROUTE, VIEW ANY TEMPLATE BY PASSING THE TEMPLATE NAME INTO /p/:template

Router.route('/p/:template', function () {
// Session.set('params',this)
Session.set('params',this.params.query)

if(Session.get('params').id){
post = Events.findOne(Session.get('params').id);

Meta.set("og:title", post.title);
Meta.set("og:description",post.description);
Meta.set("og:image",Images.findOne(post.mainImage).url());
Meta.set("og:url",'http://sunrise.poolsoftware.io:9000/p/eventLanding?p='+post._id);


   SEO.set({
     title: post.title,
     meta: {
       'description': post.description
     },
     og: {
       'title': post.title,
       'description': post.description,
       'image':Images.findOne(post.mainImage).url()
   },
   og: {
     'title': post.title,
     'description': post.description,
     'image':Images.findOne(post.mainImage).url()
   }
   });
   }


  this.render(this.params.template, {
    // data: function () { return Items.findOne({_id: this.params._id}); }
  });
});
