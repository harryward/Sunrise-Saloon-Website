Template.eventLanding.helpers({
    thisEvent: function(){
        return Events.findOne(Session.get('params').id)
    },
    theImage:function(){
        return Images.findOne(Events.findOne(Session.get('params').id).mainImage).url()
    },
    when:function(){
        return moment(this.date).format('dddd - MMM Do @ h:mm a')
    }
});
