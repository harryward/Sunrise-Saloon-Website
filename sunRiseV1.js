
if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);


    Meteor.startup(function() {
        Meta.config({
            options: {
                title: "Sunrise Saloon",
                suffix: "Missoula Live Country Music Bar"
            }
        });

        return SEO.config({
            title: 'Sunrise Saloon - Missoula Live Country Music Bar',
            meta: {
                'description': 'Listen to LIVE Country Music and take advantage of all the awesome drink specials. Check our concert and event calendar!'
            },
            og: {
                'image': 'http://sunrise.poolsoftware.io:9000/logo.png'
            }
        });
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}
