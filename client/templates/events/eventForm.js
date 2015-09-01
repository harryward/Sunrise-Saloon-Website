Template.eventForm.onCreated(function(){
    initSummernote = function() {
        $('#summernote').summernote({
            height: 200, // set editor height

            minHeight: null, // set minimum height of editor
            maxHeight: null, // set maximum height of editor

            focus: true,
            onKeydown: function(e) {
                    //   console.log(e)
                    var num = $('#summernote').code().replace(/(<([^>]+)>)/ig, " ").length;
                    var key = e.keyCode;
                    Session.set('totalChar', num)
                    allowed_keys = [8, 37, 38, 39, 40, 46]
                    if ($.inArray(key, allowed_keys) != -1)
                        return true
                    else if (num > 1000) {
                        e.preventDefault();
                        e.stopPropagation()
                    }
                } // set focus to editable area after initializing summernote
        });
        $('.datepicker').datetimepicker({
            // inline:true,
            // format: 'MM/DD/YYYY h:mm a',
            // formatTime: 'h:mm a',
            // formatDate: 'MM/DD/YYYY',
            // value: moment(Session.get('editEvent').sDate).format('MM/DD/YYYY hh:mm a'),

        });
    }
    console.log('created....')
})

Template.eventForm.rendered = function(){
console.log('rendered...')

}
Template.eventForm.helpers({
    featuredImage: function(){
        return Images.findOne(Session.get('mainImage')).url()
    },

});
Template.eventForm.events({
    'change .file': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function(err, fileObj) {
            if (err) {
                // handle error
                alert("There was error uploading image " + err);
            } else {
                // handle success depending what you need to do
                ImageURL_C = fileObj._id;
                console.log(fileObj)
                Session.set('mainImage', ImageURL_C)


            }
        });
    });
},
"submit .eventForm": function(event, template) {
        event.preventDefault()
        var o = {};
        var a = $('form.eventForm').serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || false);
            } else {
                o[this.name] = this.value || false;
            }
            var Summer = $('#summernote').code()
            o["description"] = Summer.replace(/<\/?[^>]+(>|$)/g, " ");
            o["descriptionHTML"] = Summer
            o["title"] = $('.title').val()
            o["start"] = $('.datepicker').val()
            o["sDate"] = new Date($('.datepicker').val())
            // o["eDate"] = new Date($('.endDate').val())
            o["mainImage"] = Session.get('mainImage')
            o["author"] = Meteor.user()._id
            // o["address"] = Session.get('placeData').formatted_address
            // o["geoData"] = Session.get('placeData')
            o["createdOn"] = new Date()
            // o["attendees"] = parseInt(0)
            // o["categories"] = $('.cats').val().split(',')
            // o["placeData"] = {
            //     locality: Session.get('placeData').vicinity
            // }
            // o["geo"] = [Session.get('placeData').geometry.location.G, Session.get('placeData').geometry.location.K]
            // if (Session.get('editEvent')) {
            //     o["lastUpdate"] = new Date()
            // }
        });
        Session.set('mainImage',false)
        console.log('form object',o)
        Events.insert(o)
        alert('eventCreated')
        Router.go('/')

        // if (Session.get('editEvent')) {
        //     console.log(o)
        //     Events.update({
        //         '_id': Session.get('params').id
        //     }, {
        //         $set: o
        //     })
        //     console.log('event created')
        //     Session.set('editEvent', false)
        //     Router.go('/p/eventLanding?id=' + Events.findOne(o)._id)
        //     // swal("Event Updated", "Click ok to view your event.", "success");
        // } else {
        //     console.log('new event')
        //     Events.insert(o)
        //     // swal("Event Created", "Click ok to view your event.", "success");
        //     if(Events.findOne(o)){
        //     Router.go('/p/eventLanding?id='+ Events.findOne(o)._id)
        // }else{
        //     Router.go('/')
        // }


        // }







    }
});
