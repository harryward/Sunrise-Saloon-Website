Template.home.helpers({
    events: function() {

        var startDate = new Date()
       console.log('hey',startDate)
       return Events.find({
           'sDate': {
               $gte: new Date(startDate),
               // $lte: new Date(endDate),
               // $lte:endDate,
           },
           'flyer':'false',
           // 'categories': Session.get('queryCat'),
           // 'placeData.locality': Session.get('myCity')
       }, {
           'sort': {
               'date': 1
           }
       }).fetch()
    },
    featuredEvent: function() {
var startDate = new Date()
        var startDate = new Date()
       console.log('hey',startDate)
       return Events.find({
           'sDate': {
               $gte: new Date(startDate),
               // $lte: new Date(endDate),
               // $lte:endDate,
           },
           'featured':'true',

           // 'categories': Session.get('queryCat'),
           // 'placeData.locality': Session.get('myCity')
       }, {
           'sort': {
               'date': 1
           },
           'limit':1
       }).fetch()
    },
    flyer: function() {
var startDate = new Date()
        var startDate = new Date()
       console.log('hey',startDate)
       return Events.find({
           'sDate': {
               $gte: new Date(startDate),
               // $lte: new Date(endDate),
               // $lte:endDate,
           },
           'flyer':'true',

           // 'categories': Session.get('queryCat'),
           // 'placeData.locality': Session.get('myCity')
       }, {
           'sort': {
               'date': 1
           },
           'limit':1
       }).fetch()
    },
theImage:function(){
    return Images.findOne(this.mainImage).url()
},
promoImage:function(){

    return Images.findOne(Events.findOne({
        'sDate': {
            $gte: new Date(startDate),
            // $lte: new Date(endDate),
            // $lte:endDate,
        },
        'featured':'true',

        // 'categories': Session.get('queryCat'),
        // 'placeData.locality': Session.get('myCity')
    }, {
        'sort': {
            'date': 1
        }
    }).mainImage).url()
},
when:function(){
    return moment(this.date).format('MMM Do @ h:mm a')
}
});
