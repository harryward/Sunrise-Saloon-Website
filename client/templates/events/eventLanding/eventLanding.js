Template.eventLanding.helpers({
    thisEvent: function(){
        return Events.findOne(Session.get('params').id)
    },
    theImage:function(){
        return Images.findOne(Events.findOne(Session.get('params').id).mainImage).url()
    },
    when:function(){
        return moment(this.date).format('dddd - MMM Do @ h:mm a')
    },
    flyerEvent:function(){
        if(Events.findOne(Session.get('params').id).flyer === 'true'){
            return true
        }else{
            if(Events.findOne(Session.get('params').id).flyertwo === 'true'){
            return true
        }else{
            return false
        }
    }
    }
});
