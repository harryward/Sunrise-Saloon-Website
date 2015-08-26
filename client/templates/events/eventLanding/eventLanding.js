Template.eventLanding.helpers({
    thisEvent: function(){
        return Events.findOne(Session.get('params').id)
    },
    theImage:function(){
        return Images.findOne(Events.findOne(Session.get('params').id).mainImage).url()
    },
    when:function(){
        return moment(Events.findOne(Session.get('params').id).date).format('MMM Do @ h:mm a')
    }
});
